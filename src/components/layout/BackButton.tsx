"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";

export function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className="flex items-center gap-2">
      <ArrowLeftIcon className="w-4 h-4" />
      Back
    </Button>
  );
}
