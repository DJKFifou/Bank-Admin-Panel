import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white flex gap-4 justify-center px-10 py-5">
      <Link href="/" className="relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
        Home
      </Link>
    </header>
  );
}
