import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { SigInInErrorCodeType } from "@/utils/Auth/errors";

interface Props {
    code?: string;
    message?: string;
}

export function FormSubmissionError({ code, message }: Props) {
    if (!code && !message) return null;

    let icon = <FaExclamationTriangle size={25} />;
    let customErrorMessage = "Something went wrong.";

    if (code) {
        switch (code as SigInInErrorCodeType) {
            case "InvalidCredentials":
                customErrorMessage = "The credentials provided are incorrect. Please try again.";
                break;
            case "VerifyEmail":
                customErrorMessage =
                    "We've sent a verification email to your inbox. Please verify your email to proceed.";
                icon = <FaInfoCircle size={45} />;
                break;
            default:
                customErrorMessage = "An unexpected issue occurred. Please try again later.";
        }
    }

    return (
        <div
            className={`flex font-semibold ${code === "VerifyEmail" ? "bg-blue-200 text-blue-700" : "bg-red-200 text-red-700"
                } p-3 items-center  justify-center mb-3 rounded-md gap-x-4`}
        >
            {icon}
            <p>{message || customErrorMessage}</p>
        </div>
    );
}
