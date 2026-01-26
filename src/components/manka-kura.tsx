import { Link } from "react-router-dom";

export default function MankaKura() {
  const newsItems = [
    {
      title: "बालविकास कार्यक्रमको प्रभावकारिताका लागि अभिभावक शिक्षा",
      author: "धनसुदन धौलागाई",
      date: "वैशाख २४, २०८२",
      desc: "बालबालिकाको चौतर्फी विकासका लागि घर नै पहिलो पाठशाला हो र अभिभावक नै पहिलो शिक्षक हुन्।",
      img: "/user.png",
    },
    {
      title: "डोकोभरि गृहकार्य !",
      author: "शिक्षक टीम",
      date: "पौष १०, २०८१",
      desc: "शिक्षकले कक्षाकोठामा सिकाउनेभन्दा बढी गृहकार्यको भारी बोकाउँदा बालबालिकाको सिर्जनशीलता मर्दै गएको छ।",
      img: "/user.png",
    },
    {
      title: "गरे शिक्षकले नै सक्छन् !",
      author: "विजयकुमार विक (भोटे)",
      date: "पौष १०, २०८१",
      desc: "जबसम्म सार्वजनिक विद्यालयको शैक्षिक गुणस्तर सुध्रिदैन, तबसम्म शिक्षामा समानता आउन सक्दैन। जबसम्म सार्वजनिक विद्यालयको शैक्षिक गुणस्तर सुध्रिदैन, तबसम्म शिक्षामा समानता आउन सक्दैन।",
      img: "/user.png",
    },
    {
      title: "विज्ञान र गणितको स्तर कसरी उकास्ने ?",
      author: "शिक्षक टीम",
      date: "असोज २०, २०८१",
      desc: "गणित र विज्ञानलाई घोक्ने विषय नभई प्रयोग गर्ने विषयको रूपमा बुझाउनु आजको आवश्यकता हो।",
      img: "/user.png",
    },
    {
      title: "संघीयतामा झन्झन् गुम्दै शिक्षकको साख",
      author: "भीमप्रसाद सापकोटा",
      date: "पुस १, २०७७",
      desc: "जबसम्म सर्वसाधारणको जिब्रोबाट मास्टर भन्ने रुखो अभिव्यक्तिलाई मिल्काइँदैन, तबसम्म यो पेशा उपेक्षित रहिरहन्छ।",
      img: "/user.png",
    },
  ];

  return (
    <aside className="col-span-12 lg:col-span-3 space-y-6">
      <section className="bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.1)] flex flex-col h-[850px] border border-gray-100">
        <div className="bg-[#1e695e] text-white p-2.5 font-bold text-center text-sm tracking-wide">
          मनका कुरा
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="border-b border-gray-100 pb-5 last:border-0 last:pb-0"
            >
              <Link to={"/#"}>
                <h4 className="font-bold text-[15px] leading-tight text-gray-900 hover:text-[#1e695e] cursor-pointer mb-2 transition-colors">
                  {item.title}
                </h4>
              </Link>

              <div className="flex items-start gap-3 mb-2">
                <img
                  src={item.img}
                  className="w-10 h-10 flex-shrink-0 rounded-full object-cover border border-gray-200 shadow-sm"
                  alt="author"
                />

                <div>
                  <p className="text-[13px] font-bold text-red-600 leading-none">
                    {item.author}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>

              {/* Description Part - ठ्याक्कै फोटोमा जस्तै */}
              <p className="text-gray-700 text-[12.5px] leading-relaxed line-clamp-3 italic">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
          <button className="text-[12px] font-bold text-[#1e695e] hover:text-red-600 transition-colors">
            अन्य विषय
          </button>
        </div>
      </section>

    
    </aside>
  );
}
