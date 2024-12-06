"use server";
import { prisma } from "@/prisma";

export async function getUserDetails(userId: string) {
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
    return userDetails;
  } catch (e) {
    console.log(e);
    throw new Error("Internal server error");
  }
}

// update user profile image

export async function updateUserProfileImage(userId: string, imageUrl: string) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error("Internal server Error");
  }
}

//update user details
