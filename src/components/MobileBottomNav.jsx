import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaComments, FaPlus, FaStore, FaUser, FaHeart } from "react-icons/fa";

const MobileBottomNav = () => {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "text-blue-600 font-semibold" : "text-gray-600";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-inner z-50">
      <div className="flex justify-around items-center py-2">
        <Link to="/" className={`flex flex-col items-center text-sm ${isActive("/")}`}>
          <FaHome className="text-xl" />
          <span>Home</span>
        </Link>
        <Link to="/chat" className={`flex flex-col items-center text-sm ${isActive("/chat")}`}>
          <FaComments className="text-xl" />
          <span>Chat</span>
        </Link>
        <Link
          to="/sell"
          className="flex flex-col items-center text-white bg-blue-600 p-3 rounded-full -mt-6 shadow-lg hover:bg-blue-700 transition"
        >
          <FaPlus className="text-2xl" />
        </Link>
        <Link to="/wishlist" className={`flex flex-col items-center text-sm ${isActive("/wishlist")}`}>
          <FaHeart className="text-xl" />
          <span>Wishlist</span>
        </Link>
        <Link to="/account" className={`flex flex-col items-center text-sm ${isActive("/account")}`}>
          <FaUser className="text-xl" />
          <span>User</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
