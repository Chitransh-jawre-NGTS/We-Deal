import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Categories from "../../components/Category";
import HeroCarousel from "../../components/HeroCarousal";
import Footer from "../../components/Footer";
import ListingsPage from "../../components/Main";
import LoadingPage from "../../components/LoadingPage"; // ✅ import the loading page

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (adjust as needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Show loading page while loading is true
    return <LoadingPage />;
  }

  return (
    <>
      <Navbar />
      <div className="font-sans bg-gray-50 min-h-screen">
        {/* Notification Bar */}
        <div className="bg-purple-700 text-white text-center py-2 text-sm md:text-base">
          🎉 New Users Get Extra Visibility! Post your ad today for free!
        </div>

        <HeroCarousel />
        <Categories />
        <ListingsPage />

        {/* Video Ad Section */}
        <section className="w-full bg-black py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=0&rel=0"
                title="Video Ad"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Landing;
