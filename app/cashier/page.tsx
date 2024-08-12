"use client";
import { Button } from "@/components/ui/button";
import { logoutSession } from "@/lib/auth";
import Link from "next/link";

const CashierPage = () => {
  return (
    <div>
      <h1>Cashier Page</h1>
      <Link href='/'>Go login</Link>
      <Button onClick={() => logoutSession()}>Logout</Button>
    </div>
  )
}

export default CashierPage