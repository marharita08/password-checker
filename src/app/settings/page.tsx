import { redirect } from "next/navigation";

import { Header, RulesSettingsForm } from "@/components/layout";
import { auth } from "@/lib/auth";
import { userRulesService } from "@/lib/services";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const rules = await userRulesService.getForUser(session.user.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex items-center justify-center flex-1">
        <div className="flex bg-card rounded-md shadow-md p-6 flex-col gap-6 border border-muted w-full max-w-md">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Password Rules</h2>
            <p className="text-sm text-muted-foreground">
              Choose which rules to apply when checking your password.
            </p>
          </div>
          <RulesSettingsForm initialRules={rules} userId={session.user.id} />
        </div>
      </main>
    </div>
  );
}
