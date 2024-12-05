import { User, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { LoginFormSchema } from "./utils/loginFormTypes";
import { InvalidCredentials, EmailNotVerifiedError } from "./utils/Auth/errors";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { verificationEmail } from "./utils/email-verification";

// class UserEmailNotFound extends CredentialsSignin {
//   code = "Email not found";
// }

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { success, data } = LoginFormSchema.safeParse(credentials);
        if (!success) {
          throw new InvalidCredentials();
        }
        const { email, password } = data;

        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!existingUser) throw new InvalidCredentials();

        if (!existingUser.email || !existingUser.password) {
          throw new InvalidCredentials();
        }

        const comparePassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!comparePassword) {
          throw new InvalidCredentials();
        }

        if (!existingUser.emailVerified) {
          await verificationEmail(existingUser.email);
          throw new EmailNotVerifiedError();
        }

        return existingUser as User;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
} satisfies NextAuthConfig;
