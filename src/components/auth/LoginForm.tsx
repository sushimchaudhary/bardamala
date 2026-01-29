import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authServices";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    setSuccess("");

    try {
      await loginUser(credentials);
      setSuccess("स्वागत छ! लगइन सफल भयो।");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err: any) {
      const status = err.response?.status;

      if (status === 401) {
        setError("तपाईंको युजरनेम वा पासवर्ड मिलेन।");
      } else if (err.message === "Network Error") {
        setError("इन्टरनेट कनेक्सनमा समस्या देखियो।");
      } else {
        setError("युजरनेम वा पासवर्ड गलत छ। कृपया फेरि प्रयास गर्नुहोस्।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white font-sans flex flex-col">
      {/* Header */}
      <header className="py-2 px-4 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 md:h-14 object-contain"
          />
          <span className="text-gray-800 text-sm md:text-md font-bold">
            पढ्न रुचाउनेहरूको पत्रिका !
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-4 py-4 md:py-10  items-center">
        {/* Form Container */}
        <div className="flex flex-col justify-start w-full">
          <h1 className="text-[#d4482f] text-3xl md:text-4xl font-bold mb-6">
            साइन इन
          </h1>

          {error && error.length > 0 && (
            <div className=" text-red-600 p-1 rounded mb-5 text-[11px] font-bold  flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 p-2 rounded mb-5 text-[13px] font-bold border border-green-200">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1.5">
                युजरनेम
              </label>
              <input
                type="text"
                name="username"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-teal-600 transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1.5">
                पासवर्ड
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-teal-600 transition"
                onChange={handleChange}
              />
            </div>

            <div className="text-sm">
              <Link to="/forgot-password">
                <span className="text-teal-700 font-bold hover:underline underline-offset-4 cursor-pointer">
                  पासवर्ड बिर्सनुभयो ?
                </span>
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full md:w-auto bg-[#d4482f] hover:bg-[#c23d1d] text-white font-bold py-2.5 px-12 transition-colors shadow-sm disabled:bg-gray-400 flex items-center justify-center min-w-[140px]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>प्रक्रियामा...</span>
                </div>
              ) : success ? (
                "Redirecting..."
              ) : (
                "साइन इन"
              )}
            </button>

            <div className="pt-1 text-gray-800 font-bold text-sm">
              तपाईंको खाता छैन ?{" "}
              <Link
                to="/register"
                className="text-teal-700 hover:underline underline-offset-4"
              >
                साइन अप गर्नुहोस्!
              </Link>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center md:border-l md:border-gray-200 md:pl-10 mt-6 md:mt-0 w-full">
          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
            <img
              src="/auth.png"
              alt="Showcase"
              className="w-full h-auto max-h-[40vh] md:max-h-[60vh] lg:max-h-[70vh] object-contain brightness-105 mx-auto"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
