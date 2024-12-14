import Link from "next/link";

export function Footer() {
    return <div className=" md:flex md:gap-10 lg:gap-28 lg:w-11/12 ">
        <div className="mb-8 md:mb-0">
            <Link href="/">
                <span className="text-2xl font-semibold mb-3 block">Blog App</span>
            </Link>
            <p className=" text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque quasi sapiente non, soluta vitae ipsum id fugiat vel. Quis accusamus error dicta necessitatibus sed voluptates consequatur nostrum fugit voluptatibus? Est.</p>
        </div>

        <div className=" justify-around flex md:gap-8 lg:gap-20 md:justify-start">
            <div>
                <p className=" mb-1 font-semibold">Links</p>
                <ul className="flex flex-col gap-1">
                    <Link href="/">Home</Link>
                    <Link href="/profile">Profile</Link>
                    <Link href="/publish">Publish</Link>
                </ul>
            </div>

            {/* <div>
                <p className="mb-1 font-medium">Tags</p>
                <ul className="flex flex-col gap-1">
                    <Link href="/">Style</Link>
                    <Link href="/">fashion</Link>
                    <Link href="/">coding</Link>
                    <Link href="/">travel</Link>
                </ul>
            </div> */}

            <div>
                <p className="mb-1 font-semibold">Social</p>
                <ul className="flex flex-col gap-1 ">
                    <Link href="/">Facebook</Link>
                    <Link href="/">Instagram</Link>
                    <Link href="/">Tiktok</Link>
                    <Link href="/">Youtube</Link>
                </ul>
            </div>
        </div>
    </div>
}