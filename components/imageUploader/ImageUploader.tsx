"use client";
import { UploadButton } from "@/utils/uploadthing";

export function ImageUploader() {

     
    return <div className="flex w-full flex-col items-center justify-between p-8">
        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
            // Do something with the response
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