
import { Outlet } from "react-router-dom"; 
import type { ReactNode } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

interface FrontendLayoutProps {
  children?: ReactNode; 
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <>
      <Navbar />
      {children ?? <Outlet />}
      <Footer />
    </>
  );
}