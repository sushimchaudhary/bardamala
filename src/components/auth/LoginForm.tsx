import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authServices";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

//  const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       console.log("Form Submitted");
//       await loginUser(credentials);
//       navigate("/dashboard"); 
//     } catch (err: any) {
//       // API bata aayeko exact error message dekhinechha
//       setError(err.message || "Invalid username or password");
//     } finally {
//       setLoading(false);
//     }
//   };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    await loginUser(credentials);
    setTimeout(() => {
      navigate("/dashboard");
    }, 100); 
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-[#1e695e] text-center mb-8">
          Login
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#1e695e] focus:border-transparent outline-none transition"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#1e695e] focus:border-transparent outline-none transition"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e695e] hover:bg-[#164d45] text-white font-bold py-3 rounded transition-colors shadow-md disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Forgot password? <span className="text-[#e44d26] cursor-pointer hover:underline">Reset here</span>
        </p>
      </div>
    </div>
  );
}