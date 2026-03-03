import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className="min-h-screen flex flex-col ">
        <SessionWrapper>
          <Navbar />
          <main className="flex-1 relative">
            <div
              className="text-white absolute inset-0 -z-10 
                [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
            />
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
