import React, { useState, useEffect } from "react";
import { Save, Info, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { contentService } from "../../../services/contentServices";
import { showError, showSuccess } from "../../../utils/toastUtils";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface AboutFormProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  refreshData: () => void;
  existingCount: number; // यो नयाँ थप्नुहोस्
}
export default function AboutForm({
  isOpen,
  onClose,
  data,
  refreshData,
}: AboutFormProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: null as number | null,
    description: "",
    photo: null as File | string | null,
  });

 useEffect(() => {
  if (data) {
    setFormData({ 
      id: data.id, 
      description: data.description || "", // यो खाली हुनु भएन
      photo: data.photo 
    });
    setPreview(data.photo);
  }
}, [data, isOpen]);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.description || formData.description === "<p><br></p>") {
    return showError("Description is required");
  }


  setLoading(true);
  const dataToSend = new FormData();
  dataToSend.append("description", formData.description);
  
  if (formData.photo instanceof File) {
    dataToSend.append("photo", formData.photo);
  }

  try {
    if (formData.id) {
      await contentService.updateAbout(formData.id, dataToSend);
      showSuccess("About content updated!");
    } else {
      await contentService.createAbout(dataToSend);
      showSuccess("About content created!");
    }
    refreshData(); 
    onClose();
  } catch (err: any) {
    showError("Failed to save data.");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="bg-white rounded shadow-xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex-shrink-0 bg-[#1e695e] px-4 py-2 text-white flex justify-between items-center">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Info size={18} /> {formData.id ? "Edit About Us" : "Add About Us"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4 overflow-y-auto max-h-[70vh]"
        >
          {/* Photo Upload */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Feature Image
            </label>
            <div className="relative h-40 w-full border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100/50 transition-all cursor-pointer overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <ImageIcon size={30} strokeWidth={1.5} />
                  <span className="text-xs">Click to upload photo</span>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, photo: file });
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* Description with ReactQuill */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Description
            </label>
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(content) =>
                  setFormData({ ...formData, description: content })
                }
                className="text-black h-48 mb-10"
                placeholder="Write article details..."
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "code-block"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-50 bg-gray-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded text-gray-500 text-[11px] font-bold uppercase hover:bg-gray-100 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1e695e] hover:bg-[#164e46] text-white px-6 py-1.5 rounded-md font-bold text-[11px] uppercase shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:bg-gray-400"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                <Save size={14} /> {formData.id ? "Update" : "Save"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
