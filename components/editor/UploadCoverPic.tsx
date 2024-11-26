"use client";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

// interface Images {
//     appUrl: string,
//     key: string,
//     name: string,
//     url: string
// }


// interface Props {
//     handleUploadedImages: (imageDetails: Images) => void
// }

export function UploadCoverPic() {
    const [coverPic, setCoverPic] = useState('')

    return <div className="flex flex-col items-start gap-y-4  w-fit">
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                const imageDetails = {
                    appUrl: res[0].appUrl,
                    key: res[0].key,
                    name: res[0].name,
                    url: res[0].url
                }
                setCoverPic(imageDetails.url)
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                console.log(error)
                alert(`ERROR! ${error.message}`);
            }}
        />
        {coverPic ?
            <Image alt="cover-image" src={coverPic} height={1000} width={1000} className="object-cover aspect-square w-56" />
            : null
        }
    </div>


}