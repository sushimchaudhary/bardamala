import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Loader2,
  Calendar,
  Eye,
  Facebook,
  Twitter,
  MessageCircle,
  Send,
  Layers,
} from "lucide-react";
import { contentService } from "../../services/contentServices";
import FrontendLayout from "../layout/frontendLayout";
import DynamicAdsProvider from "../../components/adds/dynamicAdsProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 
  const viewCountedRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      setLoading(true);
      try {
        const res = await contentService.getPosts();
        const allPosts = Array.isArray(res) ? res : res?.data?.data || [];

        const filtered = allPosts.filter((post: any) => {
          const currentSlug = slug?.trim().toLowerCase();
          const postCategorySlug = post.category_slug?.trim().toLowerCase();
          const postCategoryName = post.category_name?.trim().toLowerCase();
          const formattedNameAsSlug = postCategoryName?.replace(/\s+/g, "-");

          return (
            postCategorySlug === currentSlug ||
            postCategoryName === currentSlug?.replace(/-/g, " ") ||
            formattedNameAsSlug === currentSlug
          );
        });

        const sortedFiltered = filtered.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        setBlogs(sortedFiltered);

      if (sortedFiltered.length > 0) {
          const latest = sortedFiltered[0];

          if (viewCountedRef.current !== slug) {
            viewCountedRef.current = slug || null; 

            await contentService.getPostById(latest.id);
          }
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlogsByCategory();

   
    return () => {
      if (viewCountedRef.current !== slug) {
        viewCountedRef.current = null;
      }
    };
  }, [slug]);

 const shareOnSocial = (platform: string, blogSlug: string, title: string) => {
  const url = encodeURIComponent(`${window.location.origin}/blog/${blogSlug}`);
  const text = encodeURIComponent(title);

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
  };

  window.open(links[platform as keyof typeof links], "_blank");
};
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-[#1e695e]" size={40} />
      </div>
    );

  const latestBlog = blogs[0];

  return (

    <>
    <HelmetProvider>
    <FrontendLayout>

      {latestBlog && (
      <Helmet>
        <title>{latestBlog.title}</title>
        <meta property="og:title" content={latestBlog.title} />
        <meta property="og:description" content={latestBlog.description.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
        <meta property="og:image" content={latestBlog.photo} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    )}
      <div className=" py-4">
        <DynamicAdsProvider
          position="post_full_1"
          className="max-w-7xl mx-auto px-4 h-[100px] md:h-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 py-6 ">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <main className="w-full lg:w-[72%]">
            {latestBlog ? (
              <article className=" border-r border-gray-200 overflow-hidden animate-in fade-in duration-700">
                <header className="px-3">
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                    {latestBlog.title}
                  </h1>
                </header>

                <div className="p-3 ">
                  {latestBlog.photo && (
                    <div className="w-full overflow-hidden  mb-8 shadow-md">
                      <img
                        src={latestBlog.photo}
                        alt={latestBlog.title}
                        className="w-full object-cover max-h-[500px]"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={latestBlog.author_photo || "/user.png"}
                        alt={latestBlog.author_name}
                        className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover ring-1 ring-[#1e695e]/20"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                          {latestBlog.author_name}
                        </p>
                        <p className="text-[10px] text-[#1e695e] font-bold uppercase tracking-widest">
                          लेखक / स्तम्भकार
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          मिति
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                          <Calendar size={12} className="text-[#1e695e]" />
                          {new Date(latestBlog.created_at).toLocaleDateString(
                            "ne-NP",
                          )}
                        </span>
                      </div>
                      <div className="text-right border-l pl-4">
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          भ्युज
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                          <Eye size={12} className="text-[#1e695e]" />
                          {latestBlog.view_count || 0}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            shareOnSocial(
                              "facebook",
                              latestBlog.slug,
                              latestBlog.title,
                            )
                          }
                          className="p-2 bg-[#1877F2] text-white rounded hover:scale-110 transition-transform"
                        >
                          <Facebook size={16} />
                        </button>
                        <button
                          onClick={() =>
                            shareOnSocial(
                              "twitter",
                              latestBlog.slug,
                              latestBlog.title,
                            )
                          }
                          className="p-2 bg-[#1DA1F2] text-white rounded hover:scale-110 transition-transform"
                        >
                          <Twitter size={16} />
                        </button>
                        <button
                          onClick={() =>
                            shareOnSocial(
                              "whatsapp",
                              latestBlog.slug,
                              latestBlog.title,
                            )
                          }
                          className="p-2 bg-[#25D366] text-white rounded hover:scale-110 transition-transform"
                        >
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="prose prose-teal max-w-none text-gray-700 
                               prose-headings:text-[#1e695e] prose-headings:font-bold
                               prose-p:leading-relaxed prose-p:text-lg break-words"
                    dangerouslySetInnerHTML={{ __html: latestBlog.description }}
                  />

                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-bold text-gray-800">
                        प्रतिक्रिया दिनुहोस्
                      </h3>
                    </div>
                    <textarea
                      rows={4}
                      className="w-full p-4 border bg-white border-gray-100  outline-none focus:ring-2 focus:ring-[#1e695e]/10 transition-all text-sm mb-4"
                      placeholder="यहाँ आफ्नो विचार लेख्नुहोस्..."
                    />
                    <button className="bg-[#1e695e] text-white px-6 py-1.5 font-bold text-xs flex items-center gap-2 hover:bg-[#164e46] ">
                      <Send size={14} /> टिप्पणी पठाउनुहोस्
                    </button>
                  </div>
                </div>
              </article>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                <Layers className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-medium italic">
                  यस विधामा लेखहरू उपलब्ध छैनन्।
                </p>
              </div>
            )}
          </main>

          <aside className="w-full lg:w-[28%]">
            <div className="sticky top-24 space-y-4 self-start">
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Sponsored
                  </span>
                  <span className="h-px bg-gray-200 flex-1"></span>
                </div>
                <DynamicAdsProvider
                  position="post_sidebar_1"
                  className="w-full h-[250px] "
                />
              </section>

              <div className="p-6 bg-[#1e695e] text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">हाम्रो अभियान</h3>
                  <p className="text-sm text-teal-50 mb-4 font-light leading-relaxed">
                    गुणस्तरीय शिक्षा र सूचनाको पहुँच सबैमा पुर्याउन हामी सधैं
                    तत्पर छौं। हामीसँग जोडिनुहोस्।
                  </p>
                  <Link to="/register">
                    <button className="w-full py-1.5 bg-white text-[#1e695e] text-sm font-bold hover:bg-teal-50 transition-all active:scale-95 shadow-md">
                      सदस्य बन्नुहोस्
                    </button>
                  </Link>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              <section>
                <DynamicAdsProvider
                  position="post_sidebar_2"
                  className="w-full h-[250px]"
                />
              </section>

              <section>
                <DynamicAdsProvider
                  position="post_sidebar_3"
                  className="w-full h-[250px] "
                />
              </section>
            </div>
          </aside>
        </div>
      </div>

      <div className=" py-8">
        <DynamicAdsProvider
          position="post_full_2"
          className="max-w-7xl mx-auto px-4 h-[100px] md:h-[150px]"
        />
      </div>
    </FrontendLayout>
    </HelmetProvider>
    </>
  );
}
