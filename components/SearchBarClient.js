"use client";

import ClientList from "@/components/ClientList";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";

export default function SearchBarClient({ clients }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("name") || "";

  const filterClients = (term) => {
    if (!term) return [];
    return clients.filter((client) => {
      const fullName = `${client.first_name} ${client.last_name}`.toLowerCase();
      return fullName.includes(term.toLowerCase());
    });
  };

  const [clientSearched, setClientSearched] = useState(() =>
    filterClients(initialSearch),
  );

  function searchClient(e) {
    const searchTerm = e.target.value.toLowerCase();
    const params = new URLSearchParams(searchParams);

    params.delete("name");
    if (searchTerm) params.set("name", searchTerm);

    router.push(`?${params.toString()}`, { scroll: false });
    setClientSearched(filterClients(searchTerm));
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search a client name"
        className="border-2 w-fit rounded p-1"
        onChange={searchClient}
      />
      <Suspense fallback={<p>Loading clients...</p>}>
        <ClientList clientSearched={clientSearched} />
      </Suspense>
    </div>
  );
}
