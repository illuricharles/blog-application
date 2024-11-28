"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect, RedirectType } from "next/navigation";
import { PostSchema } from "@/utils/editor/editorValidation";

interface BlogPostErrorsTypes {
  content: string;
  title: string;
  description: string;
  coverPicUrl: string;
}

export async function publishBlog(post: BlogPostErrorsTypes) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/auth/login", RedirectType.replace);
  }

  const response = PostSchema.safeParse(post);

  if (!response.success) {
    return {
      error: true,
      zodValidationErrors: true,
      message: "Validation Failed",
      issues: response.error.formErrors.fieldErrors,
    };
  }

  try {
    const { data } = response;
    if (session.user.id) {
      const createdPost = await prisma.blogPost.create({
        data: {
          content: data.content,
          coverImage: data.coverPicUrl,
          title: data.title,
          description: data.description,
          authorId: session.user.id,
        },
      });
      return {
        error: false,
        post: createdPost,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      error: true,
      message: "Something went wrong. please try again after sometime",
    };
  }
}
