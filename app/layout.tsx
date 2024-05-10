import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import MusicBar from "@/components/MusicBar/MusicBar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PluggedIn Music",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body
        className={`
          grid grid-cols-25/75
          bg-pi-offwhite-main text-black justify-even
          max-w-[100vw]
          ${inter.className}
          overflow-hidden
        `}
      >
        <Sidebar />
        <main className="min-h-screen flex flex-col">{children}</main>
        <MusicBar />
      </body>
    </html>
  );
}
