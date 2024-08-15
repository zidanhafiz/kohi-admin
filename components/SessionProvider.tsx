"use client";
import { Session } from "next-auth";
import { createContext, useContext, ReactNode } from "react";

type SessionContextType = {
  session: Session | null;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children, session }: { children: ReactNode, session: Session | null }) => {
  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export { SessionProvider, useSession };
