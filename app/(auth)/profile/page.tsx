import { auth } from "@/auth";
import { ServerError } from "@/components/errors/ServerError";
import { prisma } from "@/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }
    let user

    try {
        user = await prisma.user.findUnique({
            where: {
                id: session.user?.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        })
        if (!user) {
            throw new Error("User not Exist")
        }

    }

    catch (e) {
        console.log(e)
        const message = "Internal Server Error"
        const description = "Something went wrong. Please refresh the page or try again later."
        return <div className="flex flex-col flex-grow divide-y-2 gap-y-1">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <p className="text-lg text-gray-500 font-semibold">Your Profile</p>

            </div>
            <div className="flex-grow flex justify-center items-center">
                <ServerError message={message} description={description} />
            </div>

        </div>
    }

    return <div>
        <div className="flex flex-col flex-grow divide-y-2 gap-y-1">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <p className="text-lg text-gray-500 font-semibold">Your Profile</p>
            </div>
            <div className="flex flex-col gap-y-3 py-3 ">
                <h1 className="text-xl font-semibold">Basic Info</h1>
                <p className="text-base text-gray-500 font-semibold">Your basic info details</p>
                <p className="text-base text-gray-600 font-semibold">Full Name</p>
                <p className="py-1.5 border-2 px-3 text-gray-600 w-2/6 rounded-md font-semibold"  >{user.name}</p>
                <p className="text-base text-gray-600 font-semibold">Email</p>
                <p id="email" className="py-1.5 border-2 px-3 text-gray-600 w-2/6 rounded-md font-semibold" >{user.email}</p>
                {/* <label htmlFor="number" className="text-base text-gray-600 font-semibold">Phone number</label>
        <p className="py-1.5 border-2 px-3 text-gray-500 w-2/6 rounded-md">9999999999</p> */}
            </div>

            <div className="flex flex-col gap-y-2 py-3 ">
                <div className="mb-3 space-y-2">
                    <h1 className="text-2xl font-semibold">Profile picture</h1>
                    <p className="text-lg text-gray-500 font-semibold">Your profile picture</p>
                </div>
                <div className="flex items-center gap-x-5 ">
                    <div className="relative  ">
                        <Image src={user.image ? user.image : "/p1.jpeg"} alt="profile-image" width={1000} height={1000} className="w-24 h-24 rounded-full object-cover" />
                    </div>
                    {/* <div>
                        <p className="font-semibold text-lg text-slate-700">No profile picture</p>
                    </div> */}
                </div>
            </div>

            <div className="mb-3"></div>
        </div>


        <form className="mt-2 mb-7 flex justify-center" action={async () => {
            "use server"
            redirect(`/edit-profile/${session.user?.id}`)
        }}>

            <button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-sm mt-0.5 ml-1.5">Edit</button>
        </form>

    </div>
}