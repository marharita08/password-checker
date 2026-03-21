import { Header } from "@/components/Header";
import { PasswordChecker } from "@/components/PasswordChecker";
import { rulesService } from "@/lib/services/rules.service";

export default async function Home() {
  const rules = await rulesService.getAll(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex items-center justify-center flex-1">
        <div className="flex items-center bg-card rounded-md shadow-md p-6 flex-col gap-4 border border-muted w-full max-w-md">
          <h2 className="text-xl font-bold">Check your password</h2>
          <PasswordChecker initialRules={rules} />
        </div>
      </main>
    </div>
  );
}
