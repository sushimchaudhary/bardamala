import { useState, useEffect } from "react";
import { Plus, Building2 } from "lucide-react";
import { companyService } from "../../../services/companyServices";
import { showConfirm, showError } from "../../../utils/toastUtils";
import CompanyTable from "../../../components/dashboard/company/companyTable";
import CompanyForm from "../../../components/dashboard/company/companyForm";

export default function CompanyPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await companyService.getDetails();
     
      const data = response?.data?.data || response?.data || response;
      setCompanies(Array.isArray(data) ? data : []);
    } catch (err) {
      showError("Failed to fetch company data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // २. डिलिट गर्ने फङ्सन
  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      "Are you sure you want to delete this company profile?"
    );
    if (confirmed) {
      try {
        await companyService.deleteDetails(id);
        fetchCompanies();
      } catch (err) {
        showError("Failed to delete company.");
      }
    }
  };

  const handleEdit = (company: any) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

 
  const handleAddNew = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50/50 min-h-[80vh]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="text-[#1e695e]" size={24} />
            Company Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your business profile and social presence.
          </p>
        </div>

        <div className="flex gap-2">
          {companies.length === 0 && (
            <button
              onClick={handleAddNew}
              className="bg-[#1e695e] hover:bg-[#164e46] text-white px-4 py-2 rounded-md text-xs font-bold uppercase flex items-center gap-2 transition-all shadow-sm"
            >
              <Plus size={16} /> Create
            </button>
          )}
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
        <CompanyTable
          companies={companies}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading} 
        />
      </div>

      {/* Form Modal */}
      <CompanyForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedCompany}
        refreshData={fetchCompanies}
        existingCount={companies.length} 
      />
    </div>
  );
}