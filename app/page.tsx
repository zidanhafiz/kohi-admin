"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.enum(["CASHIER", "ADMIN"]),
});

type FormSchema = z.infer<typeof formSchema>;

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
          <FormCard
            title='Cashier'
            desc='Login to Cashier Page'
          />
        </TabsContent>
        <TabsContent value='admin'>
          <FormCard
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

const FormCard = ({ title, desc }: { title: string; desc: string }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: title === "Admin" ? "ADMIN" : "CASHIER",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: FormSchema) => {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error.message);
      form.setError("root", {
        message: error.message,
      });
      return;
    }

    form.clearErrors();
    const data = await res.json();
    const { role } = data.data;
    router.push(`/${role.toLowerCase()}`);
    return;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-y-6'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your username'
                      disabled={formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder='Your password'
                      disabled={formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2 justify-end'>
              <Checkbox
                id='terms'
                checked={showPassword}
                onCheckedChange={() => setShowPassword(!showPassword)}
                disabled={formState.isSubmitting}
              />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Show Password
              </label>
            </div>
            {formState.isSubmitSuccessful && <p className='text-green-500 text-sm w-full text-center'>Success Login!</p>}
            {formState.errors.root && <ErrorMessage>{formState.errors.root.message}</ErrorMessage>}
            <Button
              type='submit'
              disabled={formState.isSubmitting}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

