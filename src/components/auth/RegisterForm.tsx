import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

interface RegisterFormProps {
  onSuccess?: () => void;
  isModal?: boolean;      
}

export default function RegisterForm({ onSuccess, isModal = false }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    await api.post("/api/auth/register-editor/", formData);
    setSuccess("खाता सफलतापूर्वक सिर्जना भयो!");

    if (onSuccess) {
      setTimeout(onSuccess, 1500);
    } else {
      setTimeout(() => navigate("/login"), 2000);
    }
  } catch (err: any) {
    if (err.response?.data) {
      const serverError = err.response.data;

      
      if (serverError.email) {
        setError("यो इमेल पहिले नै प्रयोगमा छ। कृपया अर्को इमेल राख्नुहोस्।");
      } 
     
      else if (serverError.username) {
        setError("यो युजरनेम उपलब्ध छैन। अर्को छान्नुहोस्।");
      } 
     
      else {
        setError("दर्ता प्रक्रियामा समस्या देखियो। सबै विवरण ठिक छन् कि छैनन् चेक गर्नुहोस्।");
      }
    } else {
      setError("सर्भरमा जडान हुन सकेन।");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={`bg-white font-sans flex flex-col ${!isModal ? "min-h-screen" : ""}`}>
      
      {!isModal && (
        <header className="py-2 px-4 border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-12 md:h-14 object-contain" />
            <span className="text-gray-800 text-sm md:text-md font-bold">
              पढ्न रुचाउनेहरूको पत्रिका !
            </span>
          </div>
        </header>
      )}

      <main className={`flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 ${!isModal ? "md:grid-cols-2" : ""} gap-6 md:gap-10 px-6 py-6 md:py-10 items-center`}>
        
        <div className="flex flex-col justify-start w-full">
          <h1 className={`text-[#d4482f] font-bold mb-6 ${isModal ? "text-2xl border-b pb-2" : "text-3xl md:text-4xl"}`}>
            साइन अप (दर्ता)
          </h1>

          {error && (
            <div className="text-red-600 p-2 rounded mb-5 text-[12px] font-bold flex items-center gap-2 bg-red-50 border border-red-100">
              <span className="shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 p-3 rounded mb-5 text-[13px] font-bold border border-green-200">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`w-full ${!isModal ? "max-w-md" : ""} space-y-4`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1.5 text-sm">नाम</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="First Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-teal-600 transition text-sm"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1.5 text-sm">थर</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-teal-600 transition text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1.5 text-sm">इमेल</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-teal-600 transition text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1.5 text-sm">युजरनेम</label>
              <input
                type="text"
                name="username"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-teal-600 transition text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1.5 text-sm">पासवर्ड</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-teal-600 transition text-sm"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!success}
              className={`w-full bg-[#d4482f] hover:bg-[#c23d1d] text-white font-bold py-2.5 transition-colors shadow-sm disabled:bg-gray-400 flex items-center justify-center min-w-[160px] ${!isModal ? "md:w-auto px-12" : "rounded"}`}
            >
              {loading ? "बनाउँदै..." : "साइन अप"}
            </button>

            {!isModal && (
              <div className="pt-2 text-gray-800 font-bold text-sm">
                पहिले नै खाता छ ?{" "}
                <Link to="/login" className="text-teal-700 hover:underline underline-offset-4">
                  साइन इन गर्नुहोस्!
                </Link>
              </div>
            )}
          </form>
        </div>

        {!isModal && (
          <div className="hidden md:flex items-center justify-center border-l border-gray-200 pl-10 w-full">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
              <img
                src="/auth.png"
                alt="Register Showcase"
                className="w-full h-auto max-h-[60vh] object-contain brightness-105 mx-auto"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}