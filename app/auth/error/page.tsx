import { FaExclamationTriangle } from "react-icons/fa";


export default function Error() {
    return <div className="flex-grow flex justify-center items-center">
        <div className="w-[400px] shadow-md flex flex-col items-center text-center p-6 gap-y-4">
            <FaExclamationTriangle size={50} className="text-red-600" />
            <h1 className="text-lg font-bold text-red-600">Something went wrong</h1>
            <p className="font-semibold text-slate-600">We are trying to fix the problem. It might take few seconds</p>
        </div>
    </div>
}