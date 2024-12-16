import { prisma } from "@/prisma";
// import { Menu } from "./Menu";
import { PaginationButtons } from "./pagination/PaginationButtons";
import { RecentPostCard } from "./RecentPostCard";
import { ServerError } from "./errors/ServerError";
import { redirect } from "next/navigation";

async function getBlogPosts(page: number, postCount: number, skip: number, pageSize: number) {

    try {
        const posts = await prisma.blogPost.findMany({
            skip,
            take: pageSize,
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

async function getPostCount() {
    try {
        const count = await prisma.blogPost.count();
        return count;
    } catch (error) {
        console.error("Error fetching post count:", error);
        throw new Error("Unable to fetch the post count");
    }
}


export async function RecentPost({ page }: { page: number }) {
    const pageSize = 5;
    const skip = (page - 1) * pageSize;



    let postCount = 0;

    try {
        postCount = await getPostCount();
    } catch (error) {
        console.error(error);
        return (
            <div className="flex-grow flex flex-col items-center justify-center">
                <ServerError />
            </div>
        );
    }

    const totalPages = Math.ceil(postCount / pageSize);

    // Redirect if the requested page is out of bounds
    if (totalPages === 0) {
        return redirect('/publish')
    }


    if (page < 1 || page > totalPages) {
        redirect("/1"); // Stop further execution
    }



    let posts
    try {

        posts = await getBlogPosts(page, postCount, skip, pageSize)
    }
    catch (e) {
        console.log(e)
        return <div className="flex-grow flex flex-col items-center justify-center">
            <ServerError />
        </div>
    }

    return <div className="mb-7 flex-grow">
        <div className="grid grid-cols-7 gap-x-7">

            {/* temp block to make the content center, Todo add the categories, most viewed content and remove the dev block ofter completed */}
            <div className="hidden col-span-1 lg:block"></div>
            <div className="col-span-7 lg:col-span-5 space-y-9 h-full flex flex-col justify-between">
                <RecentPostCard posts={posts} />

                <PaginationButtons totalPages={totalPages} currentPage={page} />

            </div>

            {/* Todo add the categories and most view blog post  */}
            {/* <div className="hidden col-span-2 lg:block">
                <Menu />
            </div> */}

        </div>
    </div>
}