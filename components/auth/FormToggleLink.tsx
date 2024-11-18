import Link from "next/link";

interface Props {
    mode: 'login' | 'register'
}

export function FormToggleLink({ mode }: Props) {
    const displayText = mode === 'login' ? "Don't have an account?" : "Already have an account"
    return <div className="text-center">
        <Link href={'/auth/login'}
            className="font-semibold text-sm text-gray-700 hover:underline">
            {displayText}
        </Link>
    </div>
}