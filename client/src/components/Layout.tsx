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
      {/* pt: 60px navbar + 32px top-bar (desktop) — mobile solo 60px */}
      <main
        key={pathname}
        className="pt-[60px] lg:pt-[92px] flex-1 page-enter"
        style={{ paddingTop: undefined }}
      >
        {children}
      </main>
      <Footer />
      <AssistantWidget />
      <CookieBanner />
    </div>
  );
}
