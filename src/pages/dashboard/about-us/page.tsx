import { useState, useEffect } from "react";
import { Info, Plus } from "lucide-react";
import { contentService } from "../../../services/contentServices";
import { showConfirm, showError } from "../../../utils/toastUtils";
import AboutTable from "../../../components/dashboard/about-us/AboutTable";
import AboutForm from "../../../components/dashboard/about-us/AboutForm";

export default function AboutManage() {
  const [aboutData, setAboutData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  // 1. Fetch About Data
  const fetchAboutData = async () => {
    setLoading(true);
    try {
      const response = await contentService.getAbout();
      const data = response?.data?.data || response?.data || response;
      setAboutData(Array.isArray(data) ? data : []);
    } catch (err) {
      showError("Failed to load about details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  // 2. Handle Delete
  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      "Are you sure you want to delete this information?",
    ); // English Message
    if (confirmed) {
      try {
        await contentService.deleteAbout(id);
        fetchAboutData();
      } catch (err) {
        showError("Failed to delete the information.");
      }
    }
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

 

  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Info className="text-[#1e695e]" size={24} />
            About Us Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your organization's description and feature images.
          </p>
        </div>

        <div className="flex gap-2">
          {aboutData.length === 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1e695e] text-white px-4 py-2 rounded-md font-bold text-xs flex items-center gap-2"
            >
              <Plus size={16} />Create
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
        <AboutTable
          data={aboutData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      <AboutForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedItem}
        refreshData={fetchAboutData}
        existingCount={aboutData.length}
      />
    </div>
  );
}
