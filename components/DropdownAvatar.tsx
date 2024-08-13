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
import { getSession } from "@/lib/auth";
import { useEffect, useState } from "react";
import { SessionPayload } from "@/types/session";
import { CircleHelp, Settings, User } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

const DropdownAvatar = () => {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => setSession(session));
  }, []);

  if (!session) return null;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='flex items-center gap-2'
          onClick={() => router.push(`/${session.role}/help`)}
        >
          <CircleHelp size={16} />
          Help
        </DropdownMenuItem>
        <DropdownMenuItem
          className='flex items-center gap-2'
          onClick={() => router.push(`/${session.role}/settings`)}
        >
          <Settings size={16} />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAvatar;
