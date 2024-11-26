"use server";
import { prisma } from "@/prisma";

interface Props {
  userId: string;
  imageUrl: string;
  imageKey: string;
}

export async function addImageDetailsToGallery({
  userId,
  imageUrl,
  imageKey,
}: Props) {
  try {
    await prisma.gallery.create({
      data: {
        userId,
        imageUrl,
        imageKey,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getUserGalleryById(userId: string) {
  try {
    const uploadedImages = await prisma.gallery.findMany({
      where: {
        userId,
      },
      select: {
        imageKey: true,
        imageUrl: true,
      },
    });

    const transformedImages = uploadedImages.map((image) => ({
      key: image.imageKey,
      url: image.imageUrl,
    }));

    return transformedImages;
  } catch (e) {
    console.log(e);
  }
}

export async function removeImageByKey(key: string) {
  try {
    await prisma.gallery.delete({
      where: {
        imageKey: key,
      },
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
