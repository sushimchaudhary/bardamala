import React, { useState } from "react";
import { Trash2, Loader2, Mail, User, Calendar, X, MessageSquare } from "lucide-react";

interface ContactMessageTableProps {
  messages: any[];
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function ContactMessageTable({
  messages,
  onDelete,
  loading,
}: ContactMessageTableProps) {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      
      <div
        className="overflow-x-auto overflow-y-auto max-h-[450px] hide-scroll"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        <table className="w-full text-left text-sm min-w-[800px]">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-100">
              <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] bg-gray-100">S.N.</th>
              <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] bg-gray-100">Full Name</th>
              <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] bg-gray-100">Email</th>
              <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] bg-gray-100 w-1/3">Message (Click to read)</th>
              <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] bg-gray-100">Date</th>
              <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] text-end bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-2 py-10 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin text-[#1e695e]" size={30} />
                    <span className="text-[10px] font-bold tracking-widest text-gray-400">LOADING MESSAGES...</span>
                  </div>
                </td>
              </tr>
            ) : messages.length > 0 ? (
              [...messages].reverse().map((msg, index) => (
                <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 py-3 text-gray-500 text-center border-b border-gray-100">{index + 1}.</td>
                  <td className="px-3 py-3 font-medium text-gray-800 whitespace-nowrap border-b border-gray-100">
                    <div className="flex items-center gap-2"><User size={12} className="text-gray-400" />{msg.fullname}</div>
                  </td>
                  <td className="px-3 py-3 text-gray-500 whitespace-nowrap border-b border-gray-100">
                    <div className="flex items-center gap-2"><Mail size={12} className="text-gray-400" />{msg.email}</div>
                  </td>
                  {/* Clickable Message Field */}
                  <td 
                    className="px-3 py-3 text-gray-600 border-b border-gray-100 cursor-pointer hover:text-[#1e695e]"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <p className="line-clamp-2 text-[12px] leading-relaxed italic">
                      {msg.message}
                    </p>
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-[11px] whitespace-nowrap border-b border-gray-100 font-medium">
                    <div className="flex items-center gap-1"><Calendar size={12} />{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'N/A'}</div>
                  </td>
                  <td className="px-3 py-3 text-end border-b border-gray-100">
                    <button onClick={() => onDelete(msg.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-full cursor-pointer"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-500 italic">No messages found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- View Message Modal --- */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded shadow-xl w-full max-w-lg overflow-hidden border border-gray-100">
            <div className="flex justify-between items-center p-2.5 border-b bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare size={18} className="text-[#1e695e]" /> Message Details
              </h3>
              <button onClick={() => setSelectedMessage(null)} className="text-red-500 hover:text-red-600 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-gray-500 pb-2 border-b border-dashed">
                <span><strong>From:</strong> {selectedMessage.fullname}</span>
                <span><strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Message:</span>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded border border-gray-100 max-h-[300px] overflow-y-auto">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-[#1e695e] text-white text-xs font-bold rounded cursor-pointer hover:bg-[#164e46] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}