// import { auth } from "@/auth"
import { auth } from "@/auth"
import { Footer } from "@/components/footer/Footer"
import { Navbar } from "@/components/Navbar"
import { RecentPost } from "@/components/RecentPost"
import { notFound, redirect } from "next/navigation"

export default async function BlogPage({ params }: { params: Promise<{ page: string }> }) {

    const { page } = await params
    const session = await auth()
    if (!session) return redirect('/login')


    const currentPage = parseInt(page)
    if (isNaN(currentPage) || currentPage < 1) {
        return notFound()
    }


    return <div className="pb-10 min-h-screen flex flex-col">
        <Navbar />
        <RecentPost page={currentPage} />
        <Footer />
    </div>
}