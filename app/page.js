import SearchBar from "@/components/SearchBar";

export default async function Home() {
  return (
    <div className="min-h-lvh flex flex-col items-center gap-10 ">
      <h1 className="text-3xl font-bold">Super Bank</h1>
      <SearchBar />
    </div>
  );
}
