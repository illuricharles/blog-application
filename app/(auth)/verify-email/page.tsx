// import { VerifyEmailFailed } from "@/components/auth/emailVerification/VerifyEmailFailed";
import { VerifyEmailFailed } from "@/components/auth/emailVerification/VerifyEmailFailed";
import { VerifyEmailSuccess } from "@/components/auth/emailVerification/VerifyEmailSuccess";
import { getEmailVerificationByToken } from "@/data/emailVerification";
import { setEmailVerificationTrueByEmail } from "@/data/user";
import { FaExclamationTriangle } from "react-icons/fa";

// enum VerificationEmailStatus {
//     FAILED,
//     SUCCESS
// }

// interface Props {
//     status: VerificationEmailStatus
// }

interface Props {
    searchParams: Record<string, string | string[] | undefined>
}

function RenderEmailVerification({ children }: { children: React.ReactNode }) {
    return <div className="flex-grow flex justify-center items-center">
        <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-5 w-[400px] flex flex-col items-center gap-y-6">
            {children}
        </div>
    </div>
}

function RenderEmailVerificationSuccess() {
    return <RenderEmailVerification>
        <VerifyEmailSuccess />
    </RenderEmailVerification>
}

function RenderEmailVerificationFailed() {
    return <RenderEmailVerification>
        <VerifyEmailFailed />
    </RenderEmailVerification>
}

export default async function VerifyEmail({ searchParams }: Props) {

    const { token } = await searchParams
    console.log(token)
    if (!token || typeof token !== 'string') {
        return <RenderEmailVerificationFailed />
    }
    try {
        const existingToken = await getEmailVerificationByToken(token)
        if (!existingToken) {
            return <RenderEmailVerificationFailed />
        }
        const checkTokenStillExist = new Date() > existingToken.expire
        if (checkTokenStillExist) {
            return <RenderEmailVerificationFailed />
        }
        await setEmailVerificationTrueByEmail(existingToken.email)
    }
    catch (e) {
        console.log(e)
        return <RenderEmailVerification>
            <FaExclamationTriangle size={40} className="text-red-500" />
            <h1 className="font-bold text-lg text-red-600">Something went wrong</h1>
            <p className="font-semibold text-slate-700 text-center mb-3">We are trying to fix the problem. It might take few seconds</p>
        </RenderEmailVerification>
    }

    return <RenderEmailVerificationSuccess />

}