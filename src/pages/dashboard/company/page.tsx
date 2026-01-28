import  { useState, useEffect } from "react";
import { Plus, Edit2, Trash2,  Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { companyService } from "../../../services/companyServices";

import CompanyForm from "../../../components/dashboard/companyForm";
import { showError, showSuccess } from "../../../utils/toastUtils";

export default function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const loadData = async () => {
    try {
      const data = await companyService.getDetails();
      setCompanies(data);
    } catch (err) {
      showError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleEdit = (company: any) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await companyService.deleteDetails(id); 
        showSuccess("Deleted successfully");
        loadData();
      } catch (err) {
        showError("Delete failed");
      }
    }
  };

 
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Company Management</h1>
        <button
          onClick={() => { setSelectedCompany(null); setIsModalOpen(true); }}
          className="flex items-center gap-1 bg-[#1e695e] text-white px-3 py-1.5 rounded text-sm font-bold hover:bg-[#164e46] transition-all"
        >
          <Plus size={15} />Create
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 border-b border-gray-100">
            <tr>
              <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px]">Logo & Name</th>
              <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px]">Contact Info</th>
              <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px]">Office Address</th>
              <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px]">Map</th>
              <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px]">Socials</th>
              <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px] text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {companies.map((company: any) => (
              <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-2">
                  <div className="flex items-center gap-3">
                    <img src={company.logo} className="w-10 h-10 rounded object-cover border border-gray-100" />
                    <span className="font-bold text-gray-800">{company.name}</span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex flex-col gap-1 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 font-medium"><Mail size={12}/> {company.email}</span>
                    <span className="flex items-center gap-1"><Phone size={12}/> {company.contact_no}</span>
                  </div>
                </td>

                <td className="px-6 py-2 max-w-[200px]">
                  <p className="text-[11px] text-gray-500 line-clamp-2">{company.address || "No address set"}</p>
                </td>
                
                <td className="px-6 py-2">
                  {company.google_map ? (
                    <a href={company.google_map} target="_blank" rel="noopener noreferrer" className="text-[#1e695e] hover:text-[#164e46]">
                      <MapPin size={18} />
                    </a>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>

                
                <td className="px-6 py-2">
                  <div className="flex gap-2 text-gray-400">
                    {company.fb_link && (
                      <a href={company.fb_link} target="_blank" className="hover:text-blue-600 transition-colors">
                        <Facebook size={16} />
                      </a>
                    )}
                    {company.insta_link && (
                      <a href={company.insta_link} target="_blank" className="hover:text-pink-600 transition-colors">
                        <Instagram size={16} />
                      </a>
                    )}
                    {company.linkedin_link && (
                      <a href={company.linkedin_link} target="_blank" className="hover:text-blue-700 transition-colors">
                        <Linkedin size={16} />
                      </a>
                    )}
                    {company.x_link && (
                      <a href={company.x_link} target="_blank" className="hover:text-black transition-colors">
                        <Twitter size={16} />
                      </a>
                    )}
                    {!company.fb_link && !company.insta_link && !company.linkedin_link && !company.x_link && (
                      <span className="text-[10px]">No links</span>
                    )}
                  </div>
                </td>
                
                <td className="px-3 py-2 text-end ">
                  <div className="flex justify-end gap-1 ">
                    <button onClick={() => handleEdit(company)} className="p-2 text-blue-600 cursor-pointer hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(company.id)} className="p-2 text-red-500 cursor-pointer hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CompanyForm 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          data={selectedCompany} 
          refreshData={loadData}
        />
      )}
    </div>
  );
}