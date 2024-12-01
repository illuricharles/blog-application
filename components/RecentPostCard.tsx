import Image from "next/image";
import Link from "next/link";

interface UserPostTypes {
    id: string,
    name: string | null
}

interface PostsTypes {
    id: string,
    authorId: string,
    title: string,
    description: string,
    coverImage: string,
    createdAt: Date,
    user: UserPostTypes
}

export function RecentPostCard({ posts }: { posts: PostsTypes[] }) {
    console.log(posts)
    if (posts.length === 0) {
        return <div className="flex justify-center items-center m-auto">
            <h2 className=" text-3xl font-semibold">No posts Found</h2>
        </div>
    }

    return <div className="">
        {
            posts.map(eachPost => {
                const { id, title, description, coverImage } = eachPost
                return <div key={id} className="grid grid-cols-12 gap-x-7 mb-6   items-center justify-center">
                    <div className="col-span-12 mb-3 sm:mb-0 sm:col-span-6 ">
                        <Image
                            src={coverImage}
                            alt="card image"
                            width={1000}
                            height={1000}
                            className=" h-60 rounded-sm w-full aspect-square"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <div className="gap-3 flex flex-col sm:gap-4">
                            <div className="flex items-center gap-x-2">
                                <p className="text-gray-500 font-semibold">published-</p>
                                <span className="text-green-800 font-semibold text-lg hover:underline">
                                    <Link href={'/user-profile'}>{eachPost.user.name}</Link>
                                </span>
                            </div>
                            <h2>
                                <Link href="/" className="text-xl font-bold">{title}</Link>
                            </h2>
                            <p className="text-gray-600 font-semibold">
                                {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                            </p>
                            <Link href={`/blog/${id}`} className="font-semibold border-b-2 border-b-red-500 w-fit">Read more</Link>
                        </div>
                    </div>
                </div>
            })
        }
        {/* <div className="grid grid-cols-12 gap-x-7  items-center justify-center">
            <div className="col-span-12 mb-3 sm:mb-0 sm:col-span-6 ">
                <Image
                    src="/p1.jpeg"
                    alt="card image"
                    width={1000}
                    height={1000}
                    className=" h-60 sm:h-72  rounded-sm w-full"
                />
            </div>

            <div className="col-span-12 sm:col-span-6">
                <div className="gap-3 flex flex-col sm:gap-4">
                    <p className="text-gray-500 font-medium">11.02.2023 - <Link href="/" className="text-red-600 font-semibold">CULTURE</Link></p>
                    <h2>
                        <Link href="/" className="text-xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. </Link>
                    </h2>
                    <p className="text-gray-600 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sint explicabo earum debitis! Sapiente vitae, nemo consequuntur rerum asperiores voluptate </p>
                    <Link href="/" className="font-semibold border-b-2 border-b-red-500 w-fit">Read more</Link>
                </div>
            </div>
        </div> */}
    </div>
}