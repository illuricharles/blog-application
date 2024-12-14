"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { CommentSchema } from "@/utils/CommentSchema";
import { redirect } from "next/navigation";
import { z } from "zod";

type CommentTypes = z.infer<typeof CommentSchema>;

export async function addComment(comment: CommentTypes, postId: string) {
  const session = await auth();
  const data = CommentSchema.safeParse(comment);

  if (!data.success) {
    return {
      error: true,
      message: data.error?.flatten(),
    };
  }

  try {
    if (session?.user?.id) {
      const response = await prisma.comment.create({
        data: {
          comment: data.data.comment,
          postId,
          userId: session?.user?.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
      return {
        newComment: response,
      };
    } else {
      throw new Error("session user is undefined");
    }
  } catch (e) {
    console.log(e);
    throw new Error("something went wrong while adding comment.");
  }
}

// return the post comment details including commented person name, id
// display errors such as unable to display comments or something went wrong while getting comments. please refresh or try again later

export async function getAllComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
            image: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return comments;
  } catch (e) {
    console.log(e);
    throw new Error(
      "Unable to get comments. Please reload the page or try again later."
    );
  }
}

export async function deleteCommentById(commentId: string) {
  const session = await auth();
  if (!session || !session.user) {
    return redirect("/");
  }
  let commentDetails;
  try {
    commentDetails = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        id: true,
        userId: true,
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error("Unexpected error occurred. Please try again later");
  }
  if (!commentDetails) {
    throw new Error("Comment doesn't exist.");
  }

  if (commentDetails.userId !== session.user.id) {
    throw new Error("You can't delete another user's comment.");
  }

  let deletedCommentId;
  try {
    deletedCommentId = await prisma.comment.delete({
      where: {
        id: commentId,
      },
      select: {
        id: true,
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error("Unable to delete comment now. Please try again later.");
  }
  return deletedCommentId;
}
