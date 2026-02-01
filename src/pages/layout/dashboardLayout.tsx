"use client";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { companyService } from "../../services/companyServices";

import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Building2,
  Newspaper,
  Star,
  Info,
  Settings,
  type LucideIcon,
  Tag,
  MessageCircle,
  PhoneCall,
  User,
  LockKeyhole,
} from "lucide-react";

import ToastProvider from "../../components/toastProvider";
import ChangePasswordModal from "../auth/ChangePassword";

interface SubMenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}
interface MenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
}
interface NavItemProps {
  item: MenuItem;
  sidebarOpen: boolean;
  onItemClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  sidebarOpen,
  onItemClick,
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const hasSubmenu = !!(item.submenu && item.submenu.length > 0);
  const isActive = pathname === item.href;
  const isSubActive =
    hasSubmenu && item.submenu?.some((sub) => pathname === sub.href);
  const [isOpen, setIsOpen] = useState(!!isSubActive);

  useEffect(() => {
    if (isSubActive) setIsOpen(true);
  }, [isSubActive]);

  return (
    <div className="w-full">
      <Link
        to={hasSubmenu ? "#" : item.href || "#"}
        onClick={() => {
          if (hasSubmenu) {
            setIsOpen(!isOpen);
          } else if (onItemClick) {
            onItemClick();
          }
        }}
        className={`flex items-center justify-between px-3 py-2 rounded-md transition-all ${
          isActive && !hasSubmenu
            ? "bg-[#1e695e]/10 text-[#1e695e]"
            : isSubActive
              ? "text-[#1e695e] bg-gray-100"
              : "text-gray-600 hover:bg-gray-50 hover:text-[#1e695e] group"
        }`}
      >
        <div className="flex items-center gap-2">
          <item.icon
            size={16}
            className={`${isActive || isSubActive ? "text-[#1e695e]" : "text-gray-400 group-hover:text-[#1e695e]"} transition-colors`}
          />
          {sidebarOpen && (
            <span
              className={`text-[10px] font-bold uppercase tracking-wide ${isActive || isSubActive ? "text-[#1e695e]" : ""}`}
            >
              {item.label}
            </span>
          )}
        </div>
        {sidebarOpen && hasSubmenu && (
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isActive || isSubActive ? "text-[#1e695e]" : "text-gray-400"} ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </Link>
      {sidebarOpen && hasSubmenu && isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2">
          {item.submenu?.map((sub) => {
            const isChildActive = pathname === sub.href;
            return (
              <Link
                key={sub.label}
                to={sub.href}
                onClick={onItemClick}
                className={`flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-md ${isChildActive ? "bg-[#1e695e]/10 text-[#1e695e]" : "text-gray-500 hover:text-[#1e695e]"}`}
              >
                <sub.icon
                  size={14}
                  className={isChildActive ? "text-[#1e695e]" : "text-gray-400"}
                />
                {sub.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [company, setCompany] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isCPModalOpen, setIsCPModalOpen] = useState(false);

  const isSuperuser = Cookies.get("is_superuser") === "true";
  const isStaff = Cookies.get("is_staff") === "true";
  const userName = Cookies.get("userName") || "Admin";

  useLayoutEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) navigate("/login");
    else setIsAuthLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (!isAuthLoading) {
      const fetchCompany = async () => {
        try {
          const data = await companyService.getDetails();
          if (data && data.length > 0) setCompany(data[0]);
        } catch (err) {
          console.error("Layout Fetch Error:", err);
        }
      };
      fetchCompany();
    }
  }, [isAuthLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("is_superuser");
    Cookies.remove("is_staff");
    Cookies.remove("userName");
    window.location.href = "/login";
  };

  const fullMenu: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Building2, label: "Company", href: "/dashboard/company" },
    { icon: Info, label: "About", href: "/dashboard/about-us" },
    { icon: Tag, label: "Category", href: "/dashboard/category" },
    { icon: Newspaper, label: "Blog", href: "/dashboard/blog" },
    { icon: Star, label: "Ads", href: "/dashboard/ads" },
    { icon: User, label: "User", href: "/dashboard/user" },
    {
      icon: MessageCircle,
      label: "Communication",
      submenu: [
        { icon: PhoneCall, label: "Contact", href: "/dashboard/contact" },
        { icon: Bell, label: "Subscribe", href: "/dashboard/subscribe" },
      ],
    },
  ];

  const filteredMenu = useMemo(() => {
    console.log("Current Status:", { isSuperuser, isStaff }); // डिबगको लागि

    if (isSuperuser) return fullMenu;

    if (isStaff) {
      const allowed = ["Dashboard", "Blog", "Ads", "Communication"];
      return fullMenu.filter((item) => allowed.includes(item.label));
    }

    return fullMenu.filter((item) => item.label === "Dashboard");
  }, [isSuperuser, isStaff]);

  if (isAuthLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#1e695e]" />
      </div>
    );
  }

  const handleItemClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] text-gray-800 font-sans overflow-hidden">
      <ToastProvider />
      <ChangePasswordModal
        isOpen={isCPModalOpen}
        onClose={() => setIsCPModalOpen(false)}
      />

      <aside
        className={`${sidebarOpen ? "w-45" : "w-14"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-50 shadow-sm`}
      >
        <div className="p-1 flex flex-col items-center justify-center border-b border-gray-100">
          <Link to={"/"}>
            <div className="flex items-center justify-center overflow-hidden shrink-0">
              {company?.logo ? (
                <img
                  src={company.logo}
                  alt="Logo"
                  className={`${sidebarOpen ? "h-12" : "h-8"} w-auto object-contain transition-all duration-300`}
                />
              ) : (
                <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                  <span className="text-[#1e695e] font-black text-[10px]">
                    L
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {filteredMenu.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              sidebarOpen={sidebarOpen}
              onItemClick={handleItemClick}
            />
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-2 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md bg-gray-50 text-gray-500 hover:text-[#1e695e] hover:bg-[#1e695e]/10 transition-all border border-gray-100"
            >
              <Menu size={20} />
            </button>
            <div className="text-center animate-in fade-in duration-500">
              <p className="font-extrabold uppercase text-[10px] text-gray-800 truncate tracking-tight px-2">
                {company?.name}
              </p>
              <p className="text-[#1e695e]  font-bold text-[7px] uppercase tracking-widest pr-2">
                {isSuperuser ? "Super Access" : "Staff Access"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 lg:gap-4">
            <Link
              to="/dashboard/contact"
              className="p-2 rounded-full text-gray-400 hover:text-[#1e695e] hover:bg-gray-100 transition-all"
            >
              <Bell size={20} />
            </Link>
            <div className="h-8 w-[1px] bg-gray-200 mx-2" />
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full cursor-pointer hover:bg-gray-50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-[#1e695e] flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {userName[0].toUpperCase()}
                </div>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50">
                  <Link
                    to="/dashboard/company"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsCPModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 font-bold transition-colors border-t border-gray-50"
                  >
                    <LockKeyhole size={16} /> Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-500 hover:bg-red-50 font-bold transition-colors"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
