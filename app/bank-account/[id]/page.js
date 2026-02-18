import DeleteFormAccount from "@/components/forms/DeleteFormAccount";
import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";

export default async function BankAccountPage({ params }) {
  try {
    const { id } = await params;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/accounts/${id}`,
    );

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error(
        `Failed to fetch account: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    if (!data || !data.name) {
      throw new Error("Invalid account data received");
    }

    const resTransactions = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/transactions?account_id=${id}`,
    );

    let filteredTransactionsData = [];

    if (resTransactions.ok) {
      const transactionsData = await resTransactions.json();

      if (Array.isArray(transactionsData)) {
        filteredTransactionsData = transactionsData.filter(
          (transaction) => transaction.account_id === id,
        );
      } else {
        console.error("Transactions data is not an array");
      }
    } else {
      console.error(`Failed to fetch transactions: ${resTransactions.status}`);
    }

    return (
      <div className="flex flex-col gap-10">
        <BackButton />
        <h1 className="text-xl font-bold">
          Bank account : {data.name} - {data.type} - {data.balance ?? 0}€
        </h1>

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Transactions :</h2>
          {filteredTransactionsData.length > 0 ? (
            <ul className="flex flex-col gap-2 list-disc list-inside">
              {filteredTransactionsData.map((transaction) => (
                <li key={transaction.id}>
                  {transaction.description || "No description"} :{" "}
                  {transaction.amount}€
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No transactions found for this account.
            </p>
          )}
        </div>

        <DeleteFormAccount id={id} client_id={data.client_id} />
      </div>
    );
  } catch (error) {
    console.error("Error in BankAccountPage:", error);

    return (
      <div className="flex flex-col gap-4 p-4">
        <BackButton />
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h1 className="text-red-800 font-semibold text-lg">
            Error Loading Account
          </h1>
          <p className="text-red-600 mt-2">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }
}
