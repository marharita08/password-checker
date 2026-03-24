"use client";

import { LogOutIcon, Trash2Icon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { useState } from "react";

import { logoutAction } from "@/lib/actions";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui";
import { DeleteAccountDialog } from "./DeleteAccountDialog";

interface HeaderMenuProps {
  session: Session | null;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ session }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!session) {
    return (
      <div className="flex gap-2">
        <Button variant="link" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <UserIcon className="h-5 w-5" />
            <span>{session.user?.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => logoutAction()}>
            <div className="flex items-center gap-2">
              <LogOutIcon className="h-4 w-4" />
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            <div className="flex items-center gap-2 text-error focus:text-error">
              <Trash2Icon className="h-4 w-4" />
              <span>Delete account</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAccountDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
};
