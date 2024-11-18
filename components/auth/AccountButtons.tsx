import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const size = 22

const buttons = [
    {
        id: 'google',
        icons: <FcGoogle size={size} />
    },
    {
        id: 'github',
        icons: <FaGithub size={size} />
    }
]

export function AccountButtons() {
    return <div className="flex gap-x-3">
        {
            buttons.map(eachButton => {
                return (
                    <div key={eachButton.id} className="flex-1 mb-3">
                        <button className="w-full p-2 border border-gray-500  rounded-md hover:bg-gray-50">
                            <div className="flex justify-center items-center">
                                {eachButton.icons}
                            </div>
                        </button>
                    </div>
                )
            })
        }


    </div>
}