import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { contentService } from "../services/contentServices";

export default function FooterBlog() {
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await contentService.getPosts();
        let allPosts = Array.isArray(res) ? res : res?.data?.data || [];

        // १. "मनका कुरा" र "रिपोर्ट" लाई हटाउने (Exclusion)
        const filtered = allPosts.filter(
          (p: any) =>
            p.category_name !== "मनका कुरा" && p.category_name !== "रिपोर्ट",
        );

        // २. लेटेस्ट र मिडिलको बीचको डेटा तान्ने (सुरुका ३ वटा छोडेर)
        const middlePosts = filtered.slice(3, 20);

        const categoriesMap: any = {};

        middlePosts.forEach((post: any) => {
          const catName = post.category_name || "विविध";
          const catId = post.category;

          if (!categoriesMap[catName]) {
            categoriesMap[catName] = {
              title: catName,
              categorySlug: catId,
              mainImage: post.photo,
              mainSlug: post.slug,
              links: [{ title: post.title, slug: post.slug }],
            };
          } else {
            // एउटै क्याटेगोरी भित्र अधिकतम ३ वटा सम्म लिङ्क राख्ने
            if (categoriesMap[catName].links.length < 3) {
              categoriesMap[catName].links.push({
                title: post.title,
                slug: post.slug,
              });
            }
          }
        });

        // ३. ठ्याक्कै ३ वटा क्याटेगोरी कार्डहरू मात्र सेट गर्ने
        const finalThreeCategories = Object.values(categoriesMap).slice(0, 3);
        setCategoriesData(finalThreeCategories);
      } catch (err) {
        console.error("Error fetching middle posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#213a59]" size={32} />
      </div>
    );

  return (
    <div className="bg-gray-50 p-4 md:p-4">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesData.map((cat, index) => (
          <div key={index} className="relative flex flex-col w-full mt-7">
          
            <div className="absolute -top-[45px] left-0 bg-[#213a59] text-white px-5 py-2 text-lg font-bold border-l-[10px] border-[#33b9d2] z-20 shadow-md">
              {cat.title}
            </div>

            <div className="bg-white shadow-md border border-gray-200 flex flex-col h-full transition-all hover:shadow-xl group/card">
              <div className="h-[4px] bg-[#33b9d2] w-full"></div>

              <div className="overflow-hidden aspect-video border-b border-gray-100 bg-gray-50">
                <Link to={`/blog/${cat.mainSlug}`}>
                  <img
                    src={cat.mainImage || "/placeholder.jpg"}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* List of links within that category */}
              <div className="flex-1 flex flex-col">
                {cat.links.map((link: any, i: number) => (
                  <Link
                    to={`/blog/${link.slug}`}
                    key={i}
                    className="border-t border-gray-50 px-5 py-3 hover:bg-gray-50 group transition-all"
                  >
                    <span className="hover:text-[#33b9d2] text-gray-700 text-[16px] font-bold group-hover:text-[#213a59] transition-colors leading-tight block line-clamp-2">
                      {link.title}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="p-2 mt-auto border-t border-gray-50">
                <Link to={`/category-list/${cat.categorySlug}`}>
                  <button className="w-full bg-[#eeeeee] hover:bg-[#213a59] hover:text-white text-gray-800 py-2 font-bold text-[16px] transition-all border border-gray-300 rounded shadow-sm cursor-pointer">
                    अन्य विषय
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
