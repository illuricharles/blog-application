"use server";
import { prisma } from "@/prisma";
import { RegisterFormSchema } from "@/utils/registerFormTypes";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { verificationEmail } from "@/utils/email-verification";

type RegisterFormTypes = z.infer<typeof RegisterFormSchema>;

export async function userRegister(data: RegisterFormTypes) {
  const { email, name, password } = data;
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) return { error: "Email already taken" };
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    // verify user
    await verificationEmail(user.email as string);
    return { success: "Verification mail sent" };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong.Try again after sometime." };
  }
}
