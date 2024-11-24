// import { VerifyEmailFailed } from "@/components/auth/emailVerification/VerifyEmailFailed";
import { VerifyEmailSuccess } from "@/components/auth/emailVerification/VerifyEmailSuccess";

// enum VerificationEmailStatus {
//     FAILED,
//     SUCCESS
// }

// interface Props {
//     status: VerificationEmailStatus
// }

export default function VerifyEmail() {

    return <div className="flex-grow flex justify-center items-center">
        <div className="shadow-md p-4 w-[400px] flex flex-col items-center gap-y-6">
            <VerifyEmailSuccess />

        </div>
    </div>
}