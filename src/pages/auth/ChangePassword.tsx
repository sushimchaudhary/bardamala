import React, { useState } from "react";
import { Lock, X, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import api from "../../api/axiosInstance";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({ old_password: "", new_password: "", confirm_password: "" });
  const [showPasswords, setShowPasswords] = useState(false); // Toggle visibility
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (formData.new_password !== formData.confirm_password) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/change-password/", {
        old_password: formData.old_password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password, 
      });

      setSuccess("Success! Your password has been updated.");
      setTimeout(() => {
        setFormData({ old_password: "", new_password: "", confirm_password: "" });
        onClose();
        setSuccess("");
      }, 2000);
    } catch (err: any) {
      const serverData = err.response?.data;
      setError(serverData?.old_password ? "Incorrect current password." : "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3">
      
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      
      <div className="bg-white rounded shadow-2xl w-full max-w-md relative z-10 overflow-hidden transform transition-all animate-in zoom-in duration-300">
        
       
        <div className="h-1.5 bg-[#d4482f] w-full"></div>

        <button onClick={onClose} className="absolute top-5 right-5 text-red-500 hover:text-red-600">
          <X size={22} />
        </button>

        <div className="p-4">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3 bg-teal-50 rounded-2xl mb-3 shadow-inner">
              <ShieldCheck className="text-[#1e695e]" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Security Update</h2>
            <p className="text-[12px] text-gray-500 mt-1">Please enter your details to change password</p>
          </div>

          

          {success && (
            <div className="mb-6 p-4 text-emerald-700 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
              <CheckCircle2 size={18} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {[
              { label: "Current Password", name: "old_password" },
              { label: "New Password", name: "new_password" },
              { label: "Confirm New Password", name: "confirm_password" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
                  {field.label}
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e695e] transition-colors">
                    <Lock size={14} />
                  </div>
                  <input 
                    type={showPasswords ? "text" : "password"}
                    required 
                    className="w-full pl-10 pr-12 py-1.5 bg-gray-50 border border-gray-200 rounded outline-none focus:bg-white focus:border-[#1e695e] focus:ring-4 focus:ring-[#1e695e]/10 text-sm transition-all" 
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    value={(formData as any)[field.name]}
                  />
                  {field.name === "old_password" && (
                    <button 
                      type="button" 
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    >
                      {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Status Messages */}
          {error && (
            <div className="  text-red-700 text-[10px]   flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
              <AlertCircle size={12} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

            <button 
              type="submit"
              disabled={loading || !!success} 
              className="w-full mt-4 bg-[#1e695e] hover:bg-[#164e46] text-white font-bold py-1.5 rounded shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:shadow-none disabled:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  <span>Updating...</span>
                </>
              ) : (
                "Save Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}