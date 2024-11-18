import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string(),
  //   phone: z.number(),
  address: z.string().optional(),
  email: z.string().email(),
});
