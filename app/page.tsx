import { Category } from "@/components/Category";
import { Features } from "@/components/Features";
import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/Navbar";
import { RecentPost } from "@/components/RecentPost";

export default function Home() {
  return (
    <div className="pb-10">
      <Navbar/>
      <Features/>
      <Category/>
      <RecentPost/>
      <Footer/>
    </div>
  );
}
