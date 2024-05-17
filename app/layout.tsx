import "./globals.css";

import BottomBar from "@/components/BottomBar";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import MusicBar from "@/components/MusicBar/MusicBar";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import LeaderSidebar from "@/components/Leaderboard/LeaderSidebar";

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
          grid grid-cols-[1fr,3fr,1fr]
          bg-pi-offwhite-main text-black justify-even
          max-w-[100vw]
          ${inter.className}
          overflow-hidden
        `}
      >
        <Sidebar />
        <main className="min-h-screen flex flex-col">{children}</main>
        <LeaderSidebar />
        <ModalProvider />
        <MusicBar />
        <BottomBar />
      </body>
    </html>
  );
}
