import Image from "next/image";

export default function UserProfile() {
    return <div className="flex flex-grow mb-10">
        <div>
            <div className="flex items-center gap-x-5 mb-7">
                <div className="relative">
                    <Image src={'/p1.jpeg'} alt="user-profile-image" width={1000} height={1000} className="w-20 h-20 object-cover rounded-full" />
                </div>
                <div>
                    <p className="font-semibold text-lg">Username</p>
                    <p className="font-semibold text-gray-700">username@gmail.com</p>
                </div>
            </div>
            <h1 className="text-3xl font-semibold mb-6">Posts</h1>
            <div className="space-y-4">
                <div className=" cursor-pointer py-3 px-2 border border-gray-400 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">My most read medium stores in 2021</h2>
                    <p className="text-base font-semibold text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo temporibus asperiores ea velit
                        minus quod dolorum voluptate, nostrum nam obcaecati? Totam dolorum molestias harum animi
                        dolore eius mollitia consequatur modi!
                    </p>
                </div>

                <div className="py-3 px-2 border border-gray-400 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">My most read medium stores in 2021</h2>
                    <p className="text-base font-semibold text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo temporibus asperiores ea velit
                        minus quod dolorum voluptate, nostrum nam obcaecati? Totam dolorum molestias harum animi
                        dolore eius mollitia consequatur modi!
                    </p>
                </div>

                <div className="py-3 px-2 border border-gray-400 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">My most read medium stores in 2021</h2>
                    <p className="text-base font-semibold text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo temporibus asperiores ea velit
                        minus quod dolorum voluptate, nostrum nam obcaecati? Totam dolorum molestias harum animi
                        dolore eius mollitia consequatur modi!
                    </p>
                </div>
            </div>
        </div>
    </div>
}