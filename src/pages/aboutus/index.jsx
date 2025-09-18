// src/pages/AboutUs.jsx
import React, { useState } from "react";
import { FaUsers, FaLightbulb, FaHandshake, FaRocket, FaChevronDown, FaArrowRight,FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const AboutUs = () => {
  const [faqOpen, setFaqOpen] = useState(null);
   const [isOpen, setIsOpen] = useState(false);
   
  const toggleMenu = () => setIsOpen(!isOpen);

  const faqs = [
    { question: "How do I list a product?", answer: "You can list products by clicking on the +Sell button and filling out the category form." },
    { question: "Is WeDeal safe?", answer: "Yes! WeDeal ensures secure transactions between buyers and sellers." },
    { question: "Can I edit my listing?", answer: "Yes, you can edit or remove your listings from your profile page." },
  ];

  const blogs = [
    { title: "Top 5 Tips for Selling Online", img: "https://images.unsplash.com/photo-1592928304124-f7b4a3f0f5f4?auto=format&fit=crop&w=800&q=80" },
    { title: "How to Choose the Best Deals", img: "https://images.unsplash.com/photo-1556742400-b5c8f33a12e0?auto=format&fit=crop&w=800&q=80" },
    { title: "Online Market Trends 2025", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80" },
  ];
    const navItems = [
    { name: "Home", to: "hero" },
    { name: "About Us", to: "about" },
    { name: "FAQ", to: "faq" },
    { name: "Blog", to: "blog" },
    { name: "Partners", to: "partners" },
    { name: "Contact", to: "contact" },
  ];

  return (

    <div className="min-h-screen bg-gray-50">

         <nav className="bg-white shadow fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="text-2xl font-bold text-blue-600 cursor-pointer">
          WeDeal
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item, idx) => (
            <li key={idx} className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
              <ScrollLink
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
              >
                {item.name}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          {navItems.map((item, idx) => (
            <li key={idx} className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
              <ScrollLink
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-32 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to WeDeal</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8">
          Connecting buyers and sellers seamlessly. Experience a safe, fast, and reliable online marketplace.
        </p>
        <a href="/sell" className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold px-8 py-4 rounded-lg text-lg transition">
          Start Selling
        </a>
        <img
          src="https://images.unsplash.com/photo-1612831455546-df9d77c0224b?auto=format&fit=crop&w=1470&q=80"
          alt="Hero Illustration"
          className="w-full max-w-4xl mx-auto mt-12 rounded-lg shadow-lg"
        />
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1605902711622-cfb43c443f1e?auto=format&fit=crop&w=1470&q=80"
            alt="Our Mission"
            className="rounded-lg shadow-lg w-full"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-gray-700 mb-4">
              Our mission is to simplify online trading by creating a platform that is intuitive, secure, and accessible for everyone.
            </p>
            <p className="text-gray-700">
              We envision a community-driven marketplace where buyers and sellers trust each other and experience seamless transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 md:px-24 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600 text-sm">Building a trustworthy community where buyers and sellers feel safe.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaLightbulb className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600 text-sm">Continuously improving our platform with creative solutions.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaHandshake className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trust</h3>
            <p className="text-gray-600 text-sm">Ensuring secure transactions and reliable interactions on our platform.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaRocket className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Growth</h3>
            <p className="text-gray-600 text-sm">Helping our users grow and succeed in buying, selling, and trading.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Chitransh Jawre", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Sanjana Meena", role: "COO", img: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Rahul Sharma", role: "Lead Developer", img: "https://randomuser.me/api/portraits/men/56.jpg" },
            { name: "Priya Singh", role: "Marketing Head", img: "https://randomuser.me/api/portraits/women/68.jpg" },
          ].map((member, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-24 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow">
              <button
                className="w-full flex justify-between items-center p-4 focus:outline-none"
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
              >
                <span className="text-gray-800 font-medium">{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform ${faqOpen === idx ? "rotate-180" : ""}`}
                />
              </button>
              {faqOpen === idx && (
                <div className="p-4 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Partners Section */}
<section className="py-20 px-6 md:px-24 bg-gray-100">
  <h2 className="text-3xl font-bold text-center mb-12">Our Trusted Partners</h2>
  
  <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
    {/* Partner Card */}
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition">
      <img
        src="https://via.placeholder.com/150x80?text=MS+Digitals"
        alt="MS Digitals"
        className="w-36 h-auto mb-4 object-contain"
      />
      <h3 className="text-xl font-semibold mb-2">MS Digitals</h3>
      <p className="text-gray-600 text-center mb-4">
        Our technology partner specializing in digital solutions, helping us build a seamless and robust online marketplace.
      </p>
      <a
        href="https://msdigitals.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Visit Website
      </a>
    </div>
  </div>
</section>


      {/* Blog Section */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Blogs</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <div key={idx} className="rounded-xl shadow hover:shadow-lg overflow-hidden transition">
              <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                <a href="/blogs" className="text-blue-600 font-medium flex items-center gap-2">
                  Read More <FaArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-24 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us Today!</h2>
        <p className="mb-6">
          Start selling, buying, or listing your products with WeDeal and experience seamless online trading.
        </p>
        <a
          href="/sell"
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold px-6 py-3 rounded-lg transition"
        >
          Start Selling
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
