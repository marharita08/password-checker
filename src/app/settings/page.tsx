import { Header } from "@/components/Header";
import { RulesSettingsForm } from "@/components/RulesSettingsForm";

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex items-center justify-center flex-1">
        <div className="flex bg-card rounded-md shadow-md p-6 flex-col gap-6 border border-muted w-full max-w-sm">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Password Rules</h2>
            <p className="text-sm text-muted-foreground">
              Choose which rules to apply when checking your password.
            </p>
          </div>
          <RulesSettingsForm />
        </div>
      </main>
    </div>
  );
}
