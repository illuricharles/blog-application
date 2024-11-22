
import { auth } from "@/auth"
import { AccountButtons } from "@/components/auth/AccountButtons"
import { FormHeader } from "@/components/auth/FormHeader"
import { FormToggleLink } from "@/components/auth/FormToggleLink"
import { LoginForm } from "@/components/auth/LoginForm"
import { HeaderMode } from "@/utils/formModes"
import { redirect } from "next/navigation"

export default async function Login() {
    const session = await auth()
    if (session) return redirect('/')

    return <div className="flex-grow flex justify-center items-center mb-8">
        <div className=" border shadow-md rounded p-5 sm:w-96 w-80">
            <FormHeader mode={HeaderMode.login} />
            <LoginForm />
            <AccountButtons />
            <FormToggleLink mode={HeaderMode.login} />
        </div>
    </div>
}