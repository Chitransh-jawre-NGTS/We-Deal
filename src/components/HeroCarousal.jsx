import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Sample banner images (replace with your banners)
const banners = [
  {
    id: 1,
    image: "https://picsum.photos/1600/600?random=10",
    title: "Sell Anything Instantly",
    subtitle: "Post your ad for free and reach thousands of buyers.",
  },
  {
    id: 2,
    image: "https://picsum.photos/1600/600?random=11",
    title: "Find Your Dream Car",
    subtitle: "Browse thousands of verified car listings near you.",
  },
  {
    id: 3,
    image: "https://picsum.photos/1600/600?random=12",
    title: "Best Deals on Electronics",
    subtitle: "Grab the latest gadgets at unbeatable prices.",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[40vh] md:h-[75vh]">
        <AnimatePresence>
          {banners.map(
            (banner, index) =>
              index === current && (
                <motion.div
                  key={banner.id}
                  className="absolute w-full h-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-16">
                    <h2 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg">
                      {banner.title}
                    </h2>
                    <p className="text-sm md:text-lg text-gray-200 mt-3 md:mt-4 max-w-xl">
                      {banner.subtitle}
                    </p>
                    <button className="mt-5 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                      Explore Now
                    </button>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 hidden md:block left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 hidden md:block right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
