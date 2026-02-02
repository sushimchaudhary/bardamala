import { useEffect, useMemo, useState } from "react";
import { adService } from "../../services/adServices";
import { Loader2,  Megaphone } from "lucide-react";
import FrontendLayout from "../layout/frontendLayout";

export default function AdsListingPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [, setIsFormOpen] = useState(false);
  const [, setSelectedAd] = useState<any>(null);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await adService.getAds();
      let data = Array.isArray(res) ? res : res?.data?.data || res?.data || res;
      setAds(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load ads:", err);
      setAds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const filteredAds = useMemo(() => {
    return ads.filter(ad => ad.position === 'advertisement');
  }, [ads]);

  const totalPages = Math.max(1, Math.ceil(filteredAds.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);


  const pagedAds = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAds.slice(start, start + pageSize);
  }, [filteredAds, currentPage, pageSize]);

  const openCreateForm = () => {
    setSelectedAd(null);
    setIsFormOpen(true);
  };

  const openEditForm = (ad: any) => {
    setSelectedAd(ad);
    setIsFormOpen(true);
  };
  return (
    <FrontendLayout>
      <div className="max-w-7xl mx-auto px-4 py-4 min-h-[70vh]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            
            <div className="mb-3 text-center">
              <h1 className="text-3xl font-black text-[#213a59] uppercase tracking-wider mb-2 text-start">
                हाम्रा विज्ञापनहरू
              </h1>
              <div className="flex items-center justify-center gap-2">
                <span className="h-[2px] w-8 bg-[#2db7d1]"></span>
                <p className="text-sm text-gray-500 font-medium italic">
                  तपाईँको व्यवसायलाई नयाँ उचाइमा पुर्‍याउने उत्कृष्ट अवसरहरू
                </p>
                <span className="h-[2px] w-8 bg-[#2db7d1]"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200">
            <Loader2 size={40} className="animate-spin text-[#2db7d1] mb-4" />
            <p className="text-gray-400 font-medium animate-pulse">
              Fetching visuals...
            </p>
          </div>
        ) : ads.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <Megaphone size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">No advertisements found.</p>
            <button
              onClick={openCreateForm}
              className="mt-2 text-[#2db7d1] text-sm underline underline-offset-4"
            >
              Create your first ad
            </button>
          </div>
        ) : (
          <>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pagedAds.map((ad) => (
                <div
                  key={ad.id}
                  onClick={() => openEditForm(ad)}
                  className="group relative h-72 bg-white rounded overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
                >
                  
                  <div className="absolute inset-0 w-full h-full">
                    {ad.file ? (
                      <img
                        src={ad.file}
                        alt={ad.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 italic text-sm">
                        No Preview Available
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-5 h-5 rounded font-bold text-sm transition-all ${
                        currentPage === i + 1
                          ? "bg-[#213a59] text-white shadow-lg shadow-blue-900/20"
                          : "text-gray-400 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </FrontendLayout>
  );
}
