import React from "react";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "My Profile", icon: User, to: "/profile-verification", color: "text-blue-600" },
  { label: "My Listings", icon: ShoppingBag, to: "/orders", color: "text-green-600" },
  { label: "My Wishlist", icon: Heart, to: "/wishlist", color: "text-pink-500" },
  { label: "Settings", icon: Settings, to: "/settings", color: "text-gray-600" },
  { label: "Help & Support", icon: HelpCircle, to: "/help", color: "text-yellow-500" },
];

const Account = () => {
  return (
    <div className="max-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20 md:pt-24 md:pb-10">
      <div className="max-w-[500px] mx-auto pt-6 px-4 space-y-4">
        {menuItems.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="flex items-center gap-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md hover:bg-white transition"
          >
            <item.icon className={`${item.color} w-6 h-6`} />
            <span className="font-medium text-gray-800">{item.label}</span>
          </Link>
        ))}

        <button
          className="w-full flex items-center gap-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md hover:bg-white transition text-left"
          onClick={() => alert("Logged out!")}
        >
          <LogOut className="text-red-500 w-6 h-6" />
          <span className="font-medium text-gray-800">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Account;
