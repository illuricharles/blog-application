import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="pb-5 min-h-screen flex flex-col">
        <Navbar />

        {children}

        <Footer />
      </div>
    </>

  );
}
