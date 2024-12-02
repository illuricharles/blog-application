import Image from "next/image";
import Link from "next/link";

export function PostHeader({ title, authorName, authorId, createdAt }: {
    title: string,
    authorName: string | null,
    authorId: string,
    createdAt: Date
}) {
    return <div className="mb-2 grid grid-cols-1 gap-5 lg:gap-10 xl:gap-9 items-center ">
        <div className="xl:h-full xl:flex xl:flex-col xl:justify-center">
            <h1 className="col-span-1 mb-3 text-2xl sm:text-3xl   font-semibold  pt-4 md:text-3xl sm:mb-8 lg:text-4xl lg:pt-6 xl:pt-0 xl:mb-5 ">
                {title}
            </h1>
            <div className="flex items-center gap-x-2 ">
                <div className="relative w-14 h-14">
                    <Image
                        src="/p1.jpeg"
                        alt="User Avatar"
                        className="object-cover rounded-full"
                        fill
                        sizes="(max-width: 768px) 50px, (max-width: 1200px) 100px, 50px"
                    />
                </div>
                <div className="flex flex-col -space-y-0.5">
                    <span>
                        <Link href={`/user-profile/${authorId}`} className="text-sm md:text-base font-bold text-emerald-600 ">{authorName}</Link>
                    </span>
                    <span className="text-sm  text-gray-500 font-semibold">
                        {`${createdAt.getDate()}.${createdAt.getMonth()}.${createdAt.getFullYear()}`}
                    </span>
                </div>
            </div>
        </div>
        {/* <div className="relative w-full col-span-1 h-full xl:h-60" >
            <Image src = "/p1.jpeg" alt = "p1.jpeg" className="object-cover" priority  fill/>
        </div> */}
    </div>
}