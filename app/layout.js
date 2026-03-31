import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "ChaFund – Support Creators & Developers",
  description:
    "ChaFund is a simple platform where creators and developers can receive support from their community. Turn appreciation into real funding and grow with your audience.",
  keywords: [
    "ChaFund",
    "creator funding",
    "support developers",
    "buy me a chai",
    "open source support",
    "micro donations platform",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col text-white 
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]`}
      >
        <SessionWrapper>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}