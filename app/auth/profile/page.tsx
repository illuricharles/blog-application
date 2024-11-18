import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { ProfilePhoto } from "@/components/profile/ProfilePhoto";


export default function ProfilePage() {

    return <div className="flex flex-col flex-grow divide-y-2 gap-y-3">
        <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-lg text-gray-500 font-semibold">Your Profile</p>
        </div>
        <ProfileDetails />

        <ProfilePhoto />
        <div className="mb-3"></div>

    </div>
}