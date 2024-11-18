import { FaCheckCircle } from "react-icons/fa";

export function FormSubmissionSuccess() {
    return <div className="flex font-semibold bg-green-100
text-green-700  p-3 items-center gap-x-2 justify-center mb-3 rounded-md">
        <FaCheckCircle size={22} />
        <p>Success </p>
    </div>
}