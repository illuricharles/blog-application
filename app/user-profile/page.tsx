import Image from "next/image";
import Link from "next/link";

function getAllUserPost() {
    return []
}

export default function UserProfile() {
    const posts = getAllUserPost()
    if (posts.length === 0) {
        return <div className="flex-grow mb-10">

            <h1>No Posts Found</h1>
        </div>
    }

    return <div className="flex-grow mb-10">
        <div>
            <div className="flex items-center gap-x-5 mb-7">
                <div className="relative">
                    <Image src={'/p1.jpeg'} alt="user-profile-image" width={1000} height={1000} className="w-20 h-20 object-cover rounded-full" />
                </div>
                <div>
                    <p className="font-semibold text-lg">Username</p>
                    <p className="font-semibold text-gray-700">username@gmail.com</p>
                </div>
            </div>
            <h1 className="text-3xl font-semibold mb-3">Posts</h1>
            <hr className="mb-5" />

            {/* user posts */}

            <div className="flex flex-col gap-y-5">

                <div className="grid grid-cols-12 gap-x-5 items-center">
                    <div className="col-span-12 md:col-span-5 lg:col-span-4 mb-2 md:mb-0">
                        <Image
                            src="/p1.jpeg"
                            alt="card image"
                            width={1000}
                            height={1000}
                            className=" rounded-sm  w-full aspect-square object-cover h-64 lg:h-52"
                        />
                    </div>

                    <div className="col-span-12 md:col-span-7 lg:col-span-8">
                        <div className="flex flex-col gap-y-1 md:gap-y-2">
                            <p className="text-gray-500 font-medium">11.02.2023 - <Link href="/" className="text-red-600 font-semibold">CULTURE</Link></p>
                            <h2>
                                <Link href="/" className="text-xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. </Link>
                            </h2>
                            <p className="text-gray-600 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sint explicabo earum debitis! Sapiente vitae, nemo consequuntur rerum asperiores voluptate </p>
                            <Link href="/" className="font-semibold border-b-2 border-b-red-500 w-fit">Read more</Link>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-12 gap-x-5 items-center">
                    <div className="col-span-12 md:col-span-5 lg:col-span-4 mb-2 md:mb-0">
                        <Image
                            src="/p1.jpeg"
                            alt="card image"
                            width={1000}
                            height={1000}
                            className=" rounded-sm  w-full aspect-square object-cover h-64 lg:h-52"
                        />
                    </div>

                    <div className="col-span-12 md:col-span-7 lg:col-span-8">
                        <div className="flex flex-col gap-y-1 md:gap-y-2">
                            <p className="text-gray-500 font-medium">11.02.2023 - <Link href="/" className="text-red-600 font-semibold">CULTURE</Link></p>
                            <h2>
                                <Link href="/" className="text-xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. </Link>
                            </h2>
                            <p className="text-gray-600 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sint explicabo earum debitis! Sapiente vitae, nemo consequuntur rerum asperiores voluptate </p>
                            <Link href="/" className="font-semibold border-b-2 border-b-red-500 w-fit">Read more</Link>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>
}