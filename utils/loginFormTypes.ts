import {z} from "zod"

export const LoginFormSchema = z.object({
    email: z.string().email().min(1, {
        message: "Email should not be empty"
    }),
    password: z.string().min(6)
})