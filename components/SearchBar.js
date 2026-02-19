import SearchBarClient from "./SearchBarClient";

export default async function SearchBar() {
  let errorMessage = "";
  let clients = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/clients`);
    clients = await res.json();
  } catch (error) {
    console.error("Error fetching clients:", error);
    errorMessage = "Error fetching clients. Please try again.";
  }

  return <SearchBarClient clients={clients} errorMessage={errorMessage} />;
}
