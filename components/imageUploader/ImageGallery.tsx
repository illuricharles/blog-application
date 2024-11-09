import { IoMdClose } from "react-icons/io";
import { ImageUploader } from "./ImageUploader";

interface Props {
    visible: boolean,
    handleShowImageGallery: (value: boolean) => void
}

export function ImageGallery({visible, handleShowImageGallery}: Props) {
    if(!visible) return  null
    return <div className="fixed inset-0 flex flex-col justify-center items-center  bg-black h-screen z-50 bg-opacity-50 backdrop-blur-sm">
        <div className="relative w-4/6 h-5/6 bg-white rounded-lg ">
            <div className="absolute right-0 top-0 p-2">
                <button onClick={() => handleShowImageGallery(false)}>
                    <IoMdClose size={22} />
                </button>
            </div>
            <div className="mb-5">
                <ImageUploader />
            </div>
        </div>
        
        
    </div>
}