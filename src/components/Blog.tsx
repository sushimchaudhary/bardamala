import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardsData = [
  {
    category: "विविध",
    title: "राष्ट्रिय शिक्षा नीति २०७६",
    image: "/blog1.jpg",
    description:
      "आम नेपाली नागरिक, शिक्षा क्षेत्रका विषयमा चासो राख्ने सबैको सर्वाधिक चासोको विषय बनेको राष्ट्रिय शिक्षा नीति, २०७६ जारी भएको छ।",
    listItems: [
      "बासी तथ्यांक नपढाऔं !",
      "प्राचीन चित्र र मूर्तिकलामा शिक्षक र विद्यार्थी",
    ],
    buttonLink: "/category/vividh",
    showButton: true,
  },
  {
    category: "कक्षाकोठा",
    image: "/blog2.jpg",
    listItems: [
      "बालबालिकाको बौद्धिक पोषणका निम्ति कथा",
      "अंग्रेजीमा कमजोर नतिजा: १५ कारण, ११ उपाय",
      "स्वर्ग जाने बाटो",
    ],
    buttonLink: "/category/kakshakotha",
    showButton: true,
  },
  {
    category: "हेराइ र बुझाइ",
    image: "/blog3.gif",
    listItems: [
      "सच्चा गुरु !",
      "दृष्टिकोण आफ्ना आफ्ना !",
      "गुरु बन्ने योग्यता",
    ],
    buttonLink: "/category/herai-bujhai",
    showButton: true,
  },
  {
    category: "नतिजा",
    title: "एसईईको बदलिँदो स्वरूप",
    image: "/blog4.jpg",
    description:
      "यस वर्षको एसईई परीक्षाको नतिजा र यसले पारेको प्रभावबारे विशेष विश्लेषण।",
    listItems: ["ग्रेडिङ प्रणालीको नयाँ नियम", "प्राविधिक शिक्षामा आकर्षण"],
    buttonLink: "/category/natija",
    showButton: true,
  },
  {
    category: "विचार",
    image: "/blog5.jpg",
    title: "शिक्षामा लगानी कि व्यापार?",
    description:
      "निजी र सामुदायिक विद्यालय बीचको खाडल कसरी कम गर्ने? एक गहन बहस।",
    listItems: ["शिक्षकको मनोबल", "प्रविधि मैत्री कक्षाकोठा"],
    buttonLink: "/category/bichar",
    showButton: true,
  },
  {
    category: "साहित्य",
    image: "/blog1.jpg",
    listItems: ["शिक्षकको डायरी", "बाल कविता संग्रह", "विद्यालय जीवनका सम्झना"],
    buttonLink: "/category/sahitya",
    showButton: true,
  },
];

const ContentCard = ({
  card,
  index,
}: {
  card: (typeof cardsData)[0];
  index: number;
}) => {
  return (
    <div
      className={`bg-white shadow-lg border border-gray-200 relative flex flex-col mt-12 transition-all duration-300 w-full 
    ${index === 0 ? "min-h-[530px]" : "min-h-[410px]"}`}
    >
      <div className="absolute -top-[45px] left-0 bg-[#1e695e] text-white px-5 py-2 text-lg font-bold border-l-[10px] border-[#e44d26] z-20">
        {card.category}
      </div>

      <div className="w-full h-[4px] bg-[#e44d26] relative z-10"></div>

      <div className="flex-1 flex flex-col ">
        {card.image && (
          <div className="relative w-full overflow-hidden border border-gray-300 bg-gray-100 mb-4 h-52 group">
            <img
              src={card.image}
              alt={card.category}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            <div className="absolute top-0 right-0 bg-[#e44d26] text-white text-[10px] px-2 py-0.5">
              {card.category}
            </div>
          </div>
        )}

        <div className="flex-1 px-2">
          {/* Main Title - Same as screenshot font style */}
          {card.title && (
            <h3
              className="text-[19px] font-black text-black mb-3 leading-tight hover:text-[#e44d26] cursor-pointer"
              style={{ fontFamily: "sans-serif" }}
            >
              {card.title}
            </h3>
          )}

          {/* Description */}
          {card.description && (
            <p className="text-[14px] text-gray-700 mb-4 leading-relaxed italic border-l-2 border-gray-200 pl-2">
              {card.description}
            </p>
          )}

          {/* List Items with specific border-top style */}
          <div className="flex flex-col">
            {card.listItems.map((list, idx) => (
              <div
                key={idx}
                className="border-t border-gray-200 py-4 first:border-t-0 hover:bg-gray-50 transition-colors px-1"
              >
                <h4 className="text-[16px] font-bold text-gray-800 hover:text-[#e44d26] cursor-pointer leading-snug">
                  {list}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Button - Same to same styling */}
        {card.showButton && (
          <div className="mt-auto p-2">
            <Link to={card.buttonLink} className="block">
              <button className="w-full bg-[#eeeeee] hover:bg-[#d1d5db] text-gray-800 py-2 font-bold text-[16px] transition-all border border-gray-300 rounded shadow-sm">
                अन्य विषय
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};


export default function Blog() {
 
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3); 
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2); 
      } else {
        setItemsPerPage(1);
      }
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

  return (
    <div className="bg-gray-50 lg:py-5 px-4 ">
      <div className="max-w-7xl mx-auto relative">
       
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 bg-[#1e695e] border rounded-full shadow-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-700 cursor-pointer"
        >
          <ChevronLeft size={18} className="text-white" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= cardsData.length}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 bg-[#1e695e] border rounded-full shadow-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-700 cursor-pointer"
        >
          <ChevronRight size={18} className="text-white" />
        </button>

        <div className="overflow-visible px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: direction === 1 ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-start"
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
