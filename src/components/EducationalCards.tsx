
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contentService } from "../services/contentServices";
import { Loader2, ChevronRight } from "lucide-react";

export default function ShikshakLayout() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await contentService.getPosts();
        let allPosts = Array.isArray(res) ? res : res?.data?.data || [];

       
        const filteredPosts = allPosts.filter(
          (post: any) => post.category_name !== "मनका कुरा" && post.category_name !== "रिपोर्ट"
        );

       
        const categoryMap: { [key: string]: any[] } = {};
        filteredPosts.forEach((post: any) => {
          const catName = post.category_name;
          if (!categoryMap[catName]) {
            categoryMap[catName] = [];
          }
          categoryMap[catName].push(post);
        });

        const uniqueCategoryOldPosts = Object.values(categoryMap).map((categoryPosts) => {
          const sortedByOldest = categoryPosts.sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
          return sortedByOldest[0];
        });

        setPosts(uniqueCategoryOldPosts.slice(0, 3));
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#213a59]" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-15">
      <div className="max-w-7xl mx-auto px-3 md:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-7">
        {posts.map((item) => (
          <div
            key={item.id}
            className="bg-white mt-12 shadow-md border border-gray-200 border-t-[4px] border-t-[#33b9d2] relative flex flex-col h-full"
          >
            {/* Category Label */}
            <div className="absolute -top-[42px] left-0 bg-[#213a59] text-white px-4 py-2 text-xs md:text-sm font-bold border-l-[8px] border-[#33b9d2] z-10">
              {item.category_name}
            </div>

            <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-gray-100">
              <Link to={`/blog/${item.slug}`}>
                <img
                  src={item.photo || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover"/>
              </Link>
            </div>

            {/* Content Section */}
            <div className="p-2 flex flex-col flex-1">
              <Link to={`/blog/${item.slug}`}>
                <h3 className="text-[16px] font-bold text-gray-900 mb-2 leading-tight hover:text-[#33b9d2] transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </Link>

              {/* Description - Line clamp for uniform cards */}
              <div
                className="text-[13px] text-gray-600 leading-relaxed italic mb-4 line-clamp-3 quill-content"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              {/* Read More Button at Bottom */}
              <div className="mt-auto border-t border-gray-100 pt-3">
                <Link
                  to={`/blog/${item.slug}`}
                  className="flex items-center gap-1 text-[#33b9d2] font-bold text-xs hover:gap-2 transition-all uppercase tracking-wider"
                >
                  पुरा पढ्नुहोस् <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .quill-content * {
          display: inline !important;
          margin: 0 !important;
          padding: 0 !important;
          font-size: inherit !important;
        }
      `}</style>
    </div>
  );
}