import "./globals.css";

import BottomBar from "@/components/BottomBar";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import MusicBar from "@/components/MusicBar/MusicBar";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import LeaderSidebar from "@/components/Leaderboard/LeaderSidebar";
import { Toaster } from "sonner";
import PageHeader from "@/components/PageHeader";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PluggedIn Music",
  description:
    "A music platform supporting new artists connecting with their audience",
  icons: {
    icon: "/plug.png",
  },
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
          grid grid-cols-1 lg:grid-cols-[minmax(200px,320px),1fr,minmax(200px,320px)]
          bg-pi-offwhite-main text-black
          h-full
        `}
        >
          <Sidebar className="fixed top-0 left-0 h-screen w-[200px] lg:w-[320px] hidden lg:block overflow-hidden" />
          <main
            className={`flex flex-col col-span-1 lg:col-start-2 lg:col-end-3 overflow-y-auto h-full lg:max-w-[calc(100vw-640px)] flex-grow mb-36`}
          >
            <div className="mb-28">
              <PageHeader />
              {children}
            </div>
          </main>
          <LeaderSidebar className="fixed top-0 right-0 h-screen w-[200px] lg:w-[320px] hidden lg:block overflow-y-auto" />
        </div>
        <MusicBar />
        <BottomBar />
        <ModalProvider />
        <Toaster richColors />
      </body>
    </html>
  );
}
``;
