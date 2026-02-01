import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
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
import AdManage from "../pages/dashboard/ads/page";
import LandingPage from "../components/landing/page";
import ContactSection from "../pages/contact/page";
import ContactManage from "../pages/dashboard/contact/page";
import SubscriberManage from "../pages/dashboard/subscribe/page";
import BlogManage from "../pages/dashboard/blog/page";

import BlogDetailPage from "../pages/blog/blogDetailPage";
import BlogListPage from "../pages/blog/blogListPage";
import CategoryPage from "../pages/category/page";

import MankaKura from "../pages/maka-kura-list/page";
import AllBlogs from "../pages/all-news/page";
import SearchPage from "../pages/search/SearchPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Users from "../pages/dashboard/user/page";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPassword from "../pages/auth/ResetPasswordPage";

// import AllCategoriesPage from "../pages/category/AllCategoriesPage";

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
        element: <LandingPage />,
      },
    ],
  },

  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },

  { path: "reset-password/:uidb64/:token",
    element: <ResetPassword /> },

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
      { path: "category", element: <CategoryManage /> },
      { path: "blog", element: <BlogManage /> },
      { path: "ads", element: <AdManage /> },
      { path: "contact", element: <ContactManage /> },
      { path: "subscribe", element: <SubscriberManage /> },
      { path: "user", element: <Users /> },
    ],
  },

  { path: "/category/:slug", element: <CategoryPage /> },
  { path: "/about-us", element: <AboutUsPage /> },
  { path: "/contact", element: <ContactSection /> },
  { path: "/category-list/:id", element: <BlogListPage /> },
  { path: "/blog/:slug", element: <BlogDetailPage /> },
  // { path: "/all-categories", element: <AllCategoriesPage /> },
  { path: "/all-news", element: <AllBlogs /> },
  { path: "/manka-kura-list", element: <MankaKura /> },
  { path: "/search", element: <SearchPage /> },

  { path: "*", element: <ErrorLayout /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
