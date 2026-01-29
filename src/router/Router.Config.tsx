import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Cookies from "js-cookie";



// Pages / Components
import Hero from "../components/hero";
import EducationalCards from "../components/EducationalCards";
import { FirstAddsSection, SecondAddsSection, ThirdAddsSection, FourthAddsSection } from "../components/adds";
import Report from "../components/Report";
import Blog from "../components/Blog";
import AloPaloBlog from "../components/AloPaloBlog";

import LoginPage from "../pages/auth/LoginPage";

import CompanyPage from "../pages/dashboard/company/page";

import type { JSX } from "react";
import DashboardPage from "../pages/dashboard/page";
import FrontendLayout from "../pages/layout/frontendLayout";
import DashboardLayout from "../pages/layout/dashboardLayout";
import ErrorLayout from "../pages/errors/ErrorLayout";
import AboutUsPage from "../pages/about-us/page";
import CategoryManage from "../pages/dashboard/category/page";
import AboutManage from "../pages/dashboard/about-us/page";

// --- Protected Route Wrapper ---
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};

// --- Router Configuration ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontendLayout />, 
    children: [
      {
        index: true,
        element: (
          <>
            <Hero />
            <FirstAddsSection />
            <EducationalCards />
            <SecondAddsSection />
            <Report />
            <ThirdAddsSection />
            <Blog />
            <FourthAddsSection />
            <AloPaloBlog />
          </>
        ),
      },
    ],
  },

  { 
    path: "login", 
    element: <LoginPage /> 
  },
  { 
    path: "register", 
    element: <LoginPage /> 
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "company", element: <CompanyPage /> },
      { path: "about-us", element: <AboutManage /> },
      {path: "category", element: <CategoryManage/>},

    ],
  }, 


  {path: "/about-us", element: <AboutUsPage/>},
 
  { path: "*", element: <ErrorLayout /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}