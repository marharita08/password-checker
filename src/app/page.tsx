import { Header } from "@/components/Header";
import { PasswordChecker } from "@/components/PasswordChecker";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex items-center justify-center flex-1">
        <div className="flex items-center bg-card rounded-md shadow-md p-6 flex-col gap-4 border border-muted w-full max-w-md">
          <h2 className="text-xl font-bold">Check your password</h2>
          <PasswordChecker />
        </div>
      </main>
    </div>
  );
}
