import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Username should be minimum 2 characters",
  }),
  //   phone: z.number(),
});

export const ProfileImageUrlSchema = z.object({
  imageUrl: z.string().url(),
});
