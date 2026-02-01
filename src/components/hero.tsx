import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MankaKura from "./manka-kura";
import DynamicAdsProvider from "./adds/dynamicAdsProvider";
import { contentService } from "../services/contentServices";

export default function Hero() {
  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);
  const [allTitles, setAllTitles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await contentService.getPosts();
        const allPosts = Array.isArray(res) ? res : res?.data?.data || [];

        const filteredPosts = allPosts.filter(
          (post: any) => post.category_name !== "मनका कुरा",
        );

        const sorted = filteredPosts.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        setLatestBlogs(sorted.slice(0, 3));

        setAllTitles(sorted);
      } catch (err) {
        console.error("Error fetching hero blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) return null;

  return (
    <div className="bg-gray-50 font-sans">
      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-4 p-4">
        {/* Left Section: Main Blogs (Excluding "Manka Kura") */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          {latestBlogs.map((blog, index) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`}>
              <div
                className={`bg-white hover:text-teal-800 cursor-pointer border-gray-200 overflow-hidden group shadow-[4px_4px_10px_rgba(0,0,0,0.25)] ${
                  index > 0 ? "mt-10" : ""
                }`}
              >
                <h3
                  className={`font-bold text-2xl md:text-4xl m-4 pl-3 ${index === 1 || index === 2 ? "text-center" : ""}`}
                >
                  {blog.title}
                </h3>

                <div className="overflow-hidden aspect-video md:aspect-auto">
                  <img
                    src={blog.photo || "/placeholder.jpg"}
                    className="w-full h-full object-cover"
                    alt={blog.title}
                  />
                </div>
              </div>
            </Link>
          ))}

          {latestBlogs.length === 0 && (
            <div className="text-center py-10">कुनै समाचार फेला परेनन्।</div>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <div className="top-24 space-y-6">
            <section>
              <div className="bg-[#1e695e] text-white p-2.5 font-bold text-center shadow-md">
                शिक्षा खबर
              </div>
              <div className="bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.25),_-4px_4px_10px_rgba(0,0,0,0.25)] max-h-[600px] overflow-y-auto custom-scrollbar">
                <div className="flex flex-col">
                  {allTitles.length > 0 ? (
                    allTitles
                      .slice(0, 12) 
                      .map((item) => (
                        <Link
                          key={item.id}
                          to={`/blog/${item.slug}`}
                          className="block group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-[#1e695e] leading-snug line-clamp-2">
                              {item.title}
                            </p>
                          </div>
                        </Link>
                      ))
                  ) : (
                    <p className="p-4 text-center text-gray-500 text-xs italic">
                      खबरहरू लोड हुँदैछन्...
                    </p>
                  )}
                </div>

                <Link to="/all-news">
                  <button className="w-full text-xs text-teal-700 font-bold hover:underline py-3 bg-gray-50">
                    सबै खबर हेर्नुहोस् »
                  </button>
                </Link>
              </div>
            </section>

 <section className="bg-white p-1 shadow-[4px_4px_10px_rgba(0,0,0,0.1)]">
              <DynamicAdsProvider
                position="homepage_sidebar_1"
                className="h-[250px]  w-full"
              />
            </section>

            <MankaKura />

            <section className="bg-white p-1 shadow-[4px_4px_10px_rgba(0,0,0,0.1)]">
              <DynamicAdsProvider
                position="homepage_sidebar_2"
                className="h-[250px] w-full"
              />
            </section>

            <section className="bg-white p-1 shadow-[4px_4px_10px_rgba(0,0,0,0.1)]">
              <DynamicAdsProvider
                position="homepage_sidebar_3"
                className="h-[250px] w-full"
              />
            </section>
          </div>
        </aside>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e695e; }
      `}</style>
    </div>
  );
}
