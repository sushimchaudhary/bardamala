import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { contentService } from "../../services/contentServices";
import FrontendLayout from "../layout/frontendLayout";

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
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <main className="w-full lg:w-[72%]">
            <div className="bg-white border border-gray-50 rounded p-2 md:p-2 shadow-sm min-h-[400px]">
              <header className="mb-8 border-b border-gray-50 pb-5">
                <h1 className="text-3xl font-extrabold text-gray-800">हाम्रो बारेमा</h1>
              </header>

              <div className="space-y-16">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-[#1e695e]">
                    <Loader2 className="animate-spin mb-2" size={40} />
                    <p className="text-sm font-medium text-gray-500">जानकारी लोड हुँदैछ...</p>
                  </div>
                ) : aboutData.length > 0 ? (
                  aboutData.map((item) => (
                    <article key={item.id} className="animate-in fade-in duration-700">
                      <div className="flex flex-col gap-8">
                        {item.photo && (
                          <div className="w-full overflow-hidden rounded">
                            <img
                              src={item.photo}
                              alt="Shikshak Content"
                              className="w-full object-cover max-h-[500px]"
                            />
                          </div>
                        )}

                        <div className="w-full overflow-hidden">
                          <div
                            className="prose prose-teal max-w-none text-gray-700 
                               prose-headings:text-[#1e695e] prose-headings:font-bold
                               prose-p:leading-relaxed prose-p:text-lg
                               break-words"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                          />
                        </div>
                      </div>
                      <div className="mt-16 h-px bg-gray-100 w-full"></div>
                    </article>
                  ))
                ) : (
                  <p className="text-gray-400 italic text-center py-20">जानकारी उपलब्ध छैन।</p>
                )}
              </div>
            </div>
          </main>

          {/* RIGHT SIDE: Sidebar/Ads Section */}
          <aside className="w-full lg:w-[28%]">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px bg-gray-200 flex-1"></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Advertisement</span>
                <span className="h-px bg-gray-200 flex-1"></span>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <img
                  src="/ads.jpg"
                  alt="Advertisement"
                  className="w-full h-auto"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x600?text=Place+Your+Ad+Here")}
                />
              </div>

              <div className="p-6 bg-[#1e695e] rounded-2xl text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2">हाम्रो अभियानमा जोडिनुहोस्</h3>
                <p className="text-sm text-teal-50 mb-4 font-light">गुणस्तरीय शिक्षाको लागि हामी सधैं तत्पर छौं।</p>
                <button className="w-full py-2 bg-white text-[#1e695e] rounded-lg text-sm font-bold hover:bg-teal-50">सदस्य बन्नुहोस्</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </FrontendLayout>
  );
}