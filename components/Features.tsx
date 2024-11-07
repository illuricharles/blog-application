import Image from "next/image";

export function Features() {
    return <div className="mb-10">
        <h1 className="mb-4 text-3xl md:text-4xl text-center md:mb-10 font-normal xl:text-5xl"><span className="font-semibold">Hi Dev here</span> discover my stories and creative ideas</h1>
        <div className="grid grid-cols-12 gap-5 items-center ">
            <div className="hidden md:block col-span-6 lg:col-span-5 xl:col-span-5">
                <Image
                    alt="feature-image"
                    src = "/p1.jpeg"
                    width={400}
                    height={400}
                    className="w-full  rounded-xl lg:h-96"
                />
            </div>
            <div className="col-span-12 md:col-span-6 p-3 lg:col-span-7 xl:col-span-7 xl:px-5">
                <h2 className="mb-3 text-xl md:text-2xl md:mb-6 font-medium ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa atque dolore nesciunt. </h2>
                <p className=" mb-6 md:text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi doloribus dolorem necessitatibus fuga, eos cum nam reiciendis. Nihil voluptatibus minima ullam ab, nesciunt expedita natus amet voluptatum quis accusantium! Provident.</p>
                <div className="text-center lg:text-left">
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-md ">Read More</button>
                </div>
            </div>
        </div>
    </div>
}