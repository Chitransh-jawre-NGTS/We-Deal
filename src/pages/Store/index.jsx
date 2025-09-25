import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaStar, FaCheckCircle } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

// Import images
import carImg from "../../assets/images/hero-carousal/car.jpg";
import electronicsImg from "../../assets/images/hero-carousal/electronics.jpg";
import sellImg from "../../assets/images/hero-carousal/sell.jpg";

// Carousel images array
const carouselImages = [carImg, electronicsImg, sellImg];


// Example shop data
const shop = {
  name: "NextGen Electronics",
  logo: "https://picsum.photos/100/100?random=50",
  trusted: true,
  description: "Your one-stop shop for used mobiles, bikes, and accessories. Trusted by thousands of customers.",
};

const productsData = {
  mobiles: [
    { id: 1, name: "iPhone 12", price: 45000, image: "https://picsum.photos/300/300?random=11" },
    { id: 2, name: "Samsung Galaxy S21", price: 35000, image: "https://picsum.photos/300/300?random=12" },
    { id: 3, name: "OnePlus 9", price: 30000, image: "https://picsum.photos/300/300?random=13" },
    { id: 4, name: "Xiaomi Mi 11X", price: 25000, image: "https://picsum.photos/300/300?random=14" },
    { id: 5, name: "Realme GT Neo", price: 28000, image: "https://picsum.photos/300/300?random=15" },
    { id: 6, name: "Google Pixel 6", price: 55000, image: "https://picsum.photos/300/300?random=16" },
    { id: 7, name: "Vivo V23", price: 24000, image: "https://picsum.photos/300/300?random=17" },
    { id: 8, name: "Oppo Reno 6", price: 27000, image: "https://picsum.photos/300/300?random=18" },
    { id: 9, name: "iPhone 13 Pro", price: 80000, image: "https://picsum.photos/300/300?random=19" },
    { id: 10, name: "Samsung Galaxy Note 20", price: 60000, image: "https://picsum.photos/300/300?random=20" },
  ],

  featured: [
    { id: 101, name: "iPhone 14 Pro Max", price: 125000, image: "https://picsum.photos/300/300?random=41" },
    { id: 102, name: "Samsung Galaxy Z Fold 4", price: 135000, image: "https://picsum.photos/300/300?random=42" },
    { id: 103, name: "OnePlus 11 5G", price: 58000, image: "https://picsum.photos/300/300?random=43" },
    { id: 104, name: "Google Pixel 7 Pro", price: 75000, image: "https://picsum.photos/300/300?random=44" },
    { id: 105, name: "Asus ROG Phone 6", price: 70000, image: "https://picsum.photos/300/300?random=45" },
    { id: 106, name: "iPhone SE (2022)", price: 45000, image: "https://picsum.photos/300/300?random=46" },
  ],
};

const testimonials = [
  { id: 1, name: "Alice", feedback: "Great store! Found exactly what I needed.", rating: 5 },
  { id: 2, name: "Bob", feedback: "Amazing products and fast delivery.", rating: 4 },
  { id: 3, name: "Charlie", feedback: "Highly recommend this store.", rating: 5 },
];

const Store = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  const renderProducts = (products) => (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-6 mt-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md hover:shadow-xl transition overflow-hidden flex flex-col relative group"
        >
          {/* Product Image */}
          <Link
            to={`/store/product/${product.id}`}
            className="flex justify-center items-center h-48 bg-gray-50 overflow-hidden relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Product Details */}
          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h2>
            
            {/* Shop Info */}
            <div className="flex items-center mt-2 gap-2">
              <img
                src={shop.logo}
                alt={shop.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-gray-800 font-medium text-sm">{shop.name}</span>
                  <FaCheckCircle className="text-blue-500 w-4 h-4" title="Trusted Seller" />
                </div>
              </div>
            </div>
            <span className="text-gray-500 text-xs line-clamp-1">123 Main Street, City</span>
            <p className="text-gray-400 text-xs mt-1">Posted on: 25 Sep 2025</p>
            <p className="text-blue-600 font-bold text-lg mt-2">₹{product.price.toLocaleString()}</p>

            <Link
              to={`/product/${product.id}`}
              className="mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 text-sm text-center transition"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Carousel */}
        <div className="relative w-full mt-25 lg:mt-0 h-54 md:h-120 overflow-hidden">
          <img
            src={carouselImages[currentSlide]}
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

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Shop Details */}
          <section className="mb-8 flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow">
            <img
              src={shop.logo}
              alt={shop.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                {shop.name}
                {shop.trusted && <FaCheckCircle className="text-blue-500 w-6 h-6" title="Trusted Seller" />}
              </h2>
              <p className="text-gray-600 mt-2">{shop.description}</p>
            </div>
          </section>

          {/* Featured Mobiles */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800">Featured Mobiles</h2>
            {renderProducts(productsData.featured)}
          </section>

          {/* Used Mobiles */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800">RefebrishedMobiles</h2>
            {renderProducts(productsData.mobiles)}
          </section>

          {/* Customer Testimonials */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                  <div className="flex items-center mb-2">
                    {[...Array(t.rating)].map((_, idx) => (
                      <FaStar key={idx} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-2">"{t.feedback}"</p>
                  <p className="text-gray-900 font-semibold">- {t.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="mb-10 bg-gray-100 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">Subscribe to Our Newsletter</h2>
            <p className="text-gray-700 mt-2">Get updates on latest products and offers.</p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 flex-1"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Store;
