"use server";
import { prisma } from "@/prisma";
import { ProfileSchema } from "@/utils/formProfileTypes";
import { z } from "zod";

type ProfileTypes = z.infer<typeof ProfileSchema>;

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

//Todo
//update user details

// validation(completed)
// perform zod validation (ProfileTypes) (completed)
// if validation fails send the error message object which contains fields as keys and value is array of validation error and also check form errors
// completed
// in frontend if there is no message then set the default message

// update user data
// (Recommended)userDetails object contains the necessary data since the data is fields are in small numbers update the whole user details
// if the user details contains so many fields get the initial user details and check each value and update only the necessary fields.
//show formUpdateSuccess if success else show Failed (internal server error) something went wrong.

export async function updateUserDetails(
  userId: string,
  userDetails: ProfileTypes
) {
  const response = ProfileSchema.safeParse(userDetails);
  console.log(response);
  if (!response.success) {
    return {
      error: true,
      message: response.error.flatten(),
    };
  }
  const { data } = response;
  try {
    const userDetails = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        name: true,
      },
    });

    return { updatedDetails: userDetails };
  } catch (e) {
    console.log(e);
    throw new Error("Unexpected error occurred. Please try again later.");
  }
}
