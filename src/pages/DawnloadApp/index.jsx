import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaAndroid } from "react-icons/fa";
import { motion } from "framer-motion";
import appPreview from "../../assets/images/hero-carousal/car.png"; // Replace with your app screenshot
import logo from "../../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png"; // Replace with your logo

const DownloadApp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-white relative overflow-hidden">


      {/* Navbar */}
      <nav className="flex items-center fixed top-0 left-0 w-full z-50 justify-between px-5 md:px-12 py-4 backdrop-blur-lg bg-white/50 shadow-md border-b border-white/40">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all"
        >
          <FaArrowLeft className="text-xl" />
          <span className="font-medium hidden md:inline">Back</span>
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} alt="SwapDeals Logo" className="w-full h-15 rounded-lg" />
        </div>

        <div className="w-10" /> {/* spacer for alignment */}
      </nav>

      {/* Main Content */}
      <main className="flex flex-col mt-10 items-center text-center px-6 py-12 md:py-20 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800"
        >
          Download the <span className="text-blue-600">SwapDeals</span> App
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 mt-4 max-w-xl text-lg"
        >
          Buy, sell, or swap anything instantly — anytime, anywhere.  
          Get your hands on the official Android app now and explore deals near you!
        </motion.p>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 relative"
        >
          <div className="absolute -inset-6 bg-blue-400/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="bg-white/50 backdrop-blur-lg p-4 rounded-3xl shadow-xl border border-white/30">
            <img
              src={appPreview}
              alt="App Preview"
              className="w-64 md:w-80 rounded-2xl shadow-lg border border-gray-200"
            />
          </div>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12"
        >
          <a
            href="/swapdeals.apk"
            download
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            <FaAndroid className="text-2xl" />
            Download for Android
          </a>
          <p className="text-gray-500 text-sm mt-3">
            Tap to download the APK file (supports Android 6.0 and above)
          </p>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 text-gray-600"
        >
          Coming soon on{" "}
          <span className="text-blue-600 font-semibold">iOS</span> &{" "}
          <span className="text-indigo-600 font-semibold">Web</span> 🚀
        </motion.div>
      </main>
    </div>
  );
};

export default DownloadApp;
