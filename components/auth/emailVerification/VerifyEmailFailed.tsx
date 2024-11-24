import { FaTimesCircle } from "react-icons/fa";
import { RedirectButton } from "./RedirectButton";

export function VerifyEmailFailed() {
    return <>
        <FaTimesCircle size={40} className="text-red-600 font-bold" />
        <p className="font-semibold text-gray-800 text-base text-center">Email verification Failed, Please login again to send the verification mail</p>
        <RedirectButton />
    </>
}