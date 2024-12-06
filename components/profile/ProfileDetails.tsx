"use client"

import { z } from "zod"
import { ProfileSchema, ProfileImageUrlSchema } from "@/utils/formProfileTypes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { ServerError } from "../errors/ServerError"
import { getUserDetails } from "@/actions/editUserProfile"
import { ProfilePhoto } from "./ProfilePhoto"
import { useRouter } from "next/router"


type ProfileTypes = z.infer<typeof ProfileSchema>
type ProfileImageUrlTypes = z.infer<typeof ProfileImageUrlSchema>

interface ProfileDetailsTypes {
    message: string,
    description: string
}

export function ProfileDetails({ userId }: { userId: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ProfileDetailsTypes | null>(null)
    const [profileImageUrl, setProfileImageUrl] = useState<ProfileImageUrlTypes>({
        imageUrl: process.env.DEFAULT_IMAGE || '/p1.jpeg'
    })
    const { register, setValue, watch } = useForm<ProfileTypes>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: "",
        }
    })

    const watchFields = watch()
    const [initialValues, setInitialValues] = useState<ProfileTypes>({
        name: "",
    })

    useEffect(() => {
        // server action get the user details and display them
        async function userDetails(userId: string) {
            try {
                const user = await getUserDetails(userId)
                if (user && user.name) {
                    setValue('name', user.name)
                    setInitialValues({
                        name: user.name,
                    })
                    if (user.image) {
                        setProfileImageUrl({
                            imageUrl: user.image
                        })
                    }
                }

            }
            catch (e) {
                if (e instanceof Error) {
                    setError({
                        message: e.message,
                        description: "something went wrong. Please refresh the page or try again later."
                    })
                }
            }
            finally {
                setLoading(false)
            }
        }
        userDetails(userId)

    }, [userId, setValue])

    if (loading) return <div className="flex flex-col gap-y-3 py-3">Loading...</div>

    if (error) {
        return <div className="flex-grow flex justify-center items-center">
            <ServerError />
        </div>
    }

    const isFieldsUpdated = JSON.stringify(initialValues) !== JSON.stringify(watchFields)

    function RenderUpdateButton() {
        return <div>
            <button className="bg-blue-600 text-white px-4 py-1.5 capitalize mt-1.5 rounded">update</button>
        </div>
    }

    return <>
        <div className="flex flex-col gap-y-3 py-3 ">
            <h1 className="text-xl font-semibold">Basic Info</h1>
            <p className="text-base text-gray-500 font-semibold">Your basic info details</p>
            <label htmlFor="name" className="text-base text-gray-600 font-semibold">Full name</label>
            <input id="name" className="py-1.5 border-2 px-3 text-gray-600 w-2/6 rounded-md font-semibold" {...register('name')} />
            {/* <label htmlFor="number" className="text-base text-gray-600 font-semibold">Phone number</label>
        <p className="py-1.5 border-2 px-3 text-gray-500 w-2/6 rounded-md">9999999999</p> */}
            {
                isFieldsUpdated ? <RenderUpdateButton /> : null
            }
        </div>
        <hr className="h-0.5 bg-slate-100 border-0" />
        <ProfilePhoto userProfileImage={profileImageUrl.imageUrl} userId={userId} />
        <hr className="h-0.5 bg-slate-100 border-0" />
    </>
}