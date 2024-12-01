// import { BlogContent } from "@/components/blogContent/BlogContent"
import Comments from "@/components/blogContent/Comments"
import { Content } from "@/components/blogContent/Content"
import { Menu } from "@/components/Menu"
import { prisma } from "@/prisma"
import Image from "next/image"
import Link from "next/link"

async function getPost(id: string) {
    const post = await prisma.blogPost.findUnique({
        where: {
            id
        }
    })
    return post
}

export default async function Blog({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = await getPost(id)

    if (!post) {
        return <div className="grow flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-3xl font-semibold mb-3">No post found</h1>
                <button className=" bg-emerald-700 text-white px-3 py-2 font-semibold rounded-md">
                    <Link href={'/'}>Home</Link>
                </button>
            </div>
        </div>
    }


    return <div className="grow">

        <div className="mb-2 grid grid-cols-1 gap-5 lg:gap-10 xl:gap-9 items-center ">
            <div className="xl:h-full xl:flex xl:flex-col xl:justify-center">
                <h1 className="col-span-1 mb-3 text-2xl sm:text-3xl   font-semibold  pt-4 md:text-3xl sm:mb-8 lg:text-4xl lg:pt-6 xl:pt-0 xl:mb-5 ">
                    {post.title}
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
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm md:text-base  font-semibold">John Doe</span>
                        <span className="text-sm lg:text-sm text-gray-500 font-semibold">10.10.2023</span>
                    </div>
                </div>
            </div>
            {/* <div className="relative w-full col-span-1 h-full xl:h-60" >
                    <Image src = "/p1.jpeg" alt = "p1.jpeg" className="object-cover" priority  fill/>
                </div> */}
        </div>


        {/* <BlogContent content={post.content} /> */}

        {/* 
            Commented the BlogContent component to avoid the prop drilling(content) and 
            pasted the BlogContent Component code below.
        */}
        <div className="mb-10">
            <div className="grid grid-cols-7 gap-x-10">
                <div className="col-span-7 lg:col-span-5 space-x-8 xl:space-y-10">
                    <div>
                        <Content content={post.content} />
                        <Comments />
                    </div>
                </div>

                <div className="hidden col-span-2 lg:block">
                    <Menu />
                </div>

            </div>
        </div>

    </div>
}