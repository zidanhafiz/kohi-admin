import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import adminModels from "./models/admin";
import { matchPassword } from "./lib/auth";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const data = { username: credentials.username, password: credentials.password, role: credentials.role };
          const parsedCredentials = z.object({ username: z.string(), password: z.string().min(6), role: z.enum(["ADMIN", "CASHIER"]) }).safeParse(data);

          if (!parsedCredentials.success) return null;

          const { username, password, role } = parsedCredentials.data;

          const user = await adminModels.getAdminByUsername(username, role);

          if (!user) return null;

          const isValid = await matchPassword(password, user.password);

          if (!isValid) return null;

          await adminModels.updateIsActiveByUsername(username, true);

          return {
            firstName: user.firstName,
            email: user.email,
            username: user.username,
            role: user.role,
          }; 
         } catch (error) {
          console.error(error);
          return null; 
        }
      },
    }),
  ],
});
