import { Edit2, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";

interface AboutTableProps {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function AboutTable({
  data,
  onEdit,
  onDelete,
  loading,
}: AboutTableProps) {
  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-left text-sm table-fixed min-w-[700px]">
        <thead className="bg-gray-100 border-b border-gray-100">
          <tr>
            <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px] w-16">
              S.N.
            </th>
            <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px] w-32">
              Image
            </th>
            <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px]">
              Description
            </th>
            <th className="px-6 py-2 font-bold text-gray-600 uppercase text-[10px] w-20 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {loading ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-[#1e695e]" size={30} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Loading data...
                  </span>
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-2 text-gray-500 text-xs w-16">
                  {index + 1}
                </td>
                <td className="px-6 py-2 w-32">
                  <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden border border-gray-100">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt="About"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-2 ">
                  <div
                    className="max-h-12 overflow-y-auto pr-2  text-gray-600 text-xs "
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </td>
                <td className="px-6 py-2 w-28 text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-10 text-center text-gray-400 text-xs"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
