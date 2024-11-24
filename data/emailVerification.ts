import { prisma } from "@/prisma";

export async function getEmailVerificationByToken(token: string) {
  const emailVerificationDetails = await prisma.emailVerification.findUnique({
    where: {
      token,
    },
  });
  if (!emailVerificationDetails) {
    return null;
  }
  return emailVerificationDetails;
}
