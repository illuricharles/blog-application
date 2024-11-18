"use client"
import { AccountButtons } from "@/components/auth/AccountButtons"
import { FormHeader } from "@/components/auth/FormHeader"
import { FormSubmissionError } from "@/components/auth/FormSubmissionError"
import { FormSubmissionSuccess } from "@/components/auth/FormSubmissionSuccess"
import { FormToggleLink } from "@/components/auth/FormToggleLink"
import { LoginForm } from "@/components/auth/LoginForm"
import { useEffect, useState } from "react"


export default function Login() {
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) return null

    return <div className="">

        <div className=" border shadow-md rounded p-5 sm:w-96 w-80">
            <FormHeader />
            <LoginForm />
            <FormSubmissionSuccess />
            <FormSubmissionError />
            <AccountButtons />
            <FormToggleLink mode="login" />
        </div>
    </div>
}