import  { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Loader2, Calendar, User, Search, ArrowRight } from "lucide-react";
import { contentService } from "../../services/contentServices";
import FrontendLayout from "../layout/frontendLayout";

export default function SearchPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await contentService.getPosts();
        const allPosts = Array.isArray(res) ? res : res?.data?.data || [];

        const filtered = allPosts.filter((post: any) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          (post.description && post.description.toLowerCase().includes(query.toLowerCase()))
        );

        setResults(filtered);
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ne-NP", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  return (
    <FrontendLayout>
      <div className="bg-[#f8fafc] min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Header Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#1e695e]/10 p-3 rounded-full">
                <Search className="text-[#1e695e]" size={24} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  खोजिएको शब्द: <span className="text-[#e44d26]">"{query}"</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  कुल {results.length} वटा नतिजाहरू भेटिए
                </p>
              </div>
            </div>
            <Link to="/" className="text-sm font-semibold text-[#1e695e] hover:underline">
              ← गृहपृष्ठमा फर्कनुहोस्
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="animate-spin text-[#1e695e] mb-4" size={48} />
              <p className="text-gray-500 font-medium animate-pulse">खोज्दैछ, कृपया पर्खनुहोस्...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-6">
              {results.map((item) => (
                <article 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row"
                >
                  {/* Image Part */}
                  <div className="md:w-64 w-full h-48 md:h-auto shrink-0 bg-gray-50 overflow-hidden">
                    <Link to={`/blog/${item.slug}`}>
                      <img 
                        src={item.photo || "/placeholder.jpg"} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </Link>
                  </div>

                  {/* Content Part */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-4 text-gray-400 text-[11px] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-[#1e695e]" /> {formatDate(item.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={13} className="text-[#1e695e]" /> {item.author_name || "Admin"}
                        </span>
                      </div>
                      
                      <Link to={`/blog/${item.slug}`}>
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#1e695e] transition-colors line-clamp-2 leading-tight mb-3">
                          {item.title}
                        </h2>
                      </Link>

                      <div 
                        className="text-gray-500 text-sm line-clamp-2 italic mb-4"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>

                    <Link 
                      to={`/blog/${item.slug}`} 
                      className="inline-flex items-center gap-1 text-[#e44d26] font-bold text-xs uppercase tracking-wider hover:gap-2 transition-all"
                    >
                      थप पढ्नुहोस् <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="mb-4 flex justify-center text-gray-300">
                <Search size={64} />
              </div>
              <p className="text-gray-600 text-lg font-medium">माफ गर्नुहोला, तपाईंले खोज्नुभएको सामग्री फेला परेन।</p>
              <p className="text-gray-400 text-sm mt-1">अर्को कुनै शब्द प्रयोग गरेर फेरि खोज्ने प्रयास गर्नुहोस्।</p>
            </div>
          )}
        </div>
      </div>
    </FrontendLayout>
  );
}