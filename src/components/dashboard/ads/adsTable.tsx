import { Edit2, Trash2, Loader2, Calendar } from "lucide-react";

export default function AdTable({ ads, onEdit, onDelete, loading }: any) {
  return (
    <div className="overflow-hidden">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="overflow-x-auto hide-scroll">
        <table className="w-full text-left text-sm min-w-[800px] border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-100">
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] ">
                Preview
              </th>
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] ">
                Ad Name
              </th>
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] ">
                Position
              </th>
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] ">
                Duration
              </th>
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px] ">
                Status
              </th>
              <th className="px-4 py-3 font-bold text-gray-600 uppercase text-[10px]  text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center border-b border-gray-100"
                >
                  <Loader2
                    className="animate-spin mx-auto text-gray-400"
                    size={24}
                  />
                </td>
              </tr>
            ) : ads.length > 0 ? (
              ads.map((ad: any) => (
                <tr
                  key={ad.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-1 border-b border-gray-100">
                    <div className="h-10 w-20 bg-gray-100 rounded overflow-hidden ">
                      {ad.file ? (
                        <img
                          src={ad.file}
                          className="h-full w-full object-cover"
                          alt="ad"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[8px]">
                          No File
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-1 border-b border-gray-100 font-medium text-gray-800">
                    {ad.name}
                  </td>
                  <td className="p-1 border-b border-gray-100">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {ad.position}
                    </span>
                  </td>
                  <td className="p-1 border-b border-gray-100 text-gray-500 text-[11px]">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-green-600">
                        <Calendar size={10} /> {ad.start_date}
                      </span>
                      <span className="flex items-center gap-1 text-red-400">
                        <Calendar size={10} /> {ad.end_date}
                      </span>
                    </div>
                  </td>
                  <td className="p-1 border-b border-gray-100 text-center">
                    {ad.is_active ? (
                      <span className="text-green-600 text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-red-400 text-[10px] font-bold bg-red-50 px-2 py-0.5 rounded-full">
                        INACTIVE
                      </span>
                    )}
                  </td>
                  <td className="p-1 border-b border-gray-100 text-right">
                    <div className="flex justify-end">
                      <button
                        onClick={() => onEdit(ad)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(ad.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-gray-500 italic border-b border-gray-100"
                >
                  No advertisements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
