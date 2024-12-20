import Link from "next/link"
import { MenuSmallScreen } from "../MenuSmallScreen"
import { auth } from "@/auth"

export async function PublishNavBar() {
    const session = await auth()
    return <div className="mb-5">
        <div className="flex justify-between  py-4 relative items-center">
            <Link className="text-xl font-bold sm:text-2xl " href={'/'}>Medium</Link>

            <div className=" font-semibold space-x-6 hidden  md:flex  text-md items-center">

                <div className="space-x-6 ">
                    <Link href={'/'}>Homepage</Link>
                    <Link href={'/'}>Contact</Link>
                    <Link href={'/'}>About</Link>
                    <Link href={'/'}>Login</Link>
                </div>
            </div>
            <div className="flex items-center space-x-8 md:hidden">
                <MenuSmallScreen session={session} />
            </div>
        </div>
    </div>
}

// function PublishButton() {
//     return <button className="font-semibold text-md border text-white bg-green-600 px-2.5 py-1 rounded-full">publish</button>
// }