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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-col">
        <div
          className={`
          ${inter.className}
          grid 2xl:grid-cols-[1fr,3fr,1fr] lg:grid-cols-[1fr,4fr] grid-cols-1
          bg-pi-offwhite-main text-black
          max-w-100vw min-h-[100vh]
          overflow-hidden
        `}
        >
          <Sidebar />
          <main className="flex flex-col p-4 min-w-100vw">{children}</main>
          <LeaderSidebar />
        </div>
        <MusicBar />
        <BottomBar />
        <ModalProvider />
        <Toaster />
      </body>
    </html>
  );
}
