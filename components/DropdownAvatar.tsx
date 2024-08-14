"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleHelp, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "./SessionProvider";

const DropdownAvatar = () => {
  const { session } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='flex items-center gap-2'
          onClick={() => router.push(`/${session?.role}/help`)}
        >
          <CircleHelp size={16} />
          Help
        </DropdownMenuItem>
        <DropdownMenuItem
          className='flex items-center gap-2'
          onClick={() => router.push(`/${session?.role}/settings`)}
        >
          <Settings size={16} />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAvatar;
