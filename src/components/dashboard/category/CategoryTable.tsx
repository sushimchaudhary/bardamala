import { Edit2, Trash2, Loader2, CheckCircle2, XCircle } from "lucide-react";

interface CategoryTableProps {
  categories: any[];
  onEdit: (category: any) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
  loading,
}: CategoryTableProps) {
  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        className="overflow-x-auto overflow-y-auto max-h-[450px] hide-scroll"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        <table className="w-full text-left text-sm min-w-[600px] border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-100">
              <th className="px-4 py-2 font-bold text-gray-600 uppercase text-[10px] w-12 text-center  bg-gray-100">
                S.N.
              </th>
              <th className="px-4 py-2 font-bold text-gray-600 uppercase text-[10px]  bg-gray-100">
                Name
              </th>
              <th className="px-4 py-2 font-bold text-gray-600 uppercase text-[10px]  bg-gray-100">
                Slug
              </th>
              <th className="px-4 py-2 font-bold text-gray-600 uppercase text-[10px]  bg-gray-100">
                Status
              </th>
              <th className="px-4 py-2 font-bold text-gray-600 uppercase text-[10px] text-right  bg-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center border-b">
                  <Loader2
                    className="animate-spin mx-auto text-gray-400"
                    size={24}
                  />
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-2 text-gray-500 text-center border-b border-gray-100">
                    {index + 1}.
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800 whitespace-nowrap border-b border-gray-100">
                    {cat.name}
                  </td>
                  <td className="px-4 py-2 text-gray-500 whitespace-nowrap border-b border-gray-100">
                    {cat.slug}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-100">
                    {cat.is_active ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-[11px] font-bold bg-green-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={12} /> ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-400 text-[11px] font-bold bg-red-50 px-2 py-0.5 rounded-full">
                        <XCircle size={12} /> INACTIVE
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-end border-b border-gray-100">
                    <div className="flex justify-end ">
                      <button
                        onClick={() => onEdit(cat)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(cat.id)}
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
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-500 italic border-b"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}