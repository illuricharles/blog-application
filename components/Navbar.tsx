import { MenuSmallScreen } from "./MenuSmallScreen";
import Link from "next/link";

export function Navbar() {
    return <div className="mb-5">
        <div className="flex justify-between  py-4 relative">
            <Link className="text-xl font-bold sm:text-2xl " href={'/'}>Medium</Link>
            <div className="space-x-6 font-semibold hidden md:block text-md">
                <Link href={'/'}>Homepage</Link>
                <Link href={'/'}>Contact</Link>
                <Link href={'/'}>About</Link>
                <Link href={'/'}>Login</Link>
            </div>
            <MenuSmallScreen/>

        </div>
    </div>
}