import Link from "next/link";

export default async function AccountList({ accountData, total }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Accounts</h2>
      <ul className="flex flex-col gap-1">
        {accountData.map((account) => (
          <li key={account.id}>
            <Link
              href={`/bank-account/${account.id}`}
              className="block bg-gray-100 p-2 rounded w-fit"
            >
              {account.ownerName ? `${account.ownerName} - ` : ``}{" "}
              {account.name} - {account.type} : {account.balance}€
            </Link>
          </li>
        ))}
      </ul>
      <p className="font-bold">Total : {total} €</p>
    </div>
  );
}
