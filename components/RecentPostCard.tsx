import Image from "next/image";
import Link from "next/link";

export function RecentPostCard() {
    return <div className="">
        <div className="grid grid-cols-12 gap-x-7  items-center justify-center">
            <div className="col-span-12 mb-3 sm:mb-0 sm:col-span-6 ">
                <Image
                    src = "/p1.jpeg"
                    alt = "card image"
                    width={500}
                    height={500}
                    objectFit="cover"
                    className=" h-60 sm:h-72  rounded-sm w-full"
                />
            </div>

            <div className="col-span-12 sm:col-span-6">
                <div className="gap-3 flex flex-col sm:gap-4">
                    <p className="text-gray-500 font-medium">11.02.2023 - <Link href="/" className="text-red-600 font-semibold">CULTURE</Link></p>
                    <Link href="/" className="text-xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. </Link>
                    <p className="text-gray-600 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sint explicabo earum debitis! Sapiente vitae, nemo consequuntur rerum asperiores voluptate </p>
                    <Link href="/" className="font-semibold border-b-2 border-b-red-500 w-fit">Read more</Link>
                </div>
            </div>
        </div>
    </div>
}