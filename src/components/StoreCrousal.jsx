import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import carImg from "../assets/images/hero-carousal/car.png";
import electronicsImg from "../assets/images/hero-carousal/electronics.png";
import sellImg from "../assets/images/hero-carousal/sell.png";

// Default images
const defaultImages = [carImg, electronicsImg, sellImg];

// Custom arrows for slick
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 z-10 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 z-10 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
  >
    <FaArrowLeft />
  </button>
);

const StoreCarousel = ({ images = defaultImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div>
        <ul className="!m-0"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-500 transition-all" />
    ),
  };

  return (
    <div className="relative w-full mt-20 bg-gradient-to-b from-blue-100 to-gray-50 lg:mt-0 h-64 md:h-120 overflow-hidden">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 md:h-120 object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StoreCarousel;
