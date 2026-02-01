
import { Trash2, Loader2, Mail, Calendar } from "lucide-react";

interface SubscriberTableProps {
  subscribers: any[];
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function SubscriberTable({
  subscribers,
  onDelete,
  loading,
}: SubscriberTableProps) {
  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        className="overflow-x-auto overflow-y-auto max-h-[450px] hide-scroll"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-100">
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] bg-gray-100">S.N.</th>
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] bg-gray-100">Email Address</th>
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] bg-gray-100 text-center">Subscribed Date</th>
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] text-end bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-2 py-10 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin text-[#1e695e]" size={30} />
                    <span className="text-[10px] font-bold tracking-widest text-gray-400">LOADING SUBSCRIBERS...</span>
                  </div>
                </td>
              </tr>
            ) : subscribers.length > 0 ? (
              [...subscribers].reverse().map((sub, index) => (
                <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 text-sm border-b border-gray-100">{index + 1}.</td>
                  <td className="px-4 py-3 font-medium text-gray-800 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      {sub.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-[12px] text-center border-b border-gray-100">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar size={12} />
                      {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-end border-b border-gray-100">
                    <button
                      onClick={() => onDelete(sub.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove Subscriber"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">No subscribers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}