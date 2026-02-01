import React, { useEffect, useState } from "react";
import { Save, Megaphone, X, Loader2, Image as ImageIcon } from "lucide-react";
import { adService } from "../../../services/adServices";
import { showSuccess, showError } from "../../../utils/toastUtils";
import api from "../../../api/axiosInstance"; 

interface AdFormProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  refreshData: () => void;
}

export default function AdForm({ isOpen, onClose, data, refreshData }: AdFormProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [positions, setPositions] = useState<{ value: string; label: string }[]>([]); // Backend बाट आउने Choices
  
  const [formData, setFormData] = useState({
    id: null as number | null,
    name: "",
    start_date: "",
    end_date: "",
    position: "", 
    is_active: true,
    file: null as File | string | null,
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await api({ method: 'OPTIONS', url: '/api/ads/ads/' });
        
        const choiceList = res.data?.actions?.POST?.position?.choices;

        if (choiceList) {
          const formattedChoices = choiceList.map((c: any) => ({
            value: c.value,
            label: c.display_name
          }));
          setPositions(formattedChoices);

          if (!data && formattedChoices.length > 0) {
            setFormData(prev => ({ ...prev, position: formattedChoices[0].value }));
          }
        }
      } catch (err) {
        console.error("Choices faild:", err);
      }
    };

    if (isOpen) fetchMetadata();
  }, [isOpen, data]);

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        name: data.name || "",
        start_date: data.start_date || "",
        end_date: data.end_date || "",
        position: data.position || "",
        is_active: data.is_active ?? true,
        file: data.file,
      });
      setPreview(data.file);
    } else {
      setFormData(prev => ({
        ...prev,
        id: null,
        name: "",
        start_date: "",
        end_date: "",
        is_active: true,
        file: null,
      }));
      setPreview(null);
    }
  }, [data, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("start_date", formData.start_date);
    dataToSend.append("end_date", formData.end_date);
    dataToSend.append("position", formData.position);
    dataToSend.append("is_active", String(formData.is_active));

    if (formData.file instanceof File) {
      dataToSend.append("file", formData.file);
    }

    try {
      if (formData.id) {
        await adService.updateAd(formData.id, dataToSend);
        showSuccess("Ad updated successfully!");
      } else {
        if (!(formData.file instanceof File)) {
          showError("Please select an ad image.");
          setLoading(false);
          return;
        }
        await adService.createAd(dataToSend);
        showSuccess("Ad created successfully!");
      }
      refreshData();
      onClose();
    } catch (err) {
      console.error(err);
      showError("Failed to save advertisement.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="bg-white rounded shadow-xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex-shrink-0 bg-[#1e695e] px-4 py-1.5 text-white flex justify-between items-center">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Megaphone size={18} /> {formData.id ? "Edit Ad" : "Add New Ad"}
          </h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 overflow-y-auto max-h-[75vh]">
          {/* Ad Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ad Name *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-1.5 border shadow-sm border-gray-200 rounded outline-none focus:border-[#1e695e] text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Position</label>
              <select
                className="w-full px-3 py-1.5 border shadow-sm border-gray-200 rounded outline-none focus:border-[#1e695e] text-sm bg-white"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              >
                {positions.length > 0 ? (
                  positions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))
                ) : (
                  <option value="">Loading positions...</option>
                )}
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="is_active"
                className="w-4 h-4 accent-[#1e695e] shadow-sm"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <label htmlFor="is_active" className="text-xs font-bold text-gray-600">Active</label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Start Date</label>
              <input
                type="date"
                required
                className="w-full px-3 py-1.5 border shadow-sm border-gray-200 rounded text-sm outline-none"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">End Date</label>
              <input
                type="date"
                required
                className="w-full px-3 py-1.5 border shadow-sm border-gray-200 rounded text-sm outline-none"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          {/* Image Preview */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ad Creative</label>
            <div className="relative h-40 w-full border-2 border-dashed border-gray-200 rounded  bg-white flex items-center justify-center overflow-hidden hover:border-[#1e695e] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100/50 transition-all cursor-pointer overflow-hidden">
              {preview ? (
                <img src={preview} className="w-full h-full object-contain" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <ImageIcon size={32} strokeWidth={1.5} />
                  <span className="text-xs">Upload Ad Image</span>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, file: file });
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>
        </form>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 px-4 py-2 border-t border-gray-300 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded text-red-500 text-[11px] border border-red-500 hover:bg-red-500 hover:text-white font-bold uppercase transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1e695e] hover:bg-[#164e46] text-white px-6 py-1.5 rounded font-bold text-[11px] uppercase shadow-sm transition-all flex items-center gap-2 disabled:bg-gray-400"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> {formData.id ? "Update" : "Save"}</>}
          </button>
        </div>
      </div>
    </div>
  );
}