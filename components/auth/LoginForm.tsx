"use client"
import { useForm } from "react-hook-form"
import { LoginFormSchema } from "@/utils/loginFormTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormInputError } from "./FormInputError"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { FormSubmissionSuccess } from "./FormSubmissionSuccess"
import { FormSubmissionError } from "./FormSubmissionError"

type LoginFormTypes = z.infer<typeof LoginFormSchema>

export function LoginForm() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const code = searchParams.get('code')
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormTypes>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmitForm(data: LoginFormTypes) {
        console.log(data)
        await signIn('credentials', data)
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) return <div>Loading....</div>

    return <>
        <form className="flex flex-col gap-y-3 mb-3" onSubmit={handleSubmit(onSubmitForm)}>
            <label className="font-semibold" htmlFor="email">Email</label>
            <div className="flex flex-col">
                <input className="border border-black rounded-md px-2 py-1.5" type="text" placeholder="test@gmail.com" id="email" {...register('email')} />
                {errors.email?.message && <FormInputError message={errors.email.message} />}
            </div>
            <label className="font-semibold" htmlFor="password">Password</label>
            <div className="flex flex-col">
                <input className="border border-black rounded-md px-2 py-1.5" type="password" placeholder="Password" id="password" {...register('password')} />
                {errors.password?.message && <FormInputError message={errors.password.message} />}
            </div>
            <button disabled={isSubmitting} type="submit" className=" bg-black text-white py-2 rounded-md"
            >
                Login
            </button>
            <FormSubmissionSuccess />
            {error === "CredentialsSignin" && code ? <FormSubmissionError code={code} /> : null}
        </form>
    </>
}