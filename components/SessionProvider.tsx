"use client";
import { getSession } from "@/lib/auth";
import { SessionPayload } from "@/types/session";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type SessionContextType = {
  session: SessionPayload | null;
  setSession: (session: SessionPayload) => void;
  loginSession: () => Promise<void>;
  logoutSession: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const router = useRouter();

  const loginSession = async () => {
    const ses = await getSession();
    setSession(ses);
  };

  const logoutSession = () => {
    setSession(null);
  };

  useEffect(() => {
    getSession().then((ses) => {
      setSession(ses);
    });
  }, []);

  useEffect(() => {
    if (session) {
      if (session.role === "CASHIER") {
        router.push("/cashier");
        return;
      }
      router.push("/admin");
      return;
    }
    router.refresh();
  }, [session, router])

  return <SessionContext.Provider value={{ session, setSession, loginSession, logoutSession }}>{children}</SessionContext.Provider>;
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export { SessionProvider, useSession };
