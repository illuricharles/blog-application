"use client"
import { FormHeader } from "@/components/auth/FormHeader"
import { LoginForm } from "@/components/auth/LoginForm"
import { useEffect, useState } from "react"


export default function Login() {
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        setLoading(false)
    }, [])

    if(loading) return null

    return <div className="">
        
        <div className=" border shadow-md rounded p-5 w-96">
            <FormHeader/>
            <LoginForm/>
        </div>
    </div>
}