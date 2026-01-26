"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Report() {
  const [activeSlide, setActiveSlide] = useState(0);

  const reportImages = [
    "/kholapari.gif",
    "/report2.gif",
    "/report3.gif",
    "/report4.jpg",
    "/report5.jpg",
    "/report6.jpg",
    "/report7.jpg",
  ];

  const reportNews = [
    "स्कूल छ खोलापारि, छैन खोलामा पुल !",
    "उत्कृष्ट शिक्षकलाई आमाहरूको उपहार !",
    "विद्यालयका सटर-कबल खाली नगर्न जबर्जस्ती",
    "बोझिलो विषयवस्तुको भार पट्यारलाग्दो किताब",
    "बहुभाषिक महानगरमा नेवार भाषाको पठन-पाठन",
    "पाठ्यक्रमले मात्रै धानेन !",
    "साना विद्यालय सिद्ध्याउने योजनामा शिक्षा मन्त्रालय",
    "पाठ्यक्रमले मात्रै धानेन !",
    "साना विद्यालय सिद्ध्याउने योजनामा शिक्षा मन्त्रालय",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % reportImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reportImages.length]);

  return (
    <div className="bg-gray-50 w-full font-sans">
  <div className="max-w-7xl mx-auto p-4">
    
    <div className="mb-2">
      <span className="bg-[#1e695e] text-white px-4 py-2 font-bold text-md border-l-10 border-[#e44d26]">
        रिपोर्ट
      </span>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-9 border-t-2 border-gray-200">
      <div className="lg:col-span-6 relative h-[350px] lg:h-auto overflow-hidden border-x border-gray-200 bg-gray-200">
        {reportImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Report ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
          {reportImages.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-4 ${
                i === activeSlide ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-3 bg-white border-l border-gray-200 overflow-y-auto h-[400px]">
        {reportNews.map((news, index) => (
          <Link
            to="/#"
            key={index}
            className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 group"
          >
            <span className="text-[15px] font-medium text-gray-800 group-hover:text-[#1e695e]">
              {news}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1e695e]" />
          </Link>
        ))}
      </div>
    </div>

  </div>
</div>
  );
}
