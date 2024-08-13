"use client";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

const CashierLayout = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn(isMobile ? "" : "grid grid-cols-[auto,1fr]")}>
      <Navbar isMobile={isMobile} />
      <div className="bg-neutral-50">{children}</div>
    </div>
  );
};

export default CashierLayout;
