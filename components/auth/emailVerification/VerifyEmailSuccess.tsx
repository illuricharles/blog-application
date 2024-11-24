import { CiCircleCheck } from "react-icons/ci";
import { RedirectButton } from "./RedirectButton";

export function VerifyEmailSuccess() {
    return <>
        <CiCircleCheck size={50} className="text-green-600 font-bold" />
        <p className="font-semibold text-gray-800 text-base">Email verification successful</p>
        <RedirectButton />
    </>
}