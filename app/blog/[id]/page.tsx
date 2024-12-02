// import { BlogContent } from "@/components/blogContent/BlogContent"
import Comments from "@/components/blogContent/Comments"
import { Content } from "@/components/blogContent/Content"
import { ServerError } from "@/components/errors/ServerError"
// import { Menu } from "@/components/Menu"
import { PostHeader } from "@/components/post/PostHeader"
import { prisma } from "@/prisma"
import Link from "next/link"

async function getPost(id: string) {
    try {

        const post = await prisma.blogPost.findUnique({
            where: {
                id
            }
        })
        return post
    }
    catch (e) {
        console.log(e)
        throw new Error("Error while getting post")
    }
}

async function getPostUserDetails(blogId: string) {
    const userDetails = await prisma.blogPost.findUnique({
        where: {
            id: blogId
        },
        select: {
            createdAt: true,
            authorId: true,
            user: {
                select: {
                    name: true,
                }
            }
        }
    })
    return userDetails
}

export default async function Blog({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    let post
    let user
    try {
        post = await getPost(id)
        user = await getPostUserDetails(id)
        console.log(user)
    }
    catch (e) {
        console.log(e)
        return <div className="flex-grow mb-10 flex justify-center items-center">
            <ServerError />
        </div>
    }

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


        {/* <BlogContent content={post.content} /> */}

        {/* 
            Commented the BlogContent component to avoid the prop drilling(content) and 
            pasted the BlogContent Component code below.
        */}
        <div className="mb-10">
            <div className="grid grid-cols-7 gap-x-10">
                <div className="hidden col-span-1 lg:block"></div>
                <div className="col-span-7 lg:col-span-5 space-x-8 xl:space-y-10">
                    <div>
                        {user ? <PostHeader title={post.title} authorName={user.user.name} authorId={user.authorId} createdAt={user.createdAt} /> : null}
                        <Content content={post.content} />
                        <Comments />
                    </div>
                </div>

                {/* <div className="hidden col-span-2 lg:block">
                    <Menu />
                </div> */}

            </div>
        </div>

    </div>
}