import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AssistantWidget from "./AssistantWidget";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-[#060606] text-[#F0EADB] flex flex-col">
      <Navbar />
      <main key={pathname} className="pt-16 flex-1 page-enter">
        {children}
      </main>
      <Footer />
      <AssistantWidget />
    </div>
  );
}
