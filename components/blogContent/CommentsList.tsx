import Image from "next/image";

export default function CommentList() {
    return <div className="">
        <div className="flex items-center gap-x-2 mb-2.5">
            <div className="relative w-11 h-11">
                <Image alt = "" src = "/p1.jpeg" fill className="object-cover  rounded-full" />
            </div>
            <div className="flex flex-col leading-5 text-gray-600 font-medium">
                <span>John Doe</span>
                <span className="text-gray-500 text-sm">10.10.2023</span>
            </div>
        </div>
        <div>
            <p className="pr-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad distinctio excepturi debitis obcaecati eum nesciunt, enim consequatur tempora dolorem sed consectetur recusandae vitae doloremque porro, molestias exercitationem voluptas fuga ducimus.</p>
        </div>
    </div>
}