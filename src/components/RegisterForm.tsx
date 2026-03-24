"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputError } from "@/components/InputError";
import { PasswordInput } from "@/components/PasswordInput";
import { registerAction } from "@/lib/actions/auth.actions";
import {
  registerSchema,
  type RegisterSchema,
} from "@/lib/schemas/auth.schemas";
import { MailIcon } from "lucide-react";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    startTransition(async () => {
      const result = await registerAction(data.email, data.password);
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
          startIcon={<MailIcon className="h-4 w-4" />}
          placeholder="Enter your email"
          error={!!errors.email}
          {...register("email")}
        />
        <InputError error={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput
          label="Password"
          placeholder="Create a password"
          error={!!errors.password}
          {...register("password")}
        />
        <InputError error={errors.password?.message} />
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput
          label="Confirm password"
          placeholder="Repeat your password"
          error={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        <InputError error={errors.confirmPassword?.message} />
      </div>

      <InputError error={errors.root?.message} className="justify-center" />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
