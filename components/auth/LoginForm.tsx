"use client"
import { useForm} from "react-hook-form"
import { LoginFormSchema } from "@/utils/loginFormTypes"
import { zodResolver } from "@hookform/resolvers/zod"
export function LoginForm() {
    const {register} = useForm({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    return <form className="flex flex-col gap-y-3">
        <label className="font-semibold" htmlFor = "email">Email</label>
        <input className="border border-black rounded-md px-2 py-1.5" type = "text" placeholder="test@gmail.com" id = "email" {...register('email')}/>
        <label className="font-semibold" htmlFor="password">Password</label>
        <input className="border border-black rounded-md px-2 py-1.5" type = "password" placeholder="Password" id = "password" {...register('password')} />
        <button type="submit" className=" bg-black text-white py-2 rounded-md">Login</button>
    </form>
}