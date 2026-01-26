"use client";

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AdSlider = ({ images, interval = 3000, link = "/#" }: { images: string[], interval?: number, link?: string }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="bg-gray-50 py-4">
      <section className="max-w-7xl mx-auto px-4 overflow-hidden group cursor-pointer">
        <div className="relative w-full">
          <Link to={link} className="block w-full">
            {images.map((img, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 ${
                  index === currentImage ? "relative opacity-100" : "absolute inset-0 opacity-0"
                }`}
              >
                <img 
                  src={img} 
                  alt="Advertisement" 
                  className="w-full h-auto block shadow-sm hover:shadow-md transition-shadow duration-300"
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              </div>
            ))}
          </Link>
        </div>
      </section>
    </div>
  );
};

export function FirstAddsSection() {
  const images = [
    "/ads2.gif",
    "/ads3.jpg"
  ];
  return <AdSlider images={images} link="/first-promo" />;
}


export function SecondAddsSection() {
  const images = ["/ads2.gif"]; 
  return <AdSlider images={images} link="/second-promo" />;
}


export function ThirdAddsSection() {
  const images = ["/ads3.jpg"]; 
  return <AdSlider images={images} link="/third-promo" />;
}




export function FourthAddsSection() {
  const images = ["/ads4.jpg"]; 
  return <AdSlider images={images} link="/third-promo" />;
}