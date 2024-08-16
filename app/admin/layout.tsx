"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn(isMobile ? "" : "grid grid-cols-[250px,calc(100%-250px)]")}>
      <Navbar isMobile={isMobile} />
      <div className="bg-neutral-50 py-20 md:py-2 px-6">
        <Header />
        <Separator />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
