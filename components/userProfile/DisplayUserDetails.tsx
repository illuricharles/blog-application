import Image from "next/image"

export function DisplayUserDetails({ user }: {
    user: {
        name: string | null,
        email: string | null,
        image: string | null;
    }
}) {
    return <div className="flex items-center gap-x-3 mb-7">
        <div className="relative">
            <Image src={user.image ? user.image : '/p1.jpeg'} alt="user-profile-image" width={1000} height={1000} className="w-16 h-16 md:w-16 md:h-16 object-cover rounded-full " />
        </div>
        <div className="-space-y-1">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="font-semibold text-gray-700">{user.email}</p>
        </div>
    </div>
}