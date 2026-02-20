import AddFormAccount from "@/components/forms/AddFormAccount";
import DeleteClient from "@/components/forms/DeleteClient";
import AccountList from "@/components/AccountList";
import TransferMoneyForm from "@/components/forms/TransferMoneyForm";
import BackButton from "@/components/BackButton";
import ListSkeleton from "@/components/ListSkeleton";
import { Suspense } from "react";

async function fetchData(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Erreur HTTP ${res.status} sur ${url}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Échec de la requête vers ${url} :`, error);
    throw error;
  }
}

export default async function ClientPage({ params }) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const [data, accountData] = await Promise.all([
    fetchData(`${baseUrl}/api/clients/${id}`),
    fetchData(`${baseUrl}/api/accounts`),
  ]);

  if (!data) notFound();

  if (!Array.isArray(accountData)) {
    throw new Error("Les données des comptes sont invalides.");
  }

  const filteredAccountData = accountData.filter(
    (account) => account.client_id === id,
  );

  const total = filteredAccountData.reduce(
    (sum, account) => sum + (account.balance ?? 0),
    0,
  );

  return (
    <div className="flex flex-col gap-10">
      <BackButton />
      <h1 className="text-xl font-bold">
        Client : {data.first_name} {data.last_name}
      </h1>
      <Suspense fallback={<ListSkeleton />}>
        <AccountList accountData={filteredAccountData} total={total} />
      </Suspense>
      <AddFormAccount id={id} />
      <TransferMoneyForm id={id} accounts={filteredAccountData} />
      <DeleteClient id={id} />
    </div>
  );
}
