import React, { useMemo } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ✅ Import images so they’re bundled once
import sellImg from "../assets/images/hero-carousal/sell.jpg";
import carImg from "../assets/images/hero-carousal/car.jpg";
import electronicsImg from "../assets/images/hero-carousal/electronics.jpg";

const banners = [
  {
    id: 1,
    image: sellImg,
    title: "Sell Anything Instantly",
    subtitle: "Post your ad for free and reach thousands of buyers.",
  },
  {
    id: 2,
    image: carImg,
    title: "Find Your Dream Car",
    subtitle: "Browse thousands of verified car listings near you.",
  },
  {
    id: 3,
    image: electronicsImg,
    title: "Best Deals on Electronics",
    subtitle: "Grab the latest gadgets at unbeatable prices.",
  },
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
  // ✅ Memoize settings so they don’t change every render
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
    <section className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative w-full h-[40vh] md:h-[75vh]">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-16">
              <h2 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg">
                {banner.title}
              </h2>
              <p className="text-sm md:text-lg text-gray-200 mt-3 md:mt-4 max-w-xl">
                {banner.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroCarousel;
