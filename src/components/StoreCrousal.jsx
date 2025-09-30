import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// You can also import images locally if not passing via props
import carImg from "../assets/images/hero-carousal/car.jpg";
import electronicsImg from "../assets/images/hero-carousal/electronics.jpg";
import sellImg from "../assets/images/hero-carousal/sell.jpg";

// Default images if none are passed as props
const defaultImages = [carImg, electronicsImg, sellImg];

const StoreCarousel = ({ images = defaultImages }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full mt-20 lg:mt-0 h-64 md:h-120 overflow-hidden">
      <img
        src={images[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default StoreCarousel;
