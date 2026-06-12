import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AssistantWidget from "./AssistantWidget";
import CookieBanner from "./CookieBanner";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#141414] flex flex-col">
      <Navbar />
      {/* pt-16 = navbar height. On iOS with black-translucent status bar, add env safe area top */}
      <main
        key={pathname}
        className="pt-16 flex-1 page-enter"
        style={{ paddingTop: "calc(4rem + env(safe-area-inset-top, 0px))" }}
      >
        {children}
      </main>
      <Footer />
      <AssistantWidget />
      <CookieBanner />
    </div>
  );
}
