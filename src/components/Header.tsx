import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center bg-primary/10 p-4">
      <Link href="/">
        <h1 className="text-2xl font-bold text-primary">Password Checker</h1>
      </Link>
    </header>
  );
};
