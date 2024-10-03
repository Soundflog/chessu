import "@/styles/globals.css";

import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AuthModal from "@/components/auth/AuthModal";

import ContextProvider from "@/context/ContextProvider";
import { BASE_URL, OPENGRAPH_SETTINGS, ROBOTS_SETTINGS } from "@/config";

export const metadata = {
  title: "chessu",
  description: "Play Chess online.",
  openGraph: OPENGRAPH_SETTINGS,
  robots: ROBOTS_SETTINGS,
  icons: {
    icon: [
      { type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" }
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" }
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(process.env.VERCEL ? BASE_URL : "http://localhost:3000")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        <ContextProvider>
          <Header />

          <main className="mx-1 flex min-h-[70vh] justify-center md:mx-16 lg:mx-40">
            {children}
          </main>

          <AuthModal />
        </ContextProvider>

        <Footer />

        {/* next/script issue: https://github.com/vercel/next.js/issues/43402 */}
        <script
          id="load-theme"
          dangerouslySetInnerHTML={{
            __html: `if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
              document.documentElement.setAttribute("data-theme", "chessuDark");
          } else {
              document.documentElement.setAttribute("data-theme", "chessuLight");
          }`
          }}
        ></script>
      </body>
    </html>
  );
}
