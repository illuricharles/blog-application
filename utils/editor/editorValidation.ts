import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1, {
    message: "title shouldn't be empty",
  }),
  description: z.string().min(1, {
    message: "Description shouldn't be empty",
  }),
  content: z.string().min(50, {
    message: "Minimum 50 characters required",
  }),
  coverPicUrl: z.string().url(),
});
