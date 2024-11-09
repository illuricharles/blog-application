import clsx from "clsx";
import { FaImages } from "react-icons/fa";

interface Props {
    onImageSelect: () => void
}

export function ImageUploaderButton({onImageSelect}: Props) {
    return <button className={clsx('p-2', "bg-white text-black")} onClick={onImageSelect}>
         <FaImages size={22} />
    </button>
}