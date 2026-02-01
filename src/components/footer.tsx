import { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Loader2, Send } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { categoryService } from "../services/categoryServices";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [company, setCompany] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  // Subscribe States
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [companyRes, catRes] = await Promise.all([
          api.get("/api/company/company-details/"),
          categoryService.getDetails(),
        ]);

        if (companyRes.data && companyRes.data.length > 0) {
          setCompany(companyRes.data[0]);
        }

        const rawCats = catRes?.data || catRes;
        if (Array.isArray(rawCats)) {
          setCategories(rawCats.filter((c: any) => c.is_active));
        }
      } catch (err) {
        console.error("Footer data load failed", err);
      }
    };
    fetchFooterData();
  }, []);

  // १. नेभिगेसनका लागि सामान्य क्याटेगोरी
  const navigationCats = categories
    .filter((c) => c.name.trim() !== "रिपोर्ट" && c.name.trim() !== "मनका कुरा")
    .slice(0, 5);

  // २. थप जानकारीका लागि रिपोर्ट र मनका कुरा
  const specialCats = categories.filter(
    (c) => c.name.trim() === "रिपोर्ट" || c.name.trim() === "मनका कुरा",
  );

  // ३. Subscribe Handle Function
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeLoading(true);
    setSubscribeStatus(null);
    try {
      await api.post("/api/communication/subscribers/", {
        email: subscribeEmail,
      });
      setSubscribeStatus({ type: "success", text: "दर्ता सफल भयो!" });
      setSubscribeEmail("");
    } catch (err: any) {
      const errorMsg = err.response?.data?.email?.[0];
      setSubscribeStatus({
        type: "error",
        text:
          errorMsg === "subscriber with this email already exists."
            ? "पहिले नै दर्ता छ।"
            : "प्रयास असफल भयो।",
      });
    } finally {
      setSubscribeLoading(false);
      setTimeout(() => setSubscribeStatus(null), 5000);
    }
  };

  return (
    <footer className="w-full font-sans border-t border-teal-800">
      <div className="bg-[#217367] text-white py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* १. लोगो र सोसल */}
          <div className="space-y-3">
            <Link to="/">
              <img
                src={company?.logo}
                alt="Logo"
                className="h-28 object-contain brightness-110"
              />
            </Link>
            <div className="flex gap-4">
              {company?.fb_link && (
                <a
                  href={company.fb_link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-teal-800/50 hover:bg-blue-600 transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {company?.x_link && (
                <a
                  href={company.x_link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-teal-800/50 hover:bg-sky-500 transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {company?.insta_link && (
                <a
                  href={company.insta_link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-teal-800/50 hover:bg-pink-600 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* २. सम्पर्क */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 border-teal-500/30 pb-2">
              सम्पर्क
            </h3>
            <div className="text-[14px] space-y-3 text-teal-50/90">
              <p className="font-semibold text-white">{company?.name}</p>
              <p className="opacity-80">{company?.address}</p>
              <p className="opacity-80">
                फोन:{" "}
                <a href={`tel:${company?.contact_no}`}>{company?.contact_no}</a>
              </p>
              <p className="opacity-80">
                इमेल: <a href={`mailto:${company?.email}`}>{company?.email}</a>
              </p>
            </div>
          </div>

          {/* ३. नेभिगेसन */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 border-teal-500/30 pb-2">
              नेभिगेसन
            </h3>
            <ul className="space-y-2 text-[14px]">
              {navigationCats.map((cat) => (
                <li key={cat.id} className="group flex items-center gap-2">
                  <span className="h-[1px] w-0 bg-[#ff3c02] transition-all duration-300 group-hover:w-3"></span>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="group-hover:text-[#ff3c02] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 border-teal-500/30 pb-2">
              थप जानकारी
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li className="group flex items-center gap-2 pt-2 border-t border-white/10">
                <span className="h-[1px] w-0 bg-[#ff3c02] transition-all duration-300 group-hover:w-3"></span>
                <Link to="/" className="group-hover:text-[#ff3c02]">
                  गृह पृष्ठ
                </Link>
              </li>
              <li className="group flex items-center gap-2">
                <span className="h-[1px] w-0 bg-[#ff3c02] transition-all duration-300 group-hover:w-3"></span>
                <Link to="/about-us" className="group-hover:text-[#ff3c02]">
                  हाम्रा बारे
                </Link>
              </li>
              <li className="group flex items-center gap-2">
                <span className="h-[1px] w-0 bg-[#ff3c02] transition-all duration-300 group-hover:w-3"></span>

                <Link to="/contact" className="group-hover:text-[#ff3c02]">
                  सम्पर्क
                </Link>
              </li>
            </ul>
          </div>

          {/* ५. एप र न्यूजलेटर (eSewa को ठाउँमा) */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-200">
                Download Our App
              </p>
              <img
                src="/google.png"
                alt="Play Store"
                className="h-10 border border-teal-700 rounded-md p-1 cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-200">
                न्यूजलेटर सदस्यता
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="तपाईंको इमेल..."
                    className="w-full bg-teal-800/40 border border-teal-700 rounded px-3 py-2 text-xs outline-none focus:border-teal-400 placeholder:text-teal-300/50"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                  />
                </div>
                <button
                  disabled={subscribeLoading}
                  className="w-full bg-[#131515] hover:bg-black text-white px-4 py-2 rounded text-[11px] font-bold transition-all flex items-center justify-center gap-2"
                >
                  {subscribeLoading ? (
                    <Loader2 className="animate-spin w-3 h-3" />
                  ) : (
                    <>
                      <Send size={12} /> SUBSCRIBE
                    </>
                  )}
                </button>
                {subscribeStatus && (
                  <p
                    className={`text-[10px] font-bold text-center ${subscribeStatus.type === "success" ? "text-teal-300" : "text-red-400"}`}
                  >
                    {subscribeStatus.text}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#131515] text-gray-400 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs md:text-sm">
            © {currentYear} <span className="text-white">{company?.name}</span>.
            All rights reserved.
          </p>
          <div className="text-xs md:text-sm">
            Developed by:{" "}
            <span className="text-[#217367] font-bold">Shempa Tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
