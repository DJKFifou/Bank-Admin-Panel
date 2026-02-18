import SearchBarClient from "./SearchBarClient";

export default async function SearchBar() {
  let clients = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/clients`);
    clients = await res.json();
  } catch (error) {
    console.error("Error fetching clients:", error);
  }

  return <SearchBarClient clients={clients} />;
}
