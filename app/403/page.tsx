import { ServerError } from "@/components/errors/ServerError";

export default function Forbidden() {
    const message = "403 - Forbidden"
    const description = "You are not authorized to edit this profile."
    return <div className="grow flex justify-center items-center">
        <ServerError message={message} description={description} />
    </div>
}