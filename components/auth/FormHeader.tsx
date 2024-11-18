
import { HeaderMode } from "@/utils/formModes"

interface Props {
    mode: HeaderMode
}

export function FormHeader({ mode }: Props) {
    return <>
        <h1 className="text-3xl font-bold text-center mb-4">{mode === HeaderMode.login ? "Login" : "SignUp"}</h1>
        <p className="text-center text-gray-500 text-sm font-semibold mb-5">
            {mode === HeaderMode.login ? "Welcome back" : "Create an account"}
        </p>
    </>
}