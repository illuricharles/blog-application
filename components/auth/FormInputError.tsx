export function FormInputError({ message }: { message: string }) {
    return <span className="text-red-500 text-sm font-semibold mt-1.5">{message}</span>
}