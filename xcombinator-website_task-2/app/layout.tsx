import type { Metadata } from "next";
import { MuseoModerno } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museo-moderno",
  display: "swap",
});

export const metadata: Metadata = {
  title: "xCombinator - Launch on Solana",
  description: "Currently, helping people launch on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans bg-black text-white antialiased ${museoModerno.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}