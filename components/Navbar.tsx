import { auth, signOut } from "@/auth";
import Link from "next/link";

export async function Navbar() {
    const session = await auth()

    return <div className="mb-5">
        <div className="flex justify-between items-center py-4 relative">
            <Link className="text-xl font-bold sm:text-2xl " href={'/'}>Medium</Link>
            <div className="text-sm space-x-3 md:space-x-6 font-semibold  md:block md:text-md lg:text-lg">
                <Link href={'/'} className="hidden md:inline">Homepage</Link>

                <Link href={'/contact'}>Contact</Link>
                <Link href={'/'}>About</Link>

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
                    <button >Login</button>
                }
            </div>
            {/* <MenuSmallScreen session={session} /> */}

        </div>
    </div>
}