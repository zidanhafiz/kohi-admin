"use client";
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
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { SessionPayload } from "@/types/session";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LogoutButton = ({ className }: { className?: string }) => {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => setSession(session));
  }, []);

  const handleLogout = async () => {
    if (!session) return;

    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: session.username,
        role: session.role,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error.message);
      alert("Logout failed");
      return;
    }

    router.push("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          className={cn("flex items-center gap-3", className)}
        >
          Logout
          <LogOut size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure want to logout?</AlertDialogTitle>
          <AlertDialogDescription>You will logout from this account.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-500 text-primary-foreground hover:bg-red-400 transition-colors'
            onClick={handleLogout}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
