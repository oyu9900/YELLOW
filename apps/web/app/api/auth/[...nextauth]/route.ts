import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // 🔐 JWT-д role ачаална
    async jwt({ token }) {
      if (token.email) {
        const user = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true },
        });

        token.role = user?.role ?? "user";
      }
      return token;
    },

    // 🧠 Session-д role дамжуулна
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
