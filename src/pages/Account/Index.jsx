import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { logout } from "../../redux/slices/authSlice";
import { cookies } from "../../utils/cookies";
import { userApi } from "../../api/auth";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/Navbar";

const menuItems = [
  { label: "My Profile", icon: User, to: "/profile" },
  { label: "My Listings", icon: ShoppingBag, to: "/my-listing" },
  { label: "Wishlist", icon: Heart, to: "/wishlist" },
  { label: "Settings", icon: Settings, to: "/settings" },
  { label: "Help Center", icon: HelpCircle, to: "/help" },
  { label: "Logout", icon: LogOut, to: "/logout", color: "text-red-600", isLogout: true },
];

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userApi.getProfile();
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    cookies.remove("token");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

return (
  <>
    <Navbar ShowMobileTop={false} />
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* ✅ Profile Banner (Sticky) */}
      <section className="px-4 pt-8 sticky top-0 z-10 bg-gray-50">
        <div className="max-w-7xl mx-auto flex items-center gap-6 bg-white rounded-3xl p-4 shadow-lg">
          {/* Avatar with Verified Badge */}
          <div className="relative w-25 h-25 flex-shrink-0">
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt={user?.name || "User"}
              className="w-full h-full rounded-full object-cover border-4 border-blue-300"
            />
            <span className="absolute bottom-0 right-0 flex items-center text-white text-xs font-semibold bg-blue-500 px-2 py-0.5 rounded-full border-2 border-white">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </span>
          </div>

          {/* Name */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              {user?.name || "No Name"}
            </h2>
          </div>
        </div>
      </section>

      {/* ✅ Menu Options (Scrollable area) */}
      <section className="flex-1 overflow-y-auto w-full mx-auto px-4 mt-6 pb-20">
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, idx) =>
            item.isLogout ? (
              <button
                key={idx}
                onClick={handleLogout}
                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-xl transition hover:bg-red-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full flex items-center justify-center">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ) : (
              <Link
                key={idx}
                to={item.to}
                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-xl transition hover:bg-blue-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <item.icon
                      className={`${item.color || "text-blue-600"} w-6 h-6`}
                    />
                  </div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl hidden md:flex mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        © 2025 NextGenOLX. All rights reserved.
      </footer>
    </div>
  </>
);

};

export default Account;
