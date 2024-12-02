import { ServerError } from "@/components/errors/ServerError";
import { DisplayNoPosts } from "@/components/userProfile/DisplayNoPosts";
import { DisplayUserDetails } from "@/components/userProfile/DisplayUserDetails";
import { DisplayUserPosts } from "@/components/userProfile/DisplayUserPosts";
import { prisma } from "@/prisma";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

/*
    Todo
    write the component in separate folder.
    
    display user not found if the user not present in the db
    show error messages such as if db goes down something went wrong
    check fetching the blog post if db goes down show unable to display the posts please try again later or something like that
    while fetching the user details do the same 
    or show single something went wrong or error page

    add throw new Error('something went wrong while....  ')
    catch(e) {
        e instanceof Error ? e.message : "something went wrong"
    }

    display error 

*/

async function getAllUserPost(userId: string) {
    try {
        const posts = await prisma.blogPost.findMany({
            where: {
                authorId: userId
            },
            select: {
                coverImage: true,
                createdAt: true,
                title: true,
                description: true,
                id: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return posts
    } catch (e) {
        console.log(e)
        throw new Error("Something went wrong. Please refresh the page or try after sometime")
    }
}


async function fetchUserDetails(userId: string) {
    try {

        const userDetails = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true,
            }
        })
        return userDetails
    }
    catch (e) {
        console.log(e)
        throw new Error("Something went wrong. Please try after sometime.")
    }
}

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const user = (await params).id
    let posts
    let userDetails

    try {
        posts = await getAllUserPost(user)
        userDetails = await fetchUserDetails(user)
    }
    catch (e) {
        console.log(e)
        // const message = e instanceof Error? e.message : "server encounter an error and could not complete your request"
        return <div className="flex-grow mb-10 flex justify-center items-center">
            <ServerError />
        </div>

    }

    if (!userDetails) {
        return <div className="flex-grow mb-10 flex justify-center items-center">
            <div className="flex flex-col items-center gap-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 text-center">
                <FaExclamationTriangle size={40} className="text-red-600 " />
                <h1 className="text-xl text-red-600 font-bold">{`User doesn't exist`}</h1>
                <p className=" text-gray-600 font-semibold mb-5">Oops! The profile you’re looking for doesn’t exist.</p>
                <button >
                    <Link className="border px-5 py-1.5 text-white bg-blue-500" href={'/'}>Home</Link>
                </button>
            </div>

        </div>
    }

    return <div className="flex-grow mb-10">
        <div>
            {userDetails ? <DisplayUserDetails user={userDetails} /> : <div>
                <span className="block mb-5 text-xl font-semibold text-red-400">
                    {`We couldn't load your details right now. Please try again later.`}
                </span>
            </div>}

            <h1 className="text-3xl font-semibold mb-3">Posts</h1>
            <hr className="mb-5" />

            {/* user posts */}

            {posts.length !== 0 ? <DisplayUserPosts posts={posts} /> : <DisplayNoPosts />}

        </div>
    </div>
}