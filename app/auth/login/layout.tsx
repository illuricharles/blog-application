import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <div className="p-3 min-h-screen flex flex-col">
                <header>
                    <Navbar/>
                </header>
                <main className="flex-grow flex justify-center items-center">
                    {children}
                </main>
                <footer>
                    <Footer/>
                </footer>
            </div>
        </>
         
    );
  }
  