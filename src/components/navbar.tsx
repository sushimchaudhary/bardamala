import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NepaliDate from "nepali-date-converter";
import api from "../api/axiosInstance";
import { categoryService } from "../services/categoryServices";
import { contentService } from "../services/contentServices";
import DynamicAdsProvider from "./adds/dynamicAdsProvider";

export default function Navbar() {
  const [dateStr, setDateStr] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const today = new NepaliDate();
    setDateStr(today.format("DD MMMM YYYY", "np"));

    const fetchData = async () => {
      try {
        const [logoRes, catRes, postRes] = await Promise.all([
          api.get("/api/company/company-details/"),
          categoryService.getDetails(),
          contentService.getPosts(),
        ]);

        if (logoRes.data && logoRes.data.length > 0)
          setLogo(logoRes.data[0].logo);

        const rawCats = catRes?.data || catRes;
        setCategories(
          rawCats.filter(
            (c: any) =>
              c.is_active && c.name !== "रिपोर्ट" && c.name !== "मनका कुरा",
          ),
        );

        const posts = Array.isArray(postRes)
          ? postRes
          : postRes?.data?.data || [];
        setAllPosts(posts);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilteredResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 1) {
      const matched = allPosts
        .filter((post) =>
          post.title.toLowerCase().includes(value.toLowerCase()),
        )
        .slice(0, 6);
      setFilteredResults(matched);
    } else {
      setFilteredResults([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsSearchOpen(false);
      setFilteredResults([]);
      setSearchQuery("");
    }
  };

  const staticLinks = [
    { label: "गृह पृष्ठ", path: "/" },
    { label: "हाम्रा बारे", path: "/about-us" },
  ];
  const footerLinks = [{ label: "सम्पर्क", path: "/contact" }];

  return (
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex-1 flex justify-start">
              <div className="text-[#33b9d2] font-bold text-[10px] md:text-sm whitespace-nowrap">
                मिति: {dateStr}
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link to={"/"}>
                {logo && (
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 sm:h-12 md:h-14 lg:h-20 w-auto object-contain"
                  />
                )}
              </Link>
            </div>

            <div className="flex-1 flex justify-end">
              <div className="flex gap-2">
                <Link to={"/login"}>
                  <button className="border border-[#213a59] px-2 py-1 md:px-4 md:py-2 rounded text-[#213a59] font-bold hover:bg-[#213a59] hover:text-white transition-all text-[10px] md:text-xs lg:text-sm">
                    साइन इन
                  </button>
                </Link>
                {/* <Link to={"/register"}>
                  <button className="border border-[#213a59] px-2 py-1 md:px-4 md:py-2 rounded text-[#213a59] font-bold hover:bg-[#213a59] hover:text-white transition-all text-[10px] md:text-xs lg:text-sm">
                    साइन अप
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="sticky top-0 z-50 bg-[#213a59] text-white py-3 lg:px-2 px-4">
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

          <div
            className={`absolute bg-[#213a59] top-full left-0 w-full  md:static md:w-auto md:flex lg:gap-8 gap-3 md:gap-4 lg:pl-13 pl-3 overflow-hidden transition-all duration-300 ease-out ${isMenuOpen ? "flex flex-col items-start p-2 opacity-100 max-h-[1000px] overflow-y-auto shadow-xl" : "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100 md:max-h-none md:flex"}`}
          >
            {staticLinks.concat(categories, footerLinks).map((link: any) => (
              <NavLink
                key={link.path || link.slug}
                to={link.path || `/category/${link.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `relative py-1 transition-colors hover:text-gray-300 whitespace-nowrap ${isActive ? "text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white" : "text-white/80"}`
                }
              >
                {link.label || link.name}
              </NavLink>
            ))}
          </div>

          <div className="relative" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="flex items-center">
              <div
                className={`flex flex-col items-start overflow-hidden transition-all duration-500 ease-in-out ${isSearchOpen ? "lg:w-60 md:w-40 w-32 opacity-100 mr-2" : "w-0 opacity-0"}`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="खोजी गर्नुहोस् ..."
                  className="bg-transparent pl-2 text-white placeholder-white/70 outline-none w-full py-1 text-sm italic"
                  autoFocus={isSearchOpen}
                />
                <div
                  className={`h-[1px] bg-white transition-all duration-700 ${isSearchOpen ? "w-full" : "w-0"}`}
                />
              </div>

              <button
                type="button"
                className="hover:text-gray-300 transition-colors p-1"
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
            </form>

            {filteredResults.length > 0 && (
              <div className="absolute top-full right-0 mt-3 w-64 md:w-80 bg-white shadow-2xl rounded overflow-hidden z-[60] border border-gray-200">
                <div className="py-2">
                  {filteredResults.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      onClick={() => setFilteredResults([])}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      {post.photo && (
                        <img
                          src={post.photo}
                          alt=""
                          className="w-10 h-10 shrink-0 object-cover rounded"
                        />
                      )}
                      <p className="text-gray-800 text-sm font-medium line-clamp-2 leading-snug">
                        {post.title}
                      </p>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full bg-gray-50 py-2 text-xs text-[#213a59] font-bold border-t hover:bg-gray-100 transition-colors"
                >
                  सबै नतिजाहरू हेर्नुहोस् »
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
