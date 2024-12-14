"use client"
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { BiCheckCircle } from "react-icons/bi";
import { updateUserProfileImage } from "@/actions/editUserProfile";

export function ProfilePhoto({ userProfileImage, userId }: { userProfileImage: string | null, userId: string }) {
    const [profileImage, setProfileImage] = useState(userProfileImage ? userProfileImage : '/p1.jpeg')
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadError, setUploadError] = useState(false)

    return <div className="flex flex-col gap-y-2 py-3 ">
        <div className="mb-3 space-y-2">
            <h1 className="text-2xl font-semibold">Profile picture</h1>
            <p className="text-lg text-gray-500 font-semibold">We support JPEG or PNG under 4MB</p>
        </div>
        <div className="flex flex-col gap-x-5 mb-2 w-fit items-center gap-y-4">
            {profileImage &&
                <div className="relative">
                    <Image src={profileImage ? profileImage : "/p1.jpeg"} alt="profile-image" width={500} height={500} className="w-24 h-24 rounded-full object-cover" />
                </div>
            }
            <button className="flex items-center">
                {/* <MdFileUpload size={25} /> */}
                {/* <p className="text-base text-gray-800 font-semibold">Upload</p> */}
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={async (res) => {
                        // Do something with the response
                        console.log("Files: ", res);

                        try {


                            await updateUserProfileImage(userId, res[0].url)
                            setProfileImage(res[0].url)
                            setUploadError(false)
                            setUploadSuccess(true)
                        }
                        catch (e) {
                            console.log(e)
                            setUploadError(true)
                            setUploadSuccess(false)
                        }

                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                        setUploadError(true)
                        setUploadSuccess(false)
                    }}
                />
            </button>

        </div>
        {uploadError ?
            <p className="bg-red-200 text-red-700 w-fit p-3 font-semibold rounded flex items-center gap-x-3">
                <FaTriangleExclamation size={25} />
                Something went wrong
            </p> :
            null}

        {uploadSuccess ?
            <p className="bg-emerald-100 text-emerald-700 w-fit p-3 font-semibold rounded flex items-center gap-x-3">
                <BiCheckCircle size={25} />
                Uploaded successfully
            </p> :
            null}
    </div>
}