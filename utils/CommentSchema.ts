import { z } from "zod";
export const CommentSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment shouldn't be empty",
  }),
});
