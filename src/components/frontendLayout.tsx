import Navbar from "./navbar";
import Footer from "./footer";
import type { ReactNode } from "react";

interface FrontendLayoutProps{
    children: ReactNode;
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}