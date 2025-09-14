import React from "react";
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (

   <>
      {/* Call-to-Action */}
            <section className="py-12 md:py-16 mb-5 bg-purple-600 text-white text-center px-4">
                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Start Selling Today!</h3>
                <p className="mb-4 md:mb-6 max-w-md md:max-w-lg mx-auto text-sm md:text-base">
                    Post your first ad and reach thousands of buyers instantly.
                </p>
                <button className="px-6 md:px-8 py-3 md:py-4 bg-white text-purple-600 font-semibold rounded hover:bg-gray-100 transition">
                    Post Free Ad
                </button>
            </section>
    <footer className="bg-purple-900 hidden md:block text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h4 className="text-xl font-bold mb-4">NextGenOLX</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            Your trusted platform for buying and selling anything in your city.
            From cars and mobiles to real estate and jobs, NextGenOLX connects
            millions of users every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li><a href="#" className="hover:text-white transition">Post Ad</a></li>
            <li><a href="#" className="hover:text-white transition">Explore</a></li>
            <li><a href="#" className="hover:text-white transition">Categories</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <h4 className="text-lg font-bold mb-4">Popular Categories</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li><a href="#" className="hover:text-white transition">Cars</a></li>
            <li><a href="#" className="hover:text-white transition">Mobile Phones</a></li>
            <li><a href="#" className="hover:text-white transition">Jobs</a></li>
            <li><a href="#" className="hover:text-white transition">Real Estate</a></li>
            <li><a href="#" className="hover:text-white transition">Electronics</a></li>
            <li><a href="#" className="hover:text-white transition">Bikes & Scooters</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h4 className="text-lg font-bold mb-4">Stay Connected</h4>
          <p className="text-sm text-gray-300 mb-4">
            Subscribe to get updates on best deals and offers.
          </p>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-r-md font-semibold hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
          {/* Social Icons */}
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-gray-300 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* App Download + Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-purple-800 pt-6">
        {/* App Badges */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-black px-4 py-2 rounded-md hover:opacity-90 transition">
            <FaGooglePlay className="text-2xl" /> 
            <span className="text-sm">Get it on <br /> Google Play</span>
          </button>
          <button className="flex items-center gap-2 bg-black px-4 py-2 rounded-md hover:opacity-90 transition">
            <FaApple className="text-2xl" /> 
            <span className="text-sm">Download on <br /> App Store</span>
          </button>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm text-center md:text-right">
          © 2025 NextGenOLX. All Rights Reserved | Terms & Privacy
        </p>
      </div>
    </footer></>
    
  );
};

export default Footer;
