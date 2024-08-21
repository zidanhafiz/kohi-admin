"use client";
import { cn, isPathnameMatch } from "@/lib/utils";
import { Box, Calculator, History, House, PanelRightClose, PanelRightOpen, Settings, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { Separator } from "./ui/separator";
import DropdownAvatar from "./DropdownAvatar";
import LogoutButton from "./LogoutButton";
import { useSession } from "./SessionProvider";
import { kaushan } from "@/lib/fonts";

const cashierList = [
  {
    name: "Dashboard",
    link: "/",
    icon: <House size={20} />,
  },
  {
    name: "Point of Sale",
    link: "/post",
    icon: <Calculator size={20} />,
  },
  {
    name: "Orders",
    link: "/orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    name: "Products",
    link: "/products",
    icon: <Box size={20} />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <Settings size={20} />,
  },
];

const adminList = [
  {
    name: "Dashboard",
    link: "/",
    icon: <House size={20} />,
  },
  {
    name: "Cashiers",
    link: "/cashiers",
    icon: <Users size={20} />,
  },
  {
    name: "Products",
    link: "/products",
    icon: <Box size={20} />,
  },
  {
    name: "Transactions",
    link: "/orders",
    icon: <History size={20} />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <Settings size={20} />,
  },
];

const Navbar = ({ isMobile }: { isMobile: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { session } = useSession();
  const pathname = usePathname();

  const role = session?.user.role.toLowerCase()
  const list = role === "cashier" ? cashierList : adminList;

  if (!isMobile) {
    return (
      <aside className="hidden lg:block">
        <nav className={"border h-screen py-8 w-[250px] flex flex-col justify-between"}>
          <div>
            <Link
              href='/'
              className={cn(kaushan.className, `text-3xl font-semibold block mb-5 w-fit mx-auto`)}
            >
              Kohi
            </Link>
            <Separator />
            <ul className='grid gap-y-2 text-sm my-4 px-3'>
              {list.map((item, i) => (
                <li key={i}>
                  <Link
                    href={`/${role}${item.link}`}
                    className={cn(
                      isPathnameMatch(pathname, item.link, role ?? "cashier") ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                      "flex items-center gap-2 p-2 rounded-md transition-colors"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Separator />
          </div>
          <LogoutButton className='mx-3' />
        </nav>
      </aside>
    );
  }

  return (
    <header className='fixed bg-primary-foreground w-full z-50 lg:hidden'>
      <nav className='border py-3 pr-6 relative flex justify-between items-center'>
        <Button
          className='flex items-center gap-x-3 justify-self-end mx-3'
          variant='outline'
          size='sm'
          onClick={() => setOpen(!open)}
        >
          {open ? <PanelRightOpen size={20} /> : <PanelRightClose size={20} />}
        </Button>
        <DropdownAvatar />
        <div
          className={cn(
            open ? "translate-x-0" : "-translate-x-[999px]",
            "transition duration-500 absolute top-[60px] left-0 py-4 bg-primary-foreground border h-screen w-[250px]"
          )}
        >
          <div>
            <Link
              href='/'
              className={cn(kaushan.className, `text-3xl font-semibold block mb-5 w-fit mx-auto`)}
            >
              Kohi
            </Link>
            <Separator />
            <ul className='grid gap-y-4 text-sm my-4 px-3'>
              {list.map((item, i) => (
                <li key={i}>
                  <Link
                    href={`/${role}${item.link}`}
                    className={cn(
                      isPathnameMatch(pathname, item.link, role ?? "cashier") ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                      "flex items-center gap-2 p-2 rounded-md transition-colors"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Separator />
          </div>
          <div className='my-8 mx-3'>
            <LogoutButton className='w-full' />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
