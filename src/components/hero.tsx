import { Link } from "react-router-dom";
import MankaKura from "./manka-kura";

export default function Hero() {
  return (
    <div className="bg-gray-50  font-sans">
      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 lg:col-span-9 space-y-8">
          <Link to={"/"}>
            <div
              className="bg-white hover:text-teal-800  cursor-pointer border-gray-200 overflow-hidden group
            shadow-[4px_4px_10px_rgba(0,0,0,0.25)]"
            >
              <h3 className="font-bold text-4xl m-4 pl-3">
                फोहरमैला व्यवस्थापनमा 'अशेष'को अवधारणा
              </h3>

              {/* Right Image part */}
              <div className="md:col-span-6 overflow-hidden">
                <img
                  src="/hero.gif"
                  className="w-full h-full object-cover  transition-transform duration-700"
                  alt="Waste Management"
                />
              </div>
            </div>
          </Link>

          <Link to={"/"}>
            <div
              className="bg-white hover:text-teal-800 mt-10 cursor-pointer border-gray-200 overflow-hidden group
            shadow-[4px_4px_10px_rgba(0,0,0,0.25)]"
            >
              <h3 className="font-bold text-center text-4xl m-4 pl-3">
                सच्चा गुरु !
              </h3>
              <div className="">
                <img
                  src="/hero2.gif"
                  className="w-full h-full"
                  alt="Cartoon Art"
                />
              </div>
            </div>
          </Link>

          {/* Bottom Grid for Smaller News */}
          <Link to={"/"}>
            <div className="bg-white pt-3 mt-10 hover:text-teal-800 cursor-pointer shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
              <h3 className="font-bold text-center text-4xl m-4">
                स्कूल छ खोलापारि, छैन खोलामा पुल !
              </h3>
              <img
                src="/kholapari.gif"
                className="w-full h-full object-cover mb-2"
                alt="news"
              />
            </div>
          </Link>
        </div>

        {/* Right Sidebar: News Feed (3 Columns) */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <div className=" top-24 space-y-6">
            <section>
              <div className="bg-[#1e695e] text-white p-2.5 font-bold text-center  shadow-md">
                शिक्षा खबर
              </div>
              <Link to={"/"}>
                <div
                  className="bg-white  space-y-4
                     shadow-[4px_4px_10px_rgba(0,0,0,0.25),_-4px_4px_10px_rgba(0,0,0,0.25)]"
                >
                  {[
                    "दिवा खाजा: शिक्षक-विद्यार्थीको एउटै भान्छा",
                    "शिक्षाकर्मीहरूद्वारा राष्ट्रपति पौडेलको ध्यानाकर्षणः शिक्षा विधेयक संविधान अनुकूल होस् !",
                    "गणित बुझाइको भाष्य र हाम्रो दायित्व",
                    "शिक्षक मासिक पत्रिकालाई फर्केर हेर्ने प्रयास",
                    "शैक्षिक गुणस्तरका मापदण्ड",
                    "शिक्षाको निजीकरण कारक तत्व र नियमनको औचित्य",
                    "चमत्कारी एसईई नतिजा !",
                    "डिजिटल सुरक्षाका काइदा !",
                    "विद्यालयमा हरित संस्कारको अभ्यास",
                    "ज्ञानविज्ञान शैक्षिक सहकारीको साधारणसभा सम्पन्न (तस्वीरमा हेर्नुहोस्)",
                  ].map((news, index) => (
                    <div key={index} className="group cursor-pointer">
                      <p className="text-sm pl-3 p-3 font-medium text-gray-700 group-hover:text-teal-700 transition-colors leading-snug">
                        {news}
                      </p>
                      <div className="h-[1px]  bg-gray-200 mt-1 group-last:hidden"></div>
                    </div>
                  ))}
                  <button className="w-full text-xs text-teal-700 font-bold hover:underline py-2">
                    सबै खबर हेर्नुहोस् »
                  </button>
                </div>
              </Link>
            </section>

            {/* Side Advertisement */}
            <section className=" shadow-inner">
              <img
                src="/sideAdvertise.jpg"
                className="w-full h-auto rounded-sm border border-gray-200"
                alt="Ad"
              />
            </section>

            {/* Popular Topics Tags */}
            <MankaKura />
          </div>
        </aside>
      </main>
    </div>
  );
}
