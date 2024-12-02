import { prisma } from "@/prisma";
// import { Menu } from "./Menu";
import { PaginationButtons } from "./pagination/PaginationButtons";
import { RecentPostCard } from "./RecentPostCard";
import { ServerError } from "./errors/ServerError";


async function getBlogPosts() {
    try {
        const posts = await prisma.blogPost.findMany({
            select: {
                id: true,
                authorId: true,
                title: true,
                description: true,
                coverImage: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return posts
    }
    catch (e) {
        console.log(e)
        throw new Error('unable to fetch the recent posts')
    }
}


export async function RecentPost() {

    let posts
    try {
        posts = await getBlogPosts()
    }
    catch (e) {
        console.log(e)
        return <div className="flex-grow flex flex-col items-center justify-center">
            <ServerError />
        </div>
    }

    return <div className="mb-10 flex-grow">
        <div className="grid grid-cols-7 gap-x-7">

            {/* temp block to make the content center, Todo add the categories, most viewed content and remove the dev block ofter completed */}
            <div className="hidden col-span-1 lg:block"></div>
            <div className="col-span-7 lg:col-span-5 space-y-9 h-full flex flex-col justify-between">
                <RecentPostCard posts={posts} />

                <PaginationButtons />

            </div>

            {/* Todo add the categories and most view blog post  */}
            {/* <div className="hidden col-span-2 lg:block">
                <Menu />
            </div> */}

        </div>
    </div>
}