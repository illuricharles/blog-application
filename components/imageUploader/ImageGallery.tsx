"use client"
import { IoMdClose } from "react-icons/io";
import { ImageUploader } from "./ImageUploader";
import Image from "next/image";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useState } from "react";
import { Editor } from "@tiptap/react";
import axios from 'axios';

interface Props {
    visible: boolean,
    handleShowImageGallery: (value: boolean) => void,
    editor?: Editor
}

interface Images {
    appUrl: string,
    key: string,
    name: string,
    url: string
}


export function ImageGallery({ visible, handleShowImageGallery, editor }: Props) {

    const [uploadedImages, setUploadedImage] = useState<Images[]>([])

    function handleUploadedImages(imageDetails: Images) {
        const updatedImages: Images[] = [imageDetails, ...uploadedImages]
        console.log(updatedImages[0])
        setUploadedImage(updatedImages)
    }

    function onSelectImage({ url }: { url: string }) {
        if (url) {
            editor?.chain().focus().setImage({ src: url, alt: "" }).run()
        }
    }

    async function handleOnDelete({ key, url }: { key: string, url: string }) {
        const options = {
            method: 'POST',
            url: 'https://api.uploadthing.com/v6/deleteFiles',
            headers: { 'Content-Type': 'application/json', 'X-Uploadthing-Api-Key': process.env.NEXT_PUBLIC_UPLOADTHING_SECRET },
            data: { fileKeys: [key] }
        };
        try {
            const { data } = await axios.request(options);
            if (data.success) {
                const filterUploadedImage = uploadedImages.filter(eachImage => eachImage.key !== key)
                setUploadedImage(filterUploadedImage)
                editor?.chain().focus().command(({ tr, state }) => {
                    const { doc, schema } = state;
                    let found = false;

                    // Iterate through all nodes in the document to find the matching image node
                    doc.descendants((node, pos) => {
                        if (node.type === schema.nodes.image && node.attrs.src === url) {
                            tr.delete(pos, pos + node.nodeSize); // Delete the image node
                            found = true;
                            return false; // Stop iteration
                        }
                        return true;
                    });

                    return found; // Return true if image was found and deleted
                }).run();
            }

        } catch (error) {
            console.error(error);
        }

    }

    if (!visible) return null
    return <div className="fixed inset-0 flex flex-col justify-center items-center  bg-black h-screen z-50 bg-opacity-50 backdrop-blur-sm ">
        <div className="relative w-4/6 h-5/6 bg-white rounded-lg overflow-y-auto">
            <div className="absolute right-0 top-0 p-2">
                <button onClick={() => handleShowImageGallery(false)}>
                    <IoMdClose size={22} />
                </button>
            </div>
            <div className="mb-5">
                <ImageUploader handleUploadedImages={handleUploadedImages} />
            </div>

            <div className="grid grid-cols-2 p-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {uploadedImages.map(eachImage => {
                    return (

                        <div key={eachImage.key} className="relative col-span-1 overflow-hidden aspect-square w-full h-full group rounded">
                            <Image src={eachImage.url}
                                alt=""
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex ">
                                    <button className="text-white bg-blue-600 flex-1 flex justify-center p-0.5"
                                        onClick={() => {
                                            onSelectImage(eachImage)
                                            handleShowImageGallery(false)
                                        }}>
                                        <IoCheckmark size={20} />
                                    </button>
                                    <button className="text-white bg-red-600 flex-1 flex justify-center p-0.5"
                                        onClick={() => {
                                            handleOnDelete(eachImage)
                                            handleShowImageGallery(false)
                                        }}>
                                        <IoClose size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    )
                })}

            </div>
        </div>
    </div>
}