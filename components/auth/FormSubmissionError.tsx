import { FaExclamationTriangle } from "react-icons/fa";

export function FormSubmissionError() {
    return <div className="flex  font-semibold bg-red-200 text-red-700
     p-3 items-center gap-x-2 justify-center mb-3 rounded-md">
        <FaExclamationTriangle size={22} />
        <p>Something went wrong </p>
    </div>
}