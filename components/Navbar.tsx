import { auth, signOut } from "@/auth";
import Link from "next/link";

export async function Navbar() {
    const session = await auth()

    return <div className="mb-5">
        <div className="flex justify-between items-center py-4 relative">
            <Link className="text-xl font-bold sm:text-2xl " href={'/'}>Medium</Link>
            <div className="text-sm space-x-3 md:space-x-6 font-semibold  md:block md:text-base lg:text-base">
                <Link href={'/'} className="hidden md:inline">Home</Link>
                <Link href={'/publish'}>Publish</Link>
                {session?.user && <Link href={`/user-profile/${session.user.id}`}>My Post</Link>}
                <Link href={'/profile'}>Profile</Link>

                {session ?
                    <form className="inline" action={async () => {
                        'use server'
                        await signOut({
                            redirectTo: '/login'
                        })
                    }}>
                        <button>
                            Logout
                        </button>
                    </form> :
                    <button ><Link href={'/login'}>Login</Link></button>
                }
            </div>
            {/* <MenuSmallScreen session={session} /> */}

        </div>
    </div>
}