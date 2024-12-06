import { auth } from "@/auth";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { redirect } from "next/navigation";


export default async function ProfilePage({ params }: { params: { id: string } }) {
    const session = await auth()
    const { id } = await params

    if (!session) {
        redirect('/login')
    }

    if (id !== session.user?.id) {
        redirect('/403')
    }

    return <div className="flex flex-col flex-grow  gap-y-3">
        <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-lg text-gray-500 font-semibold">Your Profile</p>
            <hr className="h-0.5 bg-slate-100 border-0" />
        </div>

        <ProfileDetails userId={id} />
        <div className="mb-3"></div>

    </div>
}