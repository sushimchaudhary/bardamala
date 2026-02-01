import { Edit2, Trash2, Image as ImageIcon, Loader2, Eye, User, Layers, Calendar, Link } from "lucide-react";

interface BlogTableProps {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function BlogTable({ data, onEdit, onDelete, loading }: BlogTableProps) {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-left text-sm table-fixed min-w-[1000px]">
        <thead className="bg-gray-100 border-b border-gray-100">
          <tr>
            <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] w-12">S.N.</th>
            <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] w-20">Image</th>
            <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] w-50">Title & Slug</th>
            <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] w-50">Category & Author</th>
            <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] w-32">Date</th>
            <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] w-24 text-center">Stats</th>
            <th className="px-3 py-2 font-bold text-gray-600 uppercase text-[10px] text-end w-28">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {loading ? (
            <tr>
              <td colSpan={7} className="px-2 py-12 text-center">
                <Loader2 className="animate-spin text-[#1e695e] mx-auto" size={30} />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors text-xs text-gray-600">
                <td className=" p-1">{index + 1}</td>
                
                
                <td className=" p-1">
                  <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden ">
                    {item.photo ? (
                      <img src={item.photo} className="h-full w-full object-cover" alt="post" />
                    ) : (
                      <ImageIcon size={16} className="m-auto mt-2 text-gray-300"/>
                    )}
                  </div>
                </td>

               
                <td className=" p-1">
                  <p className="font-bold text-gray-800 line-clamp-1">{item.title}</p>
                  <div className="flex items-center gap-1 text-[9px] text-blue-500 mt-1 lowercase font-medium">
                    <Link size={10} /> {item.slug}
                  </div>
                </td>

               
                <td className=" p-1">
                  <div className="flex items-center gap-1 text-gray-700 font-medium">
                    <Layers size={10} className="text-[#1e695e]" /> {item.category_name || "Uncategorized"}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 uppercase">
                    <User size={10} /> {item.author_name}
                  </div>
                </td>

                <td className=" p-1 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={10} /> {formatDate(item.created_at)}
                  </div>
                </td>

               
                <td className=" p-1 text-center">
                   <span className="inline-flex items-center justify-center gap-1 bg-blue-50 px-2 py-1 rounded text-blue-600 font-bold">
                     <Eye size={12} /> {item.view_count || 0}
                   </span>
                </td>

                <td className=" p-1 text-end">
                  <div className="flex justify-end">
                    <button 
                      onClick={() => onEdit(item)} 
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                      title="Edit Post"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)} 
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={7} className="px-2 py-10 text-center text-gray-500 italic">No posts found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}