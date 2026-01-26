
export default function AloPaloBlog() {
  const categories = [
    {
      title: "आलोपालो",
      headerBg: "bg-[#2D6A4F]",
      image: "/blog2.jpg", 
      links: ["शिक्षक र क्रान्ति", "शिक्षक-गीता", "लोककथा: नारद बुद्धिले बाँचे"],
    },
    {
      title: "समाचार",
      headerBg: "bg-[#2D6A4F]",
      image: "/blog2.jpg",
      links: [
        "शिक्षक मासिक पुरस्कृत",
        "महानगरले एक वर्ष नपुग्दै हटायो स्वयंसेवक शिक्षक",
        "शिक्षक मासिकलाई पुरस्कार र सम्मान",
      ],
    },
    {
      title: "विश्लेषण",
      headerBg: "bg-[#2D6A4F]",
      image: "/blog1.jpg",
      links: [
        "यसकारण पढाइनुपर्छ सामाजिक शिक्षा !",
        "शिक्षा, शिक्षक र राजनीति",
        "शिक्षा: कहिल्यै निःशुल्क थिएन, हुँदैन !",
      ],
    },
  ];

  return (
<div className="bg-gray-50  p-4 md:p-4 ">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
    {categories.map((cat, index) => (
      <div key={index} className="relative flex flex-col w-full mt-7">
        
        <div className="absolute -top-[45px] left-0 bg-[#1e695e] text-white px-5 py-2 text-lg font-bold border-l-[10px] border-[#e44d26] z-20 whitespace-nowrap">
          {cat.title}
        </div>

        <div className="bg-white shadow-md border border-gray-200 flex flex-col h-full transition-all hover:shadow-xl">
          
          
          <div className="h-[4px] bg-[#e44d26] w-full"></div>

          <div className="">
            <div className="border border-gray-200 overflow-hidden shadow-sm aspect-video">
              <img 
                src={cat.image} 
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {cat.links.map((link, i) => (
              <div 
                key={i} 
                className="border-t border-gray-100 px-5 py-4 hover:bg-gray-50 cursor-pointer group transition-all"
              >
                <span className="text-gray-800 text-[16px] font-bold group-hover:text-[#1e695e] transition-colors leading-tight block">
                  {link}
                </span>
              </div>
            ))}
          </div>

          
          <div className="p-2 mt-auto">
              <button className="w-full bg-[#eeeeee] hover:bg-[#d1d5db] text-gray-800 py-2 font-bold text-[16px] transition-all border border-gray-300 rounded shadow-sm">
              अन्य विषय
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};
