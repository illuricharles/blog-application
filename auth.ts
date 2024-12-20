import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "@auth/core/jwt";
import { prisma } from "./prisma";
import { getUserByUserId, setUserEmailVerificationTrue } from "./data/user";

declare module "next-auth" {
  interface User {
    emailVerified?: Date;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    signIn: async ({ account, user }) => {
      if (account?.provider === "github" || account?.provider === "google") {
        if (!user.id) return false;

        try {
          const userExist = await getUserByUserId(user.id);
          if (userExist && !userExist.emailVerified) {
            await setUserEmailVerificationTrue(userExist.id);
          }
        } catch (e) {
          console.log(e);
          return false;
        }
      }

      return true;
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
