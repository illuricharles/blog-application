"use client"
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { BiCheckCircle } from "react-icons/bi";

export function ProfilePhoto() {
    const [profileImage, setProfileImage] = useState("/p1.jpeg")
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadError, setUploadError] = useState(false)

    return <div className="flex flex-col gap-y-2 py-3 ">
        <div className="mb-3 space-y-2">
            <h1 className="text-2xl font-semibold">Profile picture</h1>
            <p className="text-lg text-gray-500 font-semibold">We support JPEG or PNG under 4MB</p>
        </div>
        <div className="flex items-center gap-x-5 mb-2">
            <div className="relative  ">
                <Image src={profileImage} alt="profile-image" width={1000} height={1000} className="w-20 h-20 rounded-full object-cover" />
            </div>
            <button className="flex items-center">
                {/* <MdFileUpload size={25} /> */}
                {/* <p className="text-base text-gray-800 font-semibold">Upload</p> */}
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        setProfileImage(res[0].url)
                        setUploadError(false)
                        setUploadSuccess(true)

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
            <p className="bg-red-50 text-red-700 w-fit p-3 font-semibold rounded flex items-center gap-x-3">
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