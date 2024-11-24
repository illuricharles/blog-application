"use server";
import { prisma } from "@/prisma";
import { RegisterFormSchema } from "@/utils/registerFormTypes";
import { z } from "zod";
import bcrypt from "bcryptjs";

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
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return { success: "Registered Successfully" };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong.Try again after sometime." };
  }
}
