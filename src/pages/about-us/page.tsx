import { useEffect, useState } from "react";
import { Loader2, MessageSquare, Users } from "lucide-react";
import { contentService } from "../../services/contentServices";
import FrontendLayout from "../layout/frontendLayout";
import DynamicAdsProvider from "../../components/adds/dynamicAdsProvider";
import { Link } from "react-router-dom";

export default function AboutUsPage() {
  const [aboutData, setAboutData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAboutData = async () => {
    try {
      const response = await contentService.getAbout();
      const data = response?.data?.data || response?.data || response;
      setAboutData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load about data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <FrontendLayout>
      {/* १. Top Ad Slot */}
      <div className="bg-gray-50 py-4">
        <DynamicAdsProvider
          position="post_full_1"
          className="max-w-7xl mx-auto px-4 h-[100px] md:h-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 py-6">
        {/* यहाँ 'items-start' थपिएको छ ताकि Sidebar स्टिकी हुन सकोस् */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <main className="w-full lg:w-[72%]">
            <div className="bg-white border-r border-gray-100 overflow-hidden">
              <header className="bg-[#1e695e] p-3 text-white">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Users size={32} /> हाम्रो बारे
                </h1>
                <p className="text-teal-50 mt-2 font-light">हाम्रो यात्रा, उद्देश्य र प्रतिवद्धता</p>
              </header>

              <div className="p-2">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-[#1e695e]">
                    <Loader2 className="animate-spin mb-2" size={40} />
                    <p className="text-sm font-medium text-gray-500">जानकारी लोड हुँदैछ...</p>
                  </div>
                ) : aboutData.length > 0 ? (
                  <>
                    {aboutData.map((item) => (
                      <article key={item.id} className="animate-in fade-in duration-700 mb-12 last:mb-0">
                        {item.photo && (
                          <div className="w-full overflow-hidden rounded mb-8 shadow-md">
                            <img
                              src={item.photo}
                              alt="Shikshak Content"
                              className="w-full object-cover max-h-[500px] "
                            />
                          </div>
                        )}

                        <div className="prose prose-teal max-w-none text-gray-700 
                                     prose-headings:text-[#1e695e] prose-headings:font-bold
                                     prose-p:leading-relaxed prose-p:text-lg
                                     break-words"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </article>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-400 italic text-center py-20">जानकारी उपलब्ध छैन।</p>
                )}
              </div>
            </div>
          </main>

          <aside className="w-full lg:w-[28%]">
            <div className="sticky top-24 space-y-6 self-start">
              
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

              <div className="p-6 bg-[#1e695e]  text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">हाम्रो अभियान</h3>
                  <p className="text-sm text-teal-50 mb-4 font-light leading-relaxed">
                    गुणस्तरीय शिक्षा र सूचनाको पहुँच सबैमा पुर्‍याउन हामी सधैं तत्पर छौं। हामीसँग जोडिनुहोस्।
                  </p>
                  <Link to={"/register"}>
                  <button className="w-full py-1.5 bg-white text-[#1e695e] text-sm font-bold hover:bg-teal-50 transition-colors shadow-md">
                    सदस्य बन्नुहोस्
                  </button>
                  </Link>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded blur-2xl "></div>
              </div>

              <section>
                <DynamicAdsProvider 
                  position="post_sidebar_2" 
                  className="w-full h-[250px]  shadow-sm"
                />
              </section>

               <section>
                <DynamicAdsProvider 
                  position="post_sidebar_3" 
                  className="w-full h-[250px]  shadow-sm"
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