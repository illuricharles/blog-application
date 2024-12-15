// import { auth } from "@/auth"
import { Footer } from "@/components/footer/Footer"
import { Navbar } from "@/components/Navbar"
import { RecentPost } from "@/components/RecentPost"
import { redirect } from "next/navigation"

export default async function BlogPage({ params }: { params: Promise<{ page: string }> }) {

    const { page } = await params
    // const session = await auth()
    // if (!session) redirect('/login')

    const currentPage = parseInt(page)
    if (isNaN(currentPage) || currentPage < 1) {
        redirect('/1')
    }


    return <div className="pb-10 min-h-screen flex flex-col">
        <Navbar />
        <RecentPost page={currentPage} />
        <Footer />
    </div>
}