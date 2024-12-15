import { auth } from "@/auth";
// import { Category } from "@/components/Category";
// import { Features } from "@/components/Features";
// import { Footer } from "@/components/footer/Footer";
// import { Navbar } from "@/components/Navbar";
// import { RecentPost } from "@/components/RecentPost";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }
  else {
    redirect('/1')
  }


  // return (
  //   <div className="pb-10 min-h-screen flex flex-col">
  //     <Navbar />


  //     {/* <Features />
  //       <Category /> */}
  //     <RecentPost />

  //     <Footer />
  //   </div>
  // );
}
