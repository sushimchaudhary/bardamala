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
  
  ArrowLeft,
} from "lucide-react";
import { contentService } from "../../services/contentServices";
import FrontendLayout from "../layout/frontendLayout";
import DynamicAdsProvider from "../../components/adds/dynamicAdsProvider";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const viewCountedRef = useRef<string | null>(null);

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
    
    if (platform === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
    if (platform === "whatsapp") window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin text-[#1e695e]" size={40} />
    </div>
  );

  if (!post) return <div className="p-20 text-center font-bold">सामग्री भेटिएन।</div>;

  return (
    <FrontendLayout>
      
      <div className=" py-4">
        <DynamicAdsProvider
          position="post_full_1"
          className="max-w-7xl mx-auto px-4 h-[100px] md:h-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 py-6 ">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content Area */}
          <main className="w-full lg:w-[72%]">
            <article className=" border-r border-gray-200 overflow-hidden animate-in fade-in duration-700">
              <header className="px-3">
                <Link to="/" className="inline-flex items-center gap-2 text-[#1e695e] mb-4 text-xs font-bold hover:underline">
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

                {/* Meta Information */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author_photo || "/user.png"}
                      alt={post.author_name}
                      className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover ring-1 ring-[#1e695e]/20"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">
                        {post.author_name || "सम्पादक"}
                      </p>
                      <p className="text-[10px] text-[#1e695e] font-bold uppercase tracking-widest">
                        लेखक / स्तम्भकार
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">मिति</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-gray-700 whitespace-nowrap">
                        <Calendar size={12} className="text-[#1e695e]" />
                        {new Date(post.created_at).toLocaleDateString("ne-NP")}
                      </span>
                    </div>
                    <div className="text-right border-l pl-4">
                      <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">भ्युज</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-gray-700 whitespace-nowrap">
                        <Eye size={12} className="text-[#1e695e]" />
                        {post.view_count || 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 ml-2">
                      <button onClick={() => shareOnSocial("facebook")} className="p-2 bg-[#1877F2] text-white rounded hover:scale-110 transition-transform cursor-pointer">
                        <Facebook size={14} />
                      </button>
                      <button onClick={() => shareOnSocial("twitter")} className="p-2 bg-[#1DA1F2] text-white rounded hover:scale-110 transition-transform cursor-pointer">
                        <Twitter size={14} />
                      </button>
                      <button onClick={() => shareOnSocial("whatsapp")} className="p-2 bg-[#25D366] text-white rounded hover:scale-110 transition-transform cursor-pointer">
                        <MessageCircle size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div 
                  className="prose prose-teal max-w-none text-gray-700 
                             prose-headings:text-[#1e695e] prose-headings:font-bold
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
                    className="w-full p-4 border bg-white border-gray-100 outline-none focus:ring-2 focus:ring-[#1e695e]/10 transition-all text-sm mb-4"
                    placeholder="यहाँ आफ्नो विचार लेख्नुहोस्..."
                  />
                  <button className="bg-[#1e695e] text-white px-6 py-2 font-bold text-xs flex items-center gap-2 hover:bg-[#164e46] transition-colors">
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
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sponsored</span>
                  <span className="h-px bg-gray-200 flex-1"></span>
                </div>
                <DynamicAdsProvider
                  position="post_sidebar_1"
                  className="w-full h-[250px]"
                />
              </section>

              {/* Mission Card */}
              <div className="p-6 bg-[#1e695e] text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">हाम्रो अभियान</h3>
                  <p className="text-sm text-teal-50 mb-4 font-light leading-relaxed">
                    गुणस्तरीय शिक्षा र सूचनाको पहुँच सबैमा पुर्याउन हामी सधैं तत्पर छौं। हामीसँग जोडिनुहोस्।
                  </p>
                  <Link to="/register">
                    <button className="w-full py-2 bg-white text-[#1e695e] text-sm font-bold hover:bg-teal-50 transition-all active:scale-95 shadow-md">
                      सदस्य बन्नुहोस्
                    </button>
                  </Link>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
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
  );
}