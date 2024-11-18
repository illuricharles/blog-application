import { FaCheckCircle } from "react-icons/fa";

export function FormSubmissionSuccess() {
    return <div className="flex font-semibold bg-red-200 text-red-700 p-3 items-center gap-x-2 justify-center mb-3 rounded-md">
        <FaCheckCircle size={22} />
        <p>Success </p>
    </div>
}