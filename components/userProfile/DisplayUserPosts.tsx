import Image from "next/image"
import Link from "next/link"

interface PostsDisplayTypes {
    coverImage: string,
    createdAt: Date,
    title: string,
    description: string,
    id: string
}

export function DisplayUserPosts({ posts }: { posts: PostsDisplayTypes[] }) {


    return <div className="flex flex-col gap-y-5">

        {posts.map(eachPost => {
            return <div key={eachPost.id} className="grid grid-cols-12 gap-x-5 items-center">
                <div className="col-span-12 md:col-span-5 lg:col-span-4 mb-2 md:mb-0">

                    <Image
                        src={eachPost.coverImage}
                        alt="card image"
                        width={600}
                        height={600}
                        className=" rounded-sm  w-full aspect-square h-64 lg:h-52"
                        priority
                    />
                </div>

                <div className="col-span-12 md:col-span-7 lg:col-span-8">
                    <div className="flex flex-col gap-y-1 md:gap-y-2">
                        <p className="text-gray-600 font-semibold text-base">
                            published - <span className="text-gray-500 font-semibold text-base">{`${eachPost.createdAt.getDate()}.${eachPost.createdAt.getMonth()}.${eachPost.createdAt.getFullYear()}`}</span>
                        </p>
                        <h2>
                            <Link href={`/blog/${eachPost.id}`} className="text-xl font-semibold">{eachPost.title}</Link>
                        </h2>
                        <p className="text-gray-600 font-semibold">{eachPost.description}</p>
                        <Link href={`/blog/${eachPost.id}`} className="font-semibold border-b-2 border-b-red-500 w-fit">Read more</Link>
                    </div>
                </div>
            </div>
        })}



    </div>
}