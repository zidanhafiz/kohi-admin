"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
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
              <div key={i} className="flex gap-2 items-center">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={i === 0 ? `/${path}` : `/${pathnameList[i - 1]}/${path}`}>{path}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
              </div>
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
