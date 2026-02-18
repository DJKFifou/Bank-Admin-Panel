import AccountList from "@/components/AccountList";
import { Suspense } from "react";

export default async function BankAccountPage() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/accounts`);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch accounts: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: expected an array of accounts");
    }

    const accountsWithOwners = await Promise.allSettled(
      data.map(async (account) => {
        try {
          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/clients/${account.client_id}`,
          );

          if (!userRes.ok) {
            console.error(`Failed to fetch client ${account.client_id}`);
            return {
              ...account,
              ownerName: "Unknown",
            };
          }

          const user = await userRes.json();
          const username =
            user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : "Unknown";

          return {
            ...account,
            ownerName: username,
          };
        } catch (error) {
          console.error(`Error fetching client ${account.client_id}:`, error);
          return {
            ...account,
            ownerName: "Unknown",
          };
        }
      }),
    );

    const successfulAccounts = accountsWithOwners
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    if (successfulAccounts.length === 0) {
      return (
        <div className="flex flex-col gap-4">
          <h1>Bank accounts :</h1>
          <div className="text-red-600">
            No accounts could be loaded. Please try again later.
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        <h1>Bank accounts :</h1>
        <Suspense fallback={<div>Loading accounts...</div>}>
          <AccountList accountData={successfulAccounts} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error in BankAccountPage:", error);

    return (
      <div className="flex flex-col gap-4">
        <h1>Bank accounts :</h1>
        <div className="text-red-600">
          <p className="font-semibold">Failed to load accounts</p>
          <p className="text-sm mt-2">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}
