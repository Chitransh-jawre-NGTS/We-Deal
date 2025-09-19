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
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { label: "My Profile", icon: User, to: "/profile" },
  { label: "My Listings", icon: ShoppingBag, to: "/my-listings" },
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

  // Fetch user profile from API
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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Account</h1>
        </div>
      </header>

      {/* Profile Banner */}
      <section className="text-white pb-8 pt-2 px-4">
        <div className="max-w-7xl mx-auto flex border border-blue-500 rounded-2xl p-2 items-center gap-6 bg-white">
          <div className="w-20 h-20 bg-gray-200 border border-blue-300 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt={user?.name || "User Avatar"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-700">{user?.name || "No Name"}</h2>
            <p className="text-sm opacity-90 text-gray-700">{user?.email || "No Email"}</p>
          </div>
        </div>
      </section>

      {/* Menu Options */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, idx) =>
            item.isLogout ? (
              <button
                key={idx}
                onClick={handleLogout}
                className={`flex items-center justify-between gap-3 p-4 bg-white border border-blue-300 rounded-lg shadow hover:shadow-lg transition 
                          hover:bg-gradient-to-r from-blue-50 to-blue-100 w-full text-left`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ) : (
              <Link
                key={idx}
                to={item.to}
                className={`flex items-center justify-between gap-3 p-4 bg-white border border-blue-300 rounded-lg shadow hover:shadow-lg transition 
                          hover:bg-gradient-to-r from-blue-50 to-blue-100`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`${item.color}`} />
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        © 2025 NextGenOLX. All rights reserved.
      </footer>
    </div>
  );
};

export default Account;
