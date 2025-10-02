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
  { label: "My Profile", sublabel: "View and edit your profile", icon: User, to: "/profile" },
  { label: "My Listings", sublabel: "Your active listings", icon: ShoppingBag, to: "/my-listing" },
  { label: "Wishlist", sublabel: "Your favorite items", icon: Heart, to: "/wishlist" },
  { label: "billing", sublabel: "billing section", icon: Heart, to: "/billing" },
  { label: "Transection", sublabel: "All transection", icon: Heart, to: "/transactions" },
  { label: "Become Seller", sublabel: "Start selling products", icon: Heart, to: "/become-seller" },
  { label: "Settings", sublabel: "Manage account settings", icon: Settings, to: "/settings" },
  { label: "Help Center", sublabel: "Get support and help", icon: HelpCircle, to: "/help" },
  { label: "Logout", sublabel: "Sign out of your account", icon: LogOut, to: "/logout", color: "text-red-600", isLogout: true },
];

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null); // contains user + profile
  const [adStats, setAdStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userApi.getProfile();
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchAdStats = async () => {
      try {
        const res = await userApi.getAdStats();
        setAdStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdStats();
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

  const profile = userData?.profile || {};
  const user = userData?.user || {};

  return (
    <>
      <Navbar ShowMobileTop={false} />
      <div className="flex flex-col bg-gray-50 min-h-screen">
        {/* Profile Section */}
        <section className="px-4 pt-8 pb-6 bg-gray-50">
          <div className="max-w-7xl mx-auto flex items-center gap-6 border border-gray-300 bg-white rounded-3xl p-4 shadow-md">
            {/* Avatar */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <img
                src={profile?.avatar || "https://via.placeholder.com/150"}
                alt={profile?.name || "User"}
                className="w-full h-full rounded-full object-cover border-4 border-blue-300"
              />
              {profile?.verified && (
                <span className="absolute bottom-0 right-0 flex items-center text-white text-xs font-semibold bg-blue-500 px-2 py-0.5 rounded-full border-2 border-white">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </span>
              )}
            </div>

            {/* Name */}
            <div>
              <h2 className="text-2xl font-bold text-gray-700">{profile?.name || "No Name"}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Ads Progress Bar */}
          {/* Ad Stats */}
          <div className="bg-white max-w-7xl mx-auto shadow rounded-2xl mt-1 p-6">
            {/* <h3 className="text-xl font-bold mb-4">Ad Usage</h3> */}

            {adStats ? (
              <>
                <p className="text-gray-600 font-medium mb-2">
                  Ads Posted This Month: {adStats.adsPosted} / {adStats.freeAdsLeft}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        (adStats.adsPosted / adStats.adsLimit) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

                {/* CTA when limit reached */}
                {adStats.adsPosted >= adStats.adsLimit && (
                  <div className="mt-4">
                    <button
                      onClick={() => toast.info("Redirect to payment/upgrade")}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                    >
                      Upgrade to Post More Ads
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">Loading ad stats...</p>
            )}
          </div>
        </section>

        {/* Menu Section */}
        <section className="flex-1 overflow-y-auto w-full max-w-320 mx-auto px-4 lg:mt-6 pb-20">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item, idx) =>
              item.isLogout ? (
                <button
                  key={idx}
                  onClick={handleLogout}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-xl transition hover:bg-red-50 w-full"
                >
                  {/* Left side: icon + labels */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full flex items-center justify-center">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">{item.label}</span>
                      {item.sublabel && <span className="text-sm text-gray-400">{item.sublabel}</span>}
                    </div>
                  </div>

                  {/* Right side: chevron */}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

              ) : (
                <Link
                  key={idx}
                  to={item.to}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-xl transition hover:bg-blue-50"
                >
                  {/* Left side: icon + labels */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <item.icon className={`${item.color || "text-blue-600"} w-6 h-6`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">{item.label}</span>
                      {item.sublabel && <span className="text-sm text-gray-400">{item.sublabel}</span>}
                    </div>
                  </div>

                  {/* Right side: chevron */}
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
    </>
  );
};

export default Account;

















// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// import { userApi } from "../../api/auth"; // adjust path if different

// const Account = () => {
//   const [userData, setUserData] = useState(null);
//   const [adStats, setAdStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfileAndStats = async () => {
//       try {
//         const [profileRes, statsRes] = await Promise.all([
//           userApi.getProfile(),
//           userApi.getAdStats(),
//         ]);
//         setUserData(profileRes.data);
//         setAdStats(statsRes.data);
//       } catch (err) {
//         console.error("Failed to fetch profile or stats", err);
//         toast.error("Failed to load user data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfileAndStats();
//   }, []);

//   if (loading) {
//     return <p className="text-center py-8 text-gray-500">Loading...</p>;
//   }

//   if (!userData) {
//     return <p className="text-center py-8 text-red-500">User not found</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* User Info */}
//       <div className="bg-white shadow rounded-2xl p-6 mb-8">
//         <h2 className="text-2xl font-bold mb-4">Account Details</h2>
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Name:</span> {userData.name}
//         </p>
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold">Email:</span> {userData.email}
//         </p>
//       </div>

//       {/* Ad Stats */}
//       <div className="bg-white shadow rounded-2xl p-6">
//         <h3 className="text-xl font-bold mb-4">Ad Usage</h3>

//         {adStats ? (
//           <>
//             <p className="text-gray-600 font-medium mb-2">
//               Ads Posted This Month: {adStats.adsPosted} / {adStats.adsLimit}
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-4">
//               <div
//                 className="bg-blue-500 h-4 rounded-full transition-all"
//                 style={{
//                   width: `${Math.min(
//                     (adStats.adsPosted / adStats.adsLimit) * 100,
//                     100
//                   )}%`,
//                 }}
//               ></div>
//             </div>

//             {/* CTA when limit reached */}
//             {adStats.adsPosted >= adStats.adsLimit && (
//               <div className="mt-4">
//                 <button
//                   onClick={() => toast.info("Redirect to payment/upgrade")}
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
//                 >
//                   Upgrade to Post More Ads
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-500">Loading ad stats...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account;
