import "./globals.css";

import BottomBar from "@/components/BottomBar";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import MusicBar from "@/components/MusicBar/MusicBar";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import LeaderSidebar from "@/components/Leaderboard/LeaderSidebar";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PluggedIn Music",
  description:
    "A music platform supporting new artists connecting with their audience",
};

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-col h-screen">
        <div
          className={`
          ${inter.className}
          grid lg:grid-cols-[minmax(200px,320px),1fr,minmax(200px,320px)]
          grid-cols-1
          gap-4
          bg-pi-offwhite-main text-black
          h-[100vh]
        `}
        >
          <Sidebar className="fixed top-0 left-0 h-full lg:col-span-1" />
          <main className="flex flex-col p-4 col-span-3 lg:col-span-1 lg:min-w-0 overflow-y-auto">
            {children}
          </main>
          <LeaderSidebar className="hidden lg:block lg:col-span-1 h-full overflow-y-auto" />
        </div>
        <MusicBar />
        <BottomBar />
        <ModalProvider />
        <Toaster richColors />
      </body>
    </html>
  );
}
