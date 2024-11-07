import Link from "next/link";

export function PopularPost() {
    return <div>
        <div>
            <span className="bg-red-400 text-white px-2 py-1 rounded-full block w-fit text-sm font-semibold">Travel</span>
            <Link href={'/'}>
                <p className="font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Link>
            <div>
                <Link href='/'>
                    <span className="font-medium text-sm">Jhon Deo - </span>
                </Link>
                <span className="text-gray-500 font-medium text-sm">10.10.2023</span>
            </div>
        </div>
    </div>
}