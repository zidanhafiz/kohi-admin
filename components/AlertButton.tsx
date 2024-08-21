"use client";
import { deleteAdminById } from "@/actions/admins";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useFormState } from 'react-dom';

const initialState = {
  success: false,
  message: "",
};

export const DeleteAlert = ({
  children,
  deleteType,
  id,
}: {
  children: ReactNode;
  deleteType: "account" | "product" | "order" | "transactions";
  id: string
}) => {
  const [state, formAction, pending] = useFormState(deleteAdminById, initialState)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            {deleteType} and remove from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <Button variant='destructive' disabled={pending}>Continue</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
