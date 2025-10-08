import React, { useMemo } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import images
import sellImg from "../assets/images/hero-carousal/Gemini_Generated_Image_5hhozo5hhozo5hho.png";
import carImg from "../assets/images/hero-carousal/Gemini_Generated_Image_jez5i8jez5i8jez5.png";
import electronicsImg from "../assets/images/hero-carousal/Gemini_Generated_Image_hrjl7chrjl7chrjl.png";

const banners = [
  { id: 3, image: carImg },
  { id: 2, image: sellImg },
  { id: 1, image: electronicsImg },
];

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition hidden md:block z-10"
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition hidden md:block z-10"
  >
    <FaChevronLeft />
  </button>
);

const HeroCarousel = () => {
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      appendDots: (dots) => (
        <div style={{ bottom: "15px" }}>
          <ul className="flex justify-center gap-2"> {dots} </ul>
        </div>
      ),
      customPaging: () => (
        <div className="w-3 h-3 bg-gray-400 rounded-full hover:bg-white transition"></div>
      ),
    }),
    []
  );

  return (
    <section className="relative w-full mt-25 md:mt-20 lg:mt-0 overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="w-full h-[28vh] md:h-[35vh] lg:h-[75vh]">
            <img
              src={banner.image}
              alt={`Banner ${banner.id}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroCarousel;
