import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Loader2,
  Calendar,
  User,
  ArrowRight,
  
  LayoutList,
} from "lucide-react";
import { contentService } from "../../services/contentServices";
import DynamicAdsProvider from "../../components/adds/dynamicAdsProvider";
import FrontendLayout from "../layout/frontendLayout";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  photo: string | null;
  description: string;
  category_name: string;
  author_name: string;
  created_at: string;
}

export default function MankaKura(){
  const [news, setNews] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const res = await contentService.getPosts();
        const allPosts = Array.isArray(res) ? res : res?.data?.data || [];

       
        const mankaKuraNews = allPosts.filter(
          (post: any) => post.category_name === "मनका कुरा"
        );

        const sorted = [...mankaKuraNews].sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        
        setNews(sorted);
      } catch (err) {
        console.error("Error fetching all news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ne-NP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#1e695e]" size={48} />
        <p className="text-gray-500 font-medium animate-pulse">
          खबरहरू लोड हुँदैछन्...
        </p>
      </div>
    );
  }

  return (
    <>
      <FrontendLayout>
        <div className="bg-[#f4f7f6]  font-sans">
          <div className="max-w-7xl mx-auto p-4 ">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <div className="bg-white p-2 rounded shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#1e695e]/10 p-2 rounded">
                      <LayoutList size={22} className="text-[#1e695e]" />
                    </div>
                    <div>
                      <h2 className="text-sm text-gray-500 font-medium leading-none mb-1">
                        समाचार संकलन
                      </h2>
                      <p className="text-lg font-bold text-gray-800">
                        कुल{" "}
                        <span className="text-[#e44d26]">{news.length}</span>{" "}
                        सामग्रीहरू फेला परे
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block h-8 w-[1px] bg-gray-200 mx-4"></div>
                </div>

                {news.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row group"
                  >
                    {/* Image Section - Fixed Height and Width */}
                    <div className="md:w-72 h-30 md:h-45 overflow-hidden relative shrink-0 bg-gray-100">
                      <Link
                        to={`/blog/${item.slug}`}
                        className="block w-full h-full"
                      >
                        <img
                          src={item.photo || "/placeholder.jpg"}
                          alt={item.title}
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>

                      {/* Category Label (Optional: uncomment if needed) */}
                      {/* <div className="absolute top-2 left-2 bg-[#1e695e]/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        {item.category_name}
                      </div> */}
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-4 text-gray-400 text-[11px] mb-2 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} /> {formatDate(item.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={13} /> {item.author_name}
                          </span>
                        </div>

                        <Link to={`/blog/${item.slug}`}>
                          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1e695e] transition-colors line-clamp-2 leading-tight">
                            {item.title}
                          </h2>
                        </Link>

                        <div
                          className="text-gray-500 text-sm line-clamp-2 italic leading-relaxed quill-content mb-4"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>

                      <Link
                        to={`/blog/${item.slug}`}
                        className="inline-flex items-center gap-1 text-[#e44d26] font-bold text-xs hover:gap-2 transition-all"
                      >
                        थप पढ्नुहोस् <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}

                {news.length === 0 && (
                  <div className="text-center py-20 bg-white rounded border italic text-gray-400">
                    कुनै खबरहरू फेला परेनन्।
                  </div>
                )}
              </div>

              {/* RIGHT: Ads Sidebar (3 Columns) */}
              <aside className="col-span-12 lg:col-span-3 space-y-6">
                <div className="sticky top-24 space-y-8">
                  {/* Sidebar Ad 1 */}
                  <div className="bg-white p-2 rounded shadow-sm border border-gray-100">
                    <span className="text-[10px] text-gray-400 uppercase block mb-1 text-center font-bold">
                      Advertisement
                    </span>
                    <DynamicAdsProvider
                      position="sidebar"
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Sidebar Ad 2 or Social Section */}
                  <div className="bg-[#1e695e]/5 p-5 rounded-lg border border-[#1e695e]/10">
                    <h4 className="font-bold text-[#1e695e] mb-3 border-b border-[#1e695e]/20 pb-2">
                      फेसबुकमा जोडिहनुहोस्
                    </h4>
                    {/* तपाईंको फेसबुक पेजको विगेट यहाँ राख्न सक्नुहुन्छ */}
                    <div className="bg-white h-40 rounded flex items-center justify-center text-gray-400 text-sm italic">
                      Facebook Plugin Area
                    </div>
                  </div>

                  {/* Sidebar Ad 3 */}
                  <div className="bg-white p-2 rounded shadow-sm border border-gray-100">
                    <DynamicAdsProvider
                      position="sidebar-bottom"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <style>{`
        .quill-content * {
          display: inline !important;
          margin: 0 !important;
          padding: 0 !important;
          font-size: inherit !important;
          color: inherit !important;
        }
      `}</style>
        </div>
      </FrontendLayout>
    </>
  );
};


