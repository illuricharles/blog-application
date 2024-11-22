import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { LoginFormSchema } from "./utils/loginFormTypes";
import { InvalidCredentials } from "./utils/Auth/errors";

// class UserEmailNotFound extends CredentialsSignin {
//   code = "Email not found";
// }

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
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

        if (!existingUser?.email || !existingUser.password) {
          throw new InvalidCredentials();
        }

        const comparePassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!comparePassword) {
          throw new InvalidCredentials();
        }

        return existingUser;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
