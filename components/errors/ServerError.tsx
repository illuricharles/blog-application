import { FaExclamationTriangle } from "react-icons/fa";

export function ServerError() {
    return <div className="w-[350px] md:w-[400px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col items-center text-center p-6 gap-y-2 m-10">
        <div className="flex flex-col justify-center items-center gap-y-1">
            <FaExclamationTriangle size={45} className="text-red-600" />
            <h1 className="text-lg font-bold text-red-600">Internal Server Error</h1>
        </div>
        <p className="font-semibold text-slate-600">Something went wrong. Please refresh the page or try again later.</p>
    </div>
}