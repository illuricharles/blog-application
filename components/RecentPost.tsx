import { prisma } from "@/prisma";
import { Menu } from "./Menu";
import { PaginationButtons } from "./pagination/PaginationButtons";
import { RecentPostCard } from "./RecentPostCard";



export async function RecentPost() {
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
    return <div className="mb-10">
        <div className="grid grid-cols-7 gap-x-7">
            <div className="col-span-7 lg:col-span-5 space-y-9 h-full flex flex-col justify-between">
                <RecentPostCard posts={posts} />

                <PaginationButtons />

            </div>

            <div className="hidden col-span-2 lg:block">
                <Menu />
            </div>

        </div>
    </div>
}