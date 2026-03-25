import { Header, PasswordChecker } from "@/components/layout";
import { auth } from "@/lib/auth";
import { rulesService, userRulesService } from "@/lib/services";

export default async function Home() {
  const session = await auth();

  const rules = session?.user?.id
    ? await userRulesService.getForUser(session.user.id, true)
    : await rulesService.getDefaultRules();

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
