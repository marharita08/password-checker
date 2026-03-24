import { HomeIcon } from "lucide-react";
import Link from "next/link";

import { BackButton, Header } from "@/components/layout";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex items-center justify-center flex-1">
        <div className="flex bg-card rounded-md shadow-md p-6 flex-col gap-6 justify-center border border-muted w-full max-w-md">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold">404</h2>
            <p className="text-lg font-bold">Page not found</p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <BackButton />
            <Button>
              <Link href={"/"} className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
