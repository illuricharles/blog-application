import { z } from "zod";

export const RegisterFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name should not be empty",
  }),
  email: z.string().email(),
  password: z.string().min(6),
});
