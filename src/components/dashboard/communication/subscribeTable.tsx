
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
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:h-[70vh] h-[65vh]">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="overflow-auto scrollbar-hide flex-grow relative">
        <table className="w-full text-left text-sm min-w-[600px] border-separate border-spacing-0">
          <thead className="bg-[#213a59]/90 text-white sticky top-0 z-10">
            <tr>
              <th className="p-2 font-bold  uppercase text-[10px] border-b border-gray-200 w-16">
                S.N.
              </th>
              <th className="p-2 font-bold  uppercase text-[10px] border-b border-gray-200">
                Email Address
              </th>
              <th className="p-2 font-bold  uppercase text-[10px] border-b border-gray-200 text-center w-40">
                Subscribed Date
              </th>
              <th className="p-2 font-bold  uppercase text-[10px] text-end border-b border-gray-200 w-24">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-2 py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin text-[#213a59]" size={32} />
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Loading Subscribers...
                    </span>
                  </div>
                </td>
              </tr>
            ) : subscribers.length > 0 ? (
              [...subscribers].reverse().map((sub, index) => (
                <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors text-xs ">
                  <td className="p-2 text-gray-500 border-b border-gray-50">
                    {index + 1}.
                  </td>
                  <td className="p-2 font-bold text-[#213a59] border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-[#33b9d2]" />
                      {sub.email}
                    </div>
                  </td>
                  <td className="p-2 text-gray-500 text-[11px] text-center border-b border-gray-50 font-medium">
                    <div className="flex items-center justify-center gap-1.5">
                      <Calendar size={12} className="text-gray-400" />
                      {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="p-1 text-end border-b border-gray-50">
                    <button
                      onClick={() => onDelete(sub.id)}
                      className="px-1 text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      title="Remove Subscriber"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center text-gray-400 italic text-sm">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  // return (
  //   <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
  //     <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
  //     <div
  //       className="overflow-x-auto overflow-y-auto max-h-[450px] hide-scroll"
  //       style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
  //     >
  //       <table className="w-full text-left text-sm min-w-[600px]">
  //         <thead className="sticky top-0 z-10">
  //           <tr className=">
  //             <th className="p-2 font-bold  uppercase text-[10px]">S.N.</th>
  //             <th className="p-2 font-bold  uppercase text-[10px]">Email Address</th>
  //             <th className="p-2 font-bold  uppercase text-[10px] text-center">Subscribed Date</th>
  //             <th className="px-4 py-3 font-bold  uppercase text-[10px] text-end">Action</th>
  //           </tr>
  //         </thead>
  //         <tbody className="divide-y divide-gray-50">
  //           {loading ? (
  //             <tr>
  //               <td colSpan={4} className="px-2 py-10 text-center">
  //                 <div className="flex flex-col items-center justify-center gap-3">
  //                   <Loader2 className="animate-spin text-[#1e695e]" size={30} />
  //                   <span className="text-[10px] font-bold tracking-widest text-gray-400">LOADING SUBSCRIBERS...</span>
  //                 </div>
  //               </td>
  //             </tr>
  //           ) : subscribers.length > 0 ? (
  //             [...subscribers].reverse().map((sub, index) => (
  //               <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
  //                 <td className="px-4 py-3 text-gray-500 text-sm border-b border-gray-100">{index + 1}.</td>
  //                 <td className="px-4 py-3 font-medium text-gray-800 border-b border-gray-100">
  //                   <div className="flex items-center gap-2">
  //                     <Mail size={14} className="text-gray-400" />
  //                     {sub.email}
  //                   </div>
  //                 </td>
  //                 <td className="px-4 py-3 text-gray-500 text-[12px] text-center border-b border-gray-100">
  //                   <div className="flex items-center justify-center gap-1">
  //                     <Calendar size={12} />
  //                     {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : 'N/A'}
  //                   </div>
  //                 </td>
  //                 <td className="px-4 py-3 text-end border-b border-gray-100">
  //                   <button
  //                     onClick={() => onDelete(sub.id)}
  //                     className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
  //                     title="Remove Subscriber"
  //                   >
  //                     <Trash2 size={16} />
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">No subscribers found.</td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}