"use client";
import { UploadButton } from "@/utils/uploadthing";

interface Images {
    appUrl: string,
    key: string,
    name: string,
    url: string
}


interface Props {
    handleUploadedImages: (imageDetails: Images) => void
}

export function ImageUploader({handleUploadedImages}: Props) {

     
    return <div className="flex w-full flex-col items-center justify-between p-8">
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
            handleUploadedImages(imageDetails)
            console.log("Files: ", res);
            alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
        }}
        />
    </div>


}