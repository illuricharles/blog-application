import { getUserDetails } from "@/actions/editUserProfile";
import { auth } from "@/auth";
import { ServerError } from "@/components/errors/ServerError";
import { EditProfileDetails } from "@/components/profile/editProfile/EditProfileDetails";
import { EditProfileImage } from "@/components/profile/editProfile/EditProfileImage";
// import { ProfilePhoto } from "@/components/profile/ProfilePhoto";
// import { ProfileDetails } from "@/components/profile/ProfileDetails";
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

    let user, error
    try {
        user = await getUserDetails(id)
        console.log(user)
    }
    catch (e) {
        console.log(e)
        error = "Something went wrong. Please try again after sometime"
    }

    if (!user || error) {
        return <div className="flex flex-col flex-grow  gap-y-3">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <p className="text-lg text-gray-500 font-semibold">Your Profile</p>
                <hr className="h-0.5 bg-slate-100 border-0" />
            </div>
            <div className="flex justify-center items-center flex-grow ">

                <div className="flex-grow flex justify-center items-center">
                    <ServerError />
                </div>
            </div>
        </div>
    }

    const userProfileFormDetails = {
        name: user.name
    }

    const userProfileImage = {
        image: user.image
    }

    return <div className="flex flex-col flex-grow  gap-y-3">
        <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-lg text-gray-500 font-semibold">Your Profile</p>
            <hr className="h-0.5 bg-slate-100 border-0" />
        </div>
        <EditProfileDetails userId={id} userDetails={userProfileFormDetails} />

        {/* <ProfileDetails userId={id} /> */}
        <EditProfileImage userProfileImage={userProfileImage} userId={id} />
        <div className="mb-3"></div>

    </div>
}