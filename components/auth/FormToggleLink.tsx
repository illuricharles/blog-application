import Link from "next/link";
import { HeaderMode } from "@/utils/formModes";

interface Props {
    mode: HeaderMode
}

export function FormToggleLink({ mode }: Props) {
    const displayText = mode === HeaderMode.login ? "Don't have an account?" : "Already have an account"
    return <div className="text-center">
        <Link href={mode === HeaderMode.login ? '/auth/register' : '/auth/login'}
            className="font-semibold text-sm text-gray-700 hover:underline">
            {displayText}
        </Link>
    </div>
}