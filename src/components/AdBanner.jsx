import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const observerRef = useRef(null);
  const sliderRef = useRef(null);

  // Fetch active banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/ads/banner/active`);
        setBanners(res.data);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchBanners();
  }, []);

  // Track impression when banner becomes visible
  useEffect(() => {
    if (!banners.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const bannerId = entry.target.getAttribute("data-banner-id");
            try {
              await axios.post(`${import.meta.env.VITE_API_URL}/ads/banner/impression/${bannerId}`);
              observer.unobserve(entry.target); // avoid duplicate impressions
            } catch (err) {
              console.error("Error tracking impression:", err);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const imgs = document.querySelectorAll(".banner-slide");
    imgs.forEach((img) => observer.observe(img));

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [banners]);

  // Custom Arrow Buttons
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all"
    >
      <FaChevronRight className="text-gray-800" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all"
    >
      <FaChevronLeft className="text-gray-800" />
    </button>
  );

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div style={{ bottom: "10px" }}>
        <ul className="m-0 flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-700 transition-all"></div>
    ),
  };

  return (
    <div className="relative max-w-5xl mx-auto my-8 px-2">
      {banners.length > 0 ? (
        <Slider ref={sliderRef} {...settings}>
          {banners.map((banner) => (
            <div
              key={banner._id}
              data-banner-id={banner._id}
              className="banner-slide relative group cursor-pointer"
            >
              <a href={banner.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-60 md:h-80 object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-lg md:text-xl font-semibold">{banner.title}</h3>
                  <p className="text-sm opacity-80">Tap to view offer →</p>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500 py-8">No active banners available</p>
      )}
    </div>
  );
};

export default BannerCarousel;
