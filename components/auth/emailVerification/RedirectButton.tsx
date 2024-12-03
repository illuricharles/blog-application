
import { redirect } from "next/navigation"

export async function RedirectButton() {

    async function handleRedirect() {
        "use server"
        redirect('/login')
    }

    return <form className="inline" action={handleRedirect}>
        <button type="submit" className="text-white bg-orange-500 border p-2 py-1.5 rounded-md">continue</button>
    </form>
}