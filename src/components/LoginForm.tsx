"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputError } from "@/components/InputError";
import { PasswordInput } from "@/components/PasswordInput";
import { loginAction } from "@/lib/actions/auth.actions";
import { loginSchema, type LoginSchema } from "@/lib/schemas/auth.schemas";
import { MailIcon } from "lucide-react";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    startTransition(async () => {
      const result = await loginAction(data.email, data.password);
      if (result?.error) {
        setError("root", { message: result.error });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={!!errors.email}
          startIcon={<MailIcon className="h-4 w-4" />}
          {...register("email")}
        />
        <InputError error={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          error={!!errors.password}
          {...register("password")}
        />
        <InputError error={errors.password?.message} />
      </div>

      <InputError error={errors.root?.message} className="justify-center" />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
