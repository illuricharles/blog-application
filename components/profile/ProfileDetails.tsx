"use client"

import { z } from "zod"
import { ProfileSchema, ProfileImageUrlSchema } from "@/utils/formProfileTypes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { ServerError } from "../errors/ServerError"
import { getUserDetails, updateUserDetails } from "@/actions/editUserProfile"
import { ProfilePhoto } from "./ProfilePhoto"
import { IoMdCheckmarkCircle } from "react-icons/io"


type ProfileTypes = z.infer<typeof ProfileSchema>
type ProfileImageUrlTypes = z.infer<typeof ProfileImageUrlSchema>

interface ProfileDetailsTypes {
    message: string,
    description: string
}


export function ProfileDetails({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ProfileDetailsTypes | null>(null)
    const [userDetailsUpdateSuccess, setUserDetailsUpdateSuccess] = useState(false)
    const [responseFieldErrors, setResponseFieldErrors] = useState<ProfileTypes>({
        name: ""
    })
    const [responseFormError, setResponseFormError] = useState("")
    const [profileImageUrl, setProfileImageUrl] = useState<ProfileImageUrlTypes>({
        imageUrl: process.env.DEFAULT_IMAGE || '/p1.jpeg'
    })
    const { register, setValue, watch, reset } = useForm<ProfileTypes>({
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
            <button className="bg-blue-600 text-white px-4 py-1.5 capitalize mt-1.5 rounded mb-1.5"
                onClick={async () => {
                    const initialResponseFieldErrors: ProfileTypes = {
                        name: ""
                    }
                    setResponseFieldErrors(initialResponseFieldErrors)
                    setResponseFormError("")
                    setUserDetailsUpdateSuccess(false)
                    try {
                        const response = await updateUserDetails(userId, watchFields)
                        if ('error' in response && response.error) {
                            const { fieldErrors, formErrors } = response.message || {}
                            if (Object.keys(fieldErrors).length > 0) {
                                Object.entries(fieldErrors).map(([key, value]) => {
                                    initialResponseFieldErrors[key as keyof ProfileTypes] = value[0]
                                })
                                setResponseFieldErrors({ ...initialResponseFieldErrors })

                            }
                            else if (formErrors.length > 0) {
                                setResponseFormError(`Invalid data submission. Please check the form and try again.`)
                            }
                        }
                        else {
                            if (response.updatedDetails && response.updatedDetails) {
                                const { updatedDetails } = response
                                setInitialValues(updatedDetails)
                                reset(updatedDetails)
                                setUserDetailsUpdateSuccess(true)

                            }
                        }

                    }
                    catch (e) {
                        if (e instanceof Error) {
                            setResponseFormError(e.message)
                        }
                        else {
                            setResponseFormError("Unexpected error occurred. Please try again later.")
                        }
                    }
                }}
            >
                update
            </button>
            {responseFormError && <p className="text-red-500 text-sm font-semibold ml-0.5">{responseFormError || `Invalid data submission. Please check the form and try again.`}</p>}

        </div>
    }

    return <>
        <div className="flex flex-col gap-y-3 py-3 ">
            <h1 className="text-xl font-semibold">Basic Info</h1>
            <p className="text-base text-gray-500 font-semibold">Your basic info details</p>
            <label htmlFor="name" className="text-base text-gray-600 font-semibold">Full name</label>
            <div>
                <input id="name" className="py-1.5 border-2 px-3 text-gray-600 w-2/6 rounded-md font-semibold" {...register('name')} />
                {responseFieldErrors.name && <p className="text-red-500 text-sm font-semibold ml-0.5">{responseFieldErrors.name || `Unable to update the profile. Please try again after sometime.`}</p>}
            </div>
            {/* <label htmlFor="number" className="text-base text-gray-600 font-semibold">Phone number</label>
        <p className="py-1.5 border-2 px-3 text-gray-500 w-2/6 rounded-md">9999999999</p> */}
            <div>
                {userDetailsUpdateSuccess &&
                    <div className="flex gap-x-1 text-emerald-600 items-center mb-1.5">
                        <IoMdCheckmarkCircle size={26} />
                        <p className="font-semibold">Updated Successfully</p>
                    </div>
                }
                {
                    isFieldsUpdated ? <RenderUpdateButton /> : null
                }
            </div>

        </div>
        <hr className="h-0.5 bg-slate-100 border-0" />
        <ProfilePhoto userProfileImage={profileImageUrl.imageUrl} userId={userId} />
        <hr className="h-0.5 bg-slate-100 border-0" />
    </>
}