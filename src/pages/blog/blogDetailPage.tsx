import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Loader2,
  Calendar,
  Eye,
  Facebook,
  MessageCircle,
  Send,
  ArrowLeft,
} from "lucide-react";
import { contentService } from "../../services/contentServices";
import FrontendLayout from "../layout/frontendLayout";
import DynamicAdsProvider from "../../components/adds/dynamicAdsProvider";
import NepaliDate from "nepali-date-converter";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const viewCountedRef = useRef<string | null>(null);

  const toNepaliNumber = (num: number | string) => {
    const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num
      .toString()
      .split("")
      .map((digit) =>
        /[0-9]/.test(digit) ? nepaliDigits[parseInt(digit)] : digit,
      )
      .join("");
  };

  const formatNepaliDate = (dateString: string) => {
    const date = new Date(dateString);
    const nepaliDate = new NepaliDate(date).format("MMMM DD, YYYY", "np");
    return nepaliDate;
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await contentService.getPosts();
        const allPosts = Array.isArray(res) ? res : res?.data?.data || [];

        const foundPost = allPosts.find((p: any) => p.slug === slug);

        if (foundPost) {
          if (viewCountedRef.current !== slug) {
            viewCountedRef.current = slug || null;

            const detailData = await contentService.getPostById(foundPost.id);
            setPost(detailData);
          } else {
            setPost(foundPost);
          }
        }
      } catch (err) {
        console.error("Error fetching detail:", err);

        viewCountedRef.current = null;
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchDetail();

    return () => {
      if (viewCountedRef.current !== slug) {
        viewCountedRef.current = null;
      }
    };
  }, [slug]);

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";
    const message = encodeURIComponent(title + " " + url);

    if (platform === "facebook")
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
      );
    if (platform === "twitter")
      window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
    if (platform === "whatsapp")
      window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-[#2db7d1]" size={40} />
      </div>
    );

  if (!post)
    return <div className="p-20 text-center font-bold">सामग्री भेटिएन।</div>;

  const XIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );

  return (
    <>
      <FrontendLayout>
        <div className=" py-4">
          <DynamicAdsProvider
            position="post_full_1"
            className="max-w-7xl mx-auto px-4 h-[100px] md:h-[150px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-2 py-6 ">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <main className="w-full lg:w-[72%]">
              <article className=" border-r border-gray-200 overflow-hidden animate-in fade-in duration-700">
                <header className="px-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[#2db7d1] mb-4 text-xs font-bold hover:underline"
                  >
                    <ArrowLeft size={14} /> मुख्य पृष्ठमा जानुहोस्
                  </Link>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-900">
                    {post.title}
                  </h1>
                </header>

                <div className="p-3">
                  {post.photo && (
                    <div className="w-full overflow-hidden mb-8 shadow-md">
                      <img
                        src={post.photo}
                        alt={post.title}
                        className="w-full object-cover max-h-[500px]"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author_photo || "/user.png"}
                        alt={post.author_name}
                        className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover ring-1 ring-[#2db7d1]/20"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                          {post.author_name || "सम्पादक"}
                        </p>
                        <p className="text-[10px] text-[#2db7d1] font-bold uppercase tracking-widest">
                          लेखक / स्तम्भकार
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          मिति
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-700 whitespace-nowrap">
                          <Calendar size={12} className="text-[#2db7d1]" />
                          {formatNepaliDate(
                            new Date(post.created_at).toLocaleDateString(
                              "ne-NP",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            ),
                          )}
                        </span>
                      </div>

                      <div className="text-right border-l pl-4 border-gray-100">
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          भ्युज
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-700 whitespace-nowrap">
                          <Eye size={12} className="text-[#2db7d1]" />
                          {toNepaliNumber(post.view_count || 0)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 ml-2">
                        <button
                          onClick={() => shareOnSocial("facebook")}
                          className="p-2 bg-[#1877F2] text-white rounded hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Facebook size={14} />
                        </button>
                        <button
                          onClick={() => shareOnSocial("twitter")}
                          className="p-2 bg-[#1DA1F2] text-white rounded hover:scale-110 transition-transform cursor-pointer"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => shareOnSocial("whatsapp")}
                          className="p-2 bg-[#25D366] text-white rounded hover:scale-110 transition-transform cursor-pointer"
                        >
                          <MessageCircle size={14} />
                        </button>
                      </div>
                    </div>

                    {/* <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          मिति
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-700 whitespace-nowrap">
                          <Calendar size={12} className="text-[#2db7d1]" />
                          {new Date(post.created_at).toLocaleDateString(
                            "ne-NP",
                          )}
                        </span>
                      </div>
                      <div className="text-right border-l pl-4">
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          भ्युज
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-gray-700 whitespace-nowrap">
                          <Eye size={12} className="text-[#2db7d1]" />
                          {post.view_count || 0}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 ml-2">
                        <button
                          onClick={() => shareOnSocial("facebook")}
                          className="p-2 bg-[#1877F2] text-white rounded hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Facebook size={14} />
                        </button>
                        <button
                          onClick={() => shareOnSocial("twitter")}
                          className="p-2 bg-[#1DA1F2] text-white rounded hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Twitter size={14} />
                        </button>
                        <button
                          onClick={() => shareOnSocial("whatsapp")}
                          className="p-2 bg-[#25D366] text-white rounded hover:scale-110 transition-transform cursor-pointer"
                        >
                          <MessageCircle size={14} />
                        </button>
                      </div>
                    </div> */}
                  </div>

                  {/* Content Body */}
                  <div
                    className="prose prose-teal max-w-none text-gray-700 
                             prose-headings:text-[#2db7d1] prose-headings:font-bold
                             prose-p:leading-relaxed prose-p:text-lg break-words"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />

                  {/* Feedback Section */}
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                      तपाईंको प्रतिक्रिया दिनुहोस्
                    </h3>
                    <textarea
                      rows={4}
                      className="w-full p-4 border bg-white border-gray-100 outline-none focus:ring-1 focus:ring-[#213a59] transition-all text-sm mb-4"
                      placeholder="यहाँ आफ्नो विचार लेख्नुहोस्..."
                    />
                    <button className="bg-[#213a59] text-white px-6 py-2 font-bold text-xs flex items-center gap-2 hover:bg-[#164e46] transition-colors">
                      <Send size={14} /> टिप्पणी पठाउनुहोस्
                    </button>
                  </div>
                </div>
              </article>
            </main>

            {/* Sidebar Area */}
            <aside className="w-full lg:w-[28%]">
              <div className="sticky top-24 space-y-4 self-start">
                {/* Ad Slot 1 */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Sponsored
                    </span>
                    <span className="h-px bg-gray-200 flex-1"></span>
                  </div>
                  <DynamicAdsProvider
                    position="post_sidebar_1"
                    className="w-full h-[250px]"
                  />
                </section>

                <div className="p-6 bg-[#49c0d7] text-white shadow-lg relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2 text-white">
                      हाम्रो अभियान
                    </h3>
                    <p className="text-sm text-gray-100 mb-4 font-light leading-relaxed">
                      सही सूचना र निष्पक्ष समाचारका लागि हामी सधैं क्रियाशील
                      छौं।
                    </p>
                    <Link to="/contact">
                      <button className="w-full py-1.5 bg-white text-[#213a59] text-sm font-bold hover:bg-gray-100 transition-colors shadow-md">
                        हामीलाई लेख्नुहोस्
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Ad Slot 2 */}
                <section>
                  <DynamicAdsProvider
                    position="post_sidebar_2"
                    className="w-full h-[250px]"
                  />
                </section>

                {/* Ad Slot 3 */}
                <section>
                  <DynamicAdsProvider
                    position="post_sidebar_3"
                    className="w-full h-[250px]"
                  />
                </section>
              </div>
            </aside>
          </div>
        </div>

        <div className="bg-gray-50 py-8">
          <DynamicAdsProvider
            position="post_full_2"
            className="max-w-7xl mx-auto px-4 h-[100px] md:h-[150px]"
          />
        </div>
      </FrontendLayout>
    </>
  );
}
