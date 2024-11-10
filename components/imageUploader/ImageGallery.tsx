"use client"
import { IoMdClose } from "react-icons/io";
import { ImageUploader } from "./ImageUploader";
import Image from "next/image";
import { IoCheckmark, IoClose } from "react-icons/io5";

interface Props {
    visible: boolean,
    handleShowImageGallery: (value: boolean) => void
}

export function ImageGallery({visible, handleShowImageGallery}: Props) {
    if(!visible) return  null
    return <div className="fixed inset-0 flex flex-col justify-center items-center  bg-black h-screen z-50 bg-opacity-50 backdrop-blur-sm">
        <div className="relative w-4/6 h-5/6 bg-white rounded-lg overflow-y-auto">
            <div className="absolute right-0 top-0 p-2">
                <button onClick={() => handleShowImageGallery(false)}>
                    <IoMdClose size={22} />
                </button>
            </div>
            <div className="mb-5">
                <ImageUploader />
            </div>

            <div className="grid grid-cols-7 p-3  ">
                <div className="relative col-span-1 overflow-hidden aspect-square w-full h-full group rounded">
                    <Image src = "https://utfs.io/f/X4iyVj1Dt1EmdwOHQmZIBn04Mvc9Wos2PfKQywjiplS6qCNm"
                    alt = ""
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex ">
                            <button className="text-white bg-blue-600 flex-1 flex justify-center p-0.5">
                                <IoCheckmark size={20} />
                            </button>
                            <button className="text-white bg-red-600 flex-1 flex justify-center p-0.5">
                                <IoClose  size={20}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}