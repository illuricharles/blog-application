import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "@auth/core/jwt";
import { prisma } from "./prisma";
import { VerifyEmail } from "./utils/Auth/errors";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    signIn: async () => {
      throw new VerifyEmail();
    },

    jwt: async ({ token }: { token: JWT }) => {
      if (token.sub) {
        token.id = token.sub;
      }
      return token;
    },

    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
