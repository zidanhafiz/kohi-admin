import LoginFormCard from "@/components/LoginFormCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Home() {
  return (
    <main className='mx-auto w-fit my-20'>
      <Tabs
        defaultValue='cashier'
        className='w-[400px]'
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='cashier'>Cashier</TabsTrigger>
          <TabsTrigger value='admin'>Admin</TabsTrigger>
        </TabsList>
        <TabsContent value='cashier'>
          <LoginFormCard
            title='Cashier'
            desc='Login to Cashier Page'
          />
        </TabsContent>
        <TabsContent value='admin'>
          <LoginFormCard
            title='Admin'
            desc='Login to Admin Page'
          />
        </TabsContent>
      </Tabs>
      <Link
        href='/register'
        className='w-fit block my-4 mx-auto text-center text-sm text-neutral-500'
      >
        Create new account
      </Link>
    </main>
  );
}
