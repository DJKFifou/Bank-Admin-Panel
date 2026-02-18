"use client";

import Link from "next/link";

export default function ClientList({ clientSearched }) {
  return (
    <>
      {clientSearched.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">Results :</p>
          <ul className="flex flex-col gap-2 list-disc pl-4">
            {clientSearched.map((client) => {
              return (
                <li key={client.id}>
                  <Link href={`/client/${client.id}`}>
                    {client.first_name} {client.last_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
