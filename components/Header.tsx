"use client"
import Breadcumb from "./Breadcumb"
import DropdownAvatar from "./DropdownAvatar"
import { useSession } from "./SessionProvider"

const Header = () => {
  const { session } = useSession(); 

  return (
    <div className="flex justify-between items-end my-4">
      <Breadcumb />
      <div className="items-center gap-3 hidden md:flex">
        <div className="flex flex-col items-end">
          <p className="font-medium">{session && session?.user?.firstName.charAt(0).toUpperCase() + session?.user?.firstName.slice(1)}</p>
          <p className="text-sm text-neutral-500">{session?.user.role.toLowerCase()}</p>
        </div>
        <DropdownAvatar />
      </div>
    </div>
  )
}

export default Header