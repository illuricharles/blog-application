'use client'

import { useEffect, useState } from "react";
import { ProfilePhoto } from "../ProfilePhoto";
export function EditProfileImage({ userProfileImage, userId }: { userProfileImage: { image: string | null }, userId: string }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])
    if (loading) {
        return <div>
            loading...
        </div>
    }
    return <>
        <hr className="h-0.5 bg-slate-100 border-0" />
        <ProfilePhoto userProfileImage={userProfileImage.image} userId={userId} />
        <hr className="h-0.5 bg-slate-100 border-0" />
    </>
}