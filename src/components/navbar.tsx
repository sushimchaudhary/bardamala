import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NepaliDate from "nepali-date-converter";
import api from "../api/axiosInstance"; // Axios instance import gareko

export default function Navbar() {
  const [dateStr, setDateStr] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState(""); // Logo state

  useEffect(() => {
    const today = new NepaliDate();
    setDateStr(today.format("DD MMMM YYYY", "np"));

    const fetchLogo = async () => {
      try {
        const res = await api.get("/api/company/company-details/");
        if (res.data && res.data.length > 0) {
          setLogo(res.data[0].logo);
        }
      } catch (err) {
        console.error("Logo fetch error:", err);
      }
    };
    fetchLogo();
  }, []);

  return (
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <img
                src={logo || "/logo.png"} // Logo bhaye load hunchha, natra fallback
                alt="Logo"
                className="h-9 sm:h-12 md:h-14 lg:h-20 w-auto object-contain flex-shrink-0"
              />
              <Link to="/" className="flex-shrink-0">
                <img
                  src="/ads.jpg"
                  alt="Advertisement"
                  className="h-7 md:h-14 lg:h-20 w-auto object-contain flex-shrink-0"
                />
              </Link>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-2">
              {/* Buttons */}
              <div className="flex gap-2">
                <Link to={"/login"}>
                  <button className="border border-teal-700 px-3 py-1 md:px-4 md:py-2 rounded text-teal-700 font-bold hover:bg-teal-700 hover:text-white transition-all text-[11px] md:text-xs lg:text-sm">
                    Sign In
                  </button>
                </Link>

                <Link to={"/register"}>
                  <button className="bg-teal-700 border border-teal-700 px-3 py-1 md:px-4 md:py-2 rounded text-white font-bold hover:bg-teal-800 transition-all text-[11px] md:text-xs lg:text-sm">
                    Sign Up
                  </button>
                </Link>
              </div>

              <div className="text-teal-900 font-bold text-[11px] md:text-sm whitespace-nowrap">
                मिति: {dateStr}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="sticky top-0 z-50 bg-[#1e695e] text-white py-3 lg:px-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[15px] font-medium">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Menu Links */}
          <div
            className={`absolute top-full left-0 w-full bg-[#1e695e]
            md:static md:w-auto md:flex lg:gap-8 gap-3 md:gap-4 lg:pl-13 pl-3  overflow-hidden
            transition-all duration-300 ease-out
            ${
              isMenuOpen
                ? "flex flex-col items-start p-2 opacity-100 translate-y-0 max-h-[500px]"
                : "pointer-events-none opacity-0 gap-5 -translate-y-3 max-h-0 md:pointer-events-auto md:opacity-100 md:translate-y-0 md:max-h-none md:flex"
            }`}
          >
            {[
              ["गृह पृष्ठ", "/"],
              ["हाम्रा बारे", "/about"],
              ["स्तम्भ", "/columns"],
              ["शिक्षकका पुराना अंक", "/archives"],
              ["शिक्षक-किताब ", "/books"],
              ["पोडकास्ट", "/podcast"],
              ["उपयोगी लिङ्क", "/links"],
              ["ग्राहक बन्ने", "/subscribe"],
              ["सम्पर्क", "/contact"],
            ].map(([label, path]) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-gray-300"
              >
                {label}
              </Link>
            ))}
          </div>

          <div
            className="flex items-center relative group "
            onMouseEnter={() => setIsSearchOpen(true)}
            onMouseLeave={() => setIsSearchOpen(false)}
          >
            <div
              className={`flex flex-col items-start overflow-hidden transition-all duration-500 ${
                isSearchOpen
                  ? "lg:w-48 md:w-30 opacity-100 lg:mr-2 "
                  : "w-0 opacity-0"
              }`}
            >
              <input
                type="text"
                placeholder="खोजी गर्नुहोस् ..."
                className="bg-transparent pl-2 text-white placeholder-white/70 outline-none w-full py-0.5 text-sm italic"
              />
              <div
                className={`h-[1px] bg-white transition-all duration-700 ${
                  isSearchOpen ? "w-full" : "w-0"
                }`}
              />
            </div>

            <button
              className="hover:text-gray-300 transition-colors pr-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}