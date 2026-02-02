import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contentService } from "../services/contentServices";

const ContentCard = ({ card }: { card: any; index: number }) => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 relative flex flex-col mt-10 transition-all duration-300 w-full">
      <div className="absolute -top-[45px] left-0 bg-[#213a59] text-white px-5 py-2 text-lg font-bold border-l-[10px] border-[#33b9d2] z-20">
        {card.category}
      </div>

      <div className="w-full h-[4px] bg-[#33b9d2] relative z-10"></div>

      <div className="flex-1 flex flex-col">
        {card.image && (
          <div className="relative w-full overflow-hidden border border-gray-300 bg-gray-100 mb-4 h-52 group">
            <Link to={`/blog/${card.slug}`}>
              <img
                src={card.image}
                alt={card.category}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </Link>
          </div>
        )}

        <div className="px-2 flex flex-col flex-1">
          {card.title && (
            <Link to={`/blog/${card.slug}`}>
              <h3
                className="text-[19px] font-bold text-black mb-3 leading-tight hover:text-[#33b9d2] cursor-pointer transition-colors"
                style={{ fontFamily: "sans-serif" }}
              >
                {card.title}
              </h3>
            </Link>
          )}

          {card.description && (
            <div className="text-[14px] text-gray-700 mb-4 leading-relaxed italic border-gray-200">
              <div
                className="line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: card.description,
                }}
              />
            </div>
          )}
        </div>

        <div className="mt-auto p-2">
          <Link to={`/category-list/${card.categorySlug}`} className="block">
            <button className="w-full bg-[#eeeeee] hover:bg-[#213a59] hover:text-white text-gray-800 py-2 font-bold text-[16px] transition-all border border-gray-300 rounded shadow-sm cursor-pointer">
              अन्य विषय
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await contentService.getPosts();
        const allPosts = Array.isArray(res) ? res : res?.data?.data || [];

        const filtered = allPosts.filter(
          (p: any) =>
            p.category_name !== "मनका कुरा" && p.category_name !== "रिपोर्ट",
        );

        const midToOldPosts = filtered.slice(6);

        const categoriesMap: any = {};
        midToOldPosts.forEach((post: any) => {
          const catName = post.category_name;
          const catId = post.category;

          const uniqueKey = catName + "_" + post.id;

          if (!categoriesMap[uniqueKey]) {
            categoriesMap[uniqueKey] = {
              category: catName,
              categorySlug: catId,
              title: post.title,
              image: post.photo,
              slug: post.slug,
              description: post.description,
              listItems: [],
            };
          }
        });

        const finalData = Object.values(categoriesMap);
        setCardsData(finalData);

        setItemsPerPage(3);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // after 2 day later
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await contentService.getPosts();
  //       const allPosts = Array.isArray(res) ? res : res?.data?.data || [];

  //       // १. फिल्टर: नचाहिने क्याटेगोरी हटाउने
  //       const filtered = allPosts.filter(
  //         (p: any) => p.category_name !== "मनका कुरा" && p.category_name !== "रिपोर्ट"
  //       );

  //       // २. २ दिन (४८ घण्टा) अघिको समय गणना गर्ने
  //       const twoDaysAgo = new Date();
  //       twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  //       // ३. २ दिन पुरानो र ६ वटा लेटेस्ट पछि को डेटा फिल्टर गर्ने
  //       const midToOldPosts = filtered.filter((post: any) => {
  //         const postDate = new Date(post.created_at);
  //         return postDate <= twoDaysAgo; // २ दिन वा त्यो भन्दा पुरानो मात्र
  //       }).slice(0, 20); // धेरै डेटाबाट छान्नको लागि २० वटा सम्म तान्ने

  //       const categoriesMap: any = {};

  //       midToOldPosts.forEach((post: any) => {
  //         const catName = post.category_name;
  //         const catId = post.category;

  //         // यहाँ Unique Key मा catName मात्र राख्दा फरक-फरक क्याटेगोरीका कार्ड मात्र बन्छन्
  //         if (!categoriesMap[catName]) {
  //           categoriesMap[catName] = {
  //             category: catName,
  //             categorySlug: catId,
  //             title: post.title,
  //             image: post.photo,
  //             slug: post.slug,
  //             description: post.description,
  //             listItems: [],
  //           };
  //         }
  //       });

  //       // ४. अन्तिम डेटा सेट गर्ने
  //       const finalData = Object.values(categoriesMap);
  //       setCardsData(finalData);

  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < cardsData.length) {
      setDirection(1);
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleCards = cardsData.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  if (loading)
    return (
      <div className="h-40 flex items-center justify-center font-bold text-[#213a59]">
        लोडिङ हुँदैछ...
      </div>
    );

  return (
    <div className="bg-gray-50 lg:py-10 px-4">
      <div className="max-w-7xl mx-auto relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 bg-[#213a59] rounded-full shadow-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors p-1"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= cardsData.length}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 bg-[#213a59] rounded-full shadow-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors p-1"
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        <div className="overflow-hidden px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: direction === 1 ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
            >
              {visibleCards.map((item, index) => (
                <ContentCard
                  key={`${currentIndex}-${index}`}
                  card={item}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
