import { redirect } from "next/navigation";

import { Header, RegisterForm } from "@/components/layout";
import { auth } from "@/lib/auth";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex items-center justify-center flex-1">
        <div className="flex bg-card rounded-md shadow-md p-6 flex-col gap-6 border border-muted w-full max-w-md">
          <h2 className="text-xl font-bold">Register</h2>
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
