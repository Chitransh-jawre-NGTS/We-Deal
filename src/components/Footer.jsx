import React from "react";
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Call-to-Action */}
      <section className="py-12 md:py-16 mb-7 lg:mb-0 bg-blue-100 text-gray-900 text-center px-4">
        <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
          Start Selling Today!
        </h3>
        <p className="mb-4 md:mb-6 max-w-md md:max-w-lg mx-auto text-sm md:text-base text-gray-700">
          Post your first ad and reach thousands of buyers instantly.
        </p>
        <Link
          to="/sell"
          className="px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Post Free Ad
        </Link>
      </section>

      <footer className="bg-gray-100 hidden md:block text-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-blue-700">NextGenOLX</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted platform for buying and selling anything in your city.
              From cars and mobiles to real estate and jobs, NextGenOLX connects
              millions of users every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-700">Quick Links</h4>
            <ul className="text-gray-600 text-sm space-y-2">
              <li><Link to="/sell" className="hover:text-blue-600 transition">Post Ad</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition">Explore</Link></li>
              <li><Link to="/categories" className="hover:text-blue-600 transition">Categories</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 transition">Careers</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
         {/* Popular Categories */}
<div>
  <h4 className="text-lg font-bold mb-4 text-blue-700">Popular Categories</h4>
  <ul className="text-gray-600 text-sm space-y-2">
    <li>
      <Link to="/search?q=Cars" className="hover:text-blue-600 transition">
        Cars
      </Link>
    </li>
    <li>
      <Link to="/search?q=Mobile Phones" className="hover:text-blue-600 transition">
        Mobile Phones
      </Link>
    </li>
    <li>
      <Link to="/search?q=Jobs" className="hover:text-blue-600 transition">
        Jobs
      </Link>
    </li>
    <li>
      <Link to="/search?q=Real Estate" className="hover:text-blue-600 transition">
        Real Estate
      </Link>
    </li>
    <li>
      <Link to="/search?q=Electronics" className="hover:text-blue-600 transition">
        Electronics
      </Link>
    </li>
    <li>
      <Link to="/search?q=Bikes & Scooters" className="hover:text-blue-600 transition">
        Bikes & Scooters
      </Link>
    </li>
  </ul>
</div>


          {/* Stay Connected */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-700">Stay Connected</h4>
            <div className="flex gap-4 text-xl text-blue-600">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* App Download + Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-300 pt-6">
          {/* App Badges */}
          <div className="flex gap-4">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:opacity-90 transition">
              <FaGooglePlay className="text-2xl" /> 
              <span className="text-sm">Get it on <br /> Google Play</span>
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:opacity-90 transition">
              <FaApple className="text-2xl" /> 
              <span className="text-sm">Download on <br /> App Store</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-right">
            © 2025 NextGenOLX. All Rights Reserved | Terms & Privacy
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
