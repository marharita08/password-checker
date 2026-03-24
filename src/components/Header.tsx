import Link from "next/link";
import { HeaderMenu } from "./HeaderMenu";
import { auth } from "@/lib/auth";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="flex items-center bg-primary/10 p-4 justify-between">
      <Link href="/">
        <h1 className="text-2xl font-bold text-primary">Password Checker</h1>
      </Link>
      <HeaderMenu session={session} />
    </header>
  );
};
