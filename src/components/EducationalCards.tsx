import { Link } from "react-router-dom";

export default function ShikshakLayout() {
  const educationalData = [
    {
      id: 1,
      category: "शैक्षिक व्यक्तित्व",
      image: "/e1.jpg",
      title: "स्कूललाई उत्कृष्ट बनाउने खुबी",
      link: "/educational-personality/sher-bahadur",
      description:
        "विद्यार्थीको अनुशासन, व्यवहार र लगनशीलताप्रति झम्सी चनाखो रहन्छन्। कुनै विद्यार्थीले पढाइमा ध्यान नदिएमा उनी अभिभावकलाई बोलाएर सम्झाउँछन्।",
      isQuote: true,
    },
    {
      id: 2,
      category: "शैक्षिक डाटा",
      image: "/e2.jpg",
      title: "सामुदायिक विद्यालय: पुस्तकालयका नाउँमा बजेट लूट !",
      link: "/educational-data/budget-loot",
      description:
        "अधिकांश विद्यालयले चाहिँ पुस्तक बिक्रेतासँगको मिलेमतोमा कामै नलाग्ने केही 'देखाउने' किताब किनेर बाँकी पैसा हिनामिना गरेका छन्।",
      isQuote: false,
    },
    {
      id: 3,
      category: "फुर्सद",
      image: null,
      title: "सामान्य ज्ञान",
      link: "/quiz/general-knowledge",
      description: "हाम्रो प्रश्नोत्तरी खेल्नुहोस्।",
      isQuiz: true,
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 md:p-4 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-7 md:gap-3">
        {educationalData.map((item) => (
          <div
            key={item.id}
            className="bg-white mt-10 shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-gray-200 border-t-[4px] border-t-[#e44d26] relative flex flex-col"
          >
            <div className="absolute -top-[45px] left-0 bg-[#1e695e] text-white px-3 py-2 text-md font-bold border-l-10 border-[#e44d26]">
              {item.category}
            </div>

            <div className="p-2 pt-3  h-auto flex flex-col">
              {!item.isQuiz ? (
                <>
                  <div className="flex mb-4">
                    {item.image && (
                      <Link to={item.link} className="w-full">
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`object-cover ${item.isQuote ? "w-auto h-auto" : "w-full h-auto"} hover:opacity-90 transition-opacity`}
                        />
                      </Link>
                    )}
                  </div>

                  {/* Title with dynamic link */}
                  <Link to={item.link}>
                    <h3 className="text-lg font-bold text-black mb-3 leading-tight hover:text-[#1e695e] transition-colors">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-[14px] text-gray-800 leading-normal">
                    {item.description}
                  </p>
                </>
              ) : (
                <div className="p-2 pt-2">
                  <Link to={item.link}>
                    <h3 className="text-2xl font-bold text-black mb-10 hover:text-[#1e695e] transition-colors">
                      {item.title}
                    </h3>
                  </Link>

                  {/* Quiz Button Link */}
                  <Link to={item.link}>
                    <div className="bg-[#e44d26] text-white text-center py-2 px-4 cursor-pointer hover:bg-[#c93a1d] transition-colors font-medium text-lg">
                      {item.description}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
