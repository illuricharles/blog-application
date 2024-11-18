"use client"

import { z } from "zod"
import { ProfileSchema } from "@/utils/formProfileTypes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"

type ProfileTypes = z.infer<typeof ProfileSchema>

export function ProfileDetails() {
    const [loading, setLoading] = useState(true)
    const { register } = useForm<ProfileTypes>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: "username",
            address: "123456",
            email: "username@gmail.com"
        }
    })

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) return <div className="flex flex-col gap-y-3 py-3">Loading...</div>

    return <div className="flex flex-col gap-y-3 py-3 ">
        <h1 className="text-xl font-semibold">Basic Info</h1>
        <p className="text-base text-gray-500 font-semibold">Your basic info details</p>
        <label htmlFor="name" className="text-base text-gray-600 font-semibold">Full name</label>
        <input id="name" className="py-1.5 border-2 px-3 text-gray-500 w-2/6 rounded-md" {...register('name')} />
        <label htmlFor='email' className="text-base text-gray-600 font-semibold">Email</label>
        <input type="email" id="email" className="py-1.5 border-2 px-3 text-gray-500 w-2/6 rounded-md" placeholder="username@gmail.com" {...register('email')} />
        {/* <label htmlFor="number" className="text-base text-gray-600 font-semibold">Phone number</label>
        <p className="py-1.5 border-2 px-3 text-gray-500 w-2/6 rounded-md">9999999999</p> */}

    </div>
}