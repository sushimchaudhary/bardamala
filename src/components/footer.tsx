import { useEffect, useState } from "react";
import { Facebook, Twitter,  Instagram,  } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";

export default function Footer() {
  const dateStr = new Date().getFullYear();
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
   const fetchFooterData = async () => {
  try {
    const res = await api.get("/api/company/company-details/"); 
    
    if (res.data && res.data.length > 0) {
      setCompany(res.data[0]);
    }
  } catch (err) {
    console.error("Footer data load failed", err);
  }
};
    fetchFooterData();
  }, []);

  return (
    <footer className="w-full font-sans border-t border-teal-800">
      <div className="bg-[#217367] text-white py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="space-y-3">
            <div className="inline-block transition-transform duration-300">
              <Link to={"/"}>
                <img
                  src={company?.logo || "/footerlogo.png"} // Logo dynamic
                  alt="Logo"
                  className="h-28 object-contain brightness-110"
                />
              </Link>
            </div>
            <div className="flex gap-4">
              {company?.fb_link && (
                <a href={company.fb_link} target="_blank" className="p-2 rounded-full bg-teal-800/50 hover:bg-blue-600 transition-all"><Facebook className="w-5 h-5" /></a>
              )}
              {company?.x_link && (
                <a href={company.x_link} target="_blank" className="p-2 rounded-full bg-teal-800/50 hover:bg-sky-500 transition-all"><Twitter className="w-5 h-5" /></a>
              )}
              {company?.insta_link && (
                <a href={company.insta_link} target="_blank" className="p-2 rounded-full bg-teal-800/50 hover:bg-pink-600 transition-all"><Instagram className="w-5 h-5" /></a>
              )}
            </div>
          </div>

          {/* 2. Contact Section - Dynamic */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold uppercase tracking-wider text-white border-b-2 border-teal-500/30 pb-2">
              सम्पर्क
            </h3>
            <div className="text-[14px] space-y-3 leading-relaxed text-teal-50/90">
              <p className="font-semibold text-white">
                {company?.name || "हाम्रो कार्यालय"}
              </p>
              <div className="space-y-1 opacity-80">
                <p>{company?.address || "ठेगाना उपलब्ध छैन"}</p>
                <p>
                  फोन :{" "}
                  <a href={`tel:${company?.contact_no}`} className="hover:text-[#ff3c02] transition-colors">
                    {company?.contact_no || "N/A"}
                  </a>
                </p>
                <p>
                  इमेल :{" "}
                  <a href={`mailto:${company?.email}`} className="hover:text-[#ff3c02] transition-colors">
                    {company?.email || "N/A"}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* 3. Navigation (Static as requested) */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wider text-white border-b-2 border-teal-500/30 pb-2">
              नेभिगेसन
            </h3>
            <ul className="space-y-2 text-[14px]">
              {["गृह पृष्ठ", "शैक्षिक डाटा", "समाचार", "जिज्ञासा जवाफ"].map((link) => (
                <li key={link} className="group flex items-center gap-2 cursor-pointer">
                  <span className="h-[1px] w-0 bg-[#ff3c02] transition-all duration-300 group-hover:w-3"></span>
                  <span className="group-hover:text-[#ff3c02] transition-colors">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. More Info (Static as requested) */}
          <div className="space-y-4 pt-0">
            <h3 className="text-lg font-bold uppercase tracking-wider text-white border-b-2 border-teal-500/30 pb-2">
              थप जानकारी
            </h3>
            <ul className="space-y-2 text-[14px]">
              {["हाम्रा बारे", "सदस्य", "सेयर सदस्य", "स्तम्भ"].map((link) => (
                <li key={link} className="group flex items-center gap-2 cursor-pointer">
                  <span className="h-[1px] w-0 bg-[#ff3c02] transition-all duration-300 group-hover:w-3"></span>
                  <span className="group-hover:text-[#ff3c02] transition-colors">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. App & Payment (Static) */}
          <div className="flex flex-col justify-between h-full space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-bold text-white uppercase">Download Our App</p>
              <img src="/google.png" alt="Google Play" className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity border border-teal-700 rounded-lg p-1" />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold text-white uppercase">Official Payment Partner</p>
              <div className="bg-white/10 p-2 rounded-lg inline-block border border-white/5 hover:bg-white/20 transition-all">
                <img src="/esewa.png" alt="eSewa" className="h-8 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#131515] text-gray-400 py-6 px-4 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs md:text-sm text-center ">
            © {dateStr} <span className="text-white font-medium">{company?.name || "Shikshak Monthly"}</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span>Developed by:</span>
            <Link to={"#"}>
              <span className="text-[#217367] font-bold hover:text-teal-300 cursor-pointer transition-colors">Shempa Tech</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}