import { useEffect, useState } from "react";
import { 
  Loader2,  Trash2, UserPlus, Search, AlertCircle, 
   X 
} from "lucide-react";
import api from "../../../api/axiosInstance";
import RegisterForm from "../../../components/auth/RegisterForm";

export default function DashboardUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/api/auth/users/"); 
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err: any) {
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/auth/users/${id}/`);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert("Failed to delete the user.");
      }
    }
  };

  return (
    <section className="relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">User Management</h2>
          <p className="text-xs text-gray-500">Manage system roles and permissions.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600" size={16} />
            <input 
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm outline-none focus:border-teal-500 focus:bg-white w-full sm:w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
              className="bg-[#1e695e] hover:bg-[#164e46] text-white px-2.5  py-1 cursor-pointer rounded text-xs font-bold  flex items-center gap-2 transition-all shadow-sm"
          >
            <UserPlus size={14} /> Create
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1 p-2 mb-4 text-red-500 bg-red-50 rounded border border-red-100 text-[12px]">
          <AlertCircle size={14} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Table UI */}
      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[450px]">
          <table className="w-full text-left text-sm min-w-[700px]">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="px-3 py-3 font-bold text-gray-600 uppercase text-[10px]">S.N.</th>
                <th className="px-3 py-3 font-bold text-gray-600 uppercase text-[10px]">Full Name</th>
                <th className="px-3 py-3 font-bold text-gray-600 uppercase text-[10px]">Username</th>
                <th className="px-3 py-3 font-bold text-gray-600 uppercase text-[10px]">Role</th>
                <th className="px-3 py-3 font-bold text-gray-600 uppercase text-[10px]">Status</th>
                <th className="px-3 py-3 font-bold text-gray-600 uppercase text-[10px] text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-2 py-10 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#1e695e]" size={30} />
                  </td>
                </tr>
              ) : filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-3 text-gray-500">{index + 1}.</td>
                  <td className="p-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-[13px]">{user.first_name} {user.last_name}</span>
                      <span className="text-[11px] text-gray-400">{user.email}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-600 font-mono text-[11px] bg-gray-50 px-2 py-0.5 rounded border border-gray-100">@{user.username}</span>
                  </td>
                  <td className="p-3">
                    {user.is_superuser ? (
                      <span className="text-purple-600 text-[10px] font-black bg-purple-50 px-2 py-0.5 rounded">SUPER ADMIN</span>
                    ) : user.is_staff ? (
                      <span className="text-blue-600 text-[10px] font-black bg-blue-50 px-2 py-0.5 rounded">EDITOR</span>
                    ) : (
                      <span className="text-gray-500 text-[10px] font-black bg-gray-50 px-2 py-0.5 rounded">REGULAR</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold ${user.is_active ? 'text-green-600' : 'text-red-400'}`}>
                      {user.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="p-3 text-end">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleDelete(user.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-full">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- REGISTER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
            >
              <X size={20} className="text-gray-500" />
            </button>
            <div className="p-2">
              <RegisterForm isModal={true} onSuccess={() => {
                setIsModalOpen(false);
                fetchUsers(); 
              }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}