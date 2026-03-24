import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex items-center justify-center flex-1">
        <div className="flex bg-card rounded-md shadow-md p-6 flex-col gap-6 border border-muted w-full max-w-md">
          <h2 className="text-xl font-bold">Login</h2>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
