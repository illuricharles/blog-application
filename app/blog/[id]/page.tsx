import { BlogContent } from "@/components/blogContent/BlogContent"
import Image from "next/image"

export default function Blog() {
    return <div>
        <div className="mb-10 grid grid-cols-1 gap-5 lg:gap-10 xl:gap-9 items-center ">
            <div className="xl:h-full xl:flex xl:flex-col xl:justify-center">
                <h1 className="col-span-1 mb-6 text-2xl sm:text-3xl   font-medium lg:font-normal pt-4 md:text-3xl sm:mb-8 lg:text-5xl lg:pt-6 xl:pt-0 xl:mb-12">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h1>
                <div className="flex items-center gap-x-2 ">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 relative xl:w-11 xl:h-11">
                        <Image src='/p1.jpeg' alt="logo" className="object-cover rounded-full" fill />
                    </div>
                    <div className="flex flex-col text-gray-500 text-sm sm:text-sm font-medium sm:leading-4 xl:text-base xl:font-semibold xl:leading-5">
                        <span>John Doe</span>
                        <span className="lg:text-xs text-gray-400">10.10.2023</span>
                    </div>
                </div>
            </div>
            {/* <div className="relative w-full col-span-1 h-full xl:h-60" >
                <Image src = "/p1.jpeg" alt = "p1.jpeg" className="object-cover" priority  fill/>
            </div> */}
        </div>
        <BlogContent />
    </div>
}