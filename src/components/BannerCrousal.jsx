import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// BannerCarousel.jsx using react-slick
// - fixed height: 30vh
// - full width
// - autoplay with arrows & dots

export default function BannerCarousel({
  autoplay = true,
  interval = 4000,
  showArrows = true,
  showDots = true,
}) {
  const images = [
    { src: "https://picsum.photos/1920/600?random=1", alt: "Slide 1" },
    { src: "https://picsum.photos/1920/600?random=2", alt: "Slide 2" },
    { src: "https://picsum.photos/1920/600?random=3", alt: "Slide 3" },
    { src: "https://picsum.photos/1920/600?random=4", alt: "Slide 4" },
  ];

  const settings = {
    dots: showDots,
    arrows: showArrows,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: interval,
    pauseOnHover: true,
    swipeToSlide: true,
    adaptiveHeight: false,
  };

  return (
    <div className="w-full  h-10" >
      <Slider {...settings} className="h-full">
        {images.map((img, i) => (
          <div key={i} className="w-full h-full">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto object-cover"
              draggable={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

/*
This demo uses Picsum images for testing.
Replace with your own ad banners when ready.
*/