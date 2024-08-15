"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticate } from "@/actions/auth";
import { loginSchema, type LoginSchema } from "@/lib/schema/authSchema";
import { redirect } from "next/navigation";

const LoginFormCard = ({ title, desc }: { title: string; desc: string }) => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      role: title === "Admin" ? "ADMIN" : "CASHIER",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: LoginSchema) => {
    if (isPending) return;
    startTransition(async () => {
      const res = await authenticate(values);

      if (!res.success) {
        form.setError("root", {
          message: res.message,
        });
        return;
      }
      return redirect(`/${values.role.toLowerCase()}`);
    });
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                disabled={isPending}
              />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Show Password
              </label>
            </div>
            {formState.errors.root && <ErrorMessage>{formState.errors.root.message}</ErrorMessage>}
            <Button
              type='submit'
              disabled={isPending}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginFormCard;

