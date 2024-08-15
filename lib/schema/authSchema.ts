import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.enum(["CASHIER", "ADMIN"]),
});

export type LoginSchema = z.infer<typeof loginSchema>;