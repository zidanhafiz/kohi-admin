"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Breadcumb = () => {
  const pathname = usePathname();
  const [pathnameList, setPathnameList] = useState<string[]>([]);
  const [lastPathname, setLastPathname] = useState<string>("");

  useEffect(() => {
    if (pathname) {
      const pathList = pathname.split("/").filter((path) => path !== "");
      setPathnameList(pathList);
      setLastPathname(pathList[pathList.length - 1]);
    }
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname && pathnameList.map((path, i) => {
          if (path !== lastPathname) {
            return (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink href={`/${path}`}>{path}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            );
          }
        })}
        <BreadcrumbItem>
          <BreadcrumbPage>{lastPathname}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcumb;
