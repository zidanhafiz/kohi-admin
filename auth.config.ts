import type { NextAuthConfig, User } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/cashier") || nextUrl.pathname.startsWith("/cashier");

      const role = auth?.user?.role?.toLowerCase();

      if (!isLoggedIn && isOnDashboard) {
        return false;
      }

      if (isLoggedIn && !nextUrl.pathname.startsWith(`/${role}`)) {
        return Response.redirect(new URL(`/${role}`, nextUrl));
      }

      return true;
    },
    session({ session, token }) {
      const user = {
        email: token.email,
        firstName: token.firstName,
        username: token.username,
        role: token.role,
      } as User;
      return { expires: session.expires, user: { ...user }};
    },
    jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
  providers: [],
} satisfies NextAuthConfig;
