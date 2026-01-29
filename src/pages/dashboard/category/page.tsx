import { useState, useEffect } from "react";
import { Plus, Tag } from "lucide-react";
import { categoryService } from "../../../services/categoryServices";
import { showConfirm, showError } from "../../../utils/toastUtils";
import CategoryTable from "../../../components/dashboard/category/CategoryTable";
import CategoryForm from "../../../components/dashboard/category/CategoryForm"; // फर्म इम्पोर्ट गरियो

export default function CategoryManage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryService.getDetails();

      console.log("Category API Response:", response);

       const actualData = response?.data || response;

      if (Array.isArray(actualData)) {
        setCategories(actualData);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error(err);
      showError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      "Are you sure you want to delete this category?",
    );
    if (confirmed) {
      try {
        await categoryService.deleteDetails(id);
        fetchCategories(); 
      } catch (err) {
        showError("Failed to delete category.");
      }
    }
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  return (
     <div className="bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Tag className="text-[#1e695e]" size={24} />
            Category Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize your news and content into different categories.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="bg-[#1e695e] hover:bg-[#164e46] text-white px-4 py-2 rounded-md text-xs font-bold uppercase flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={16} /> Create
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      <CategoryForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedCategory}
        refreshData={fetchCategories}
      />
    </div>
  );
}
