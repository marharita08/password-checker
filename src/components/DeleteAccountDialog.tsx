"use client";

import { useTransition } from "react";

import { deleteAccountAction } from "@/lib/actions/auth.actions";
import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteAccountDialog = ({
  open,
  onOpenChange,
}: DeleteAccountDialogProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteAccountAction();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-4">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter className="p-4 gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
