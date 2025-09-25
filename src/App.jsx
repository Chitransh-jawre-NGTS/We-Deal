import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/home";
import CategoryDetails from "./components/CategoryDetails.jsx";
import ProductDescription from "./components/ProductDescription";
import Account from "./pages/Account/Index";
import Orders from "./pages/Listings/index.jsx";
import Sell from "./pages/Sell/index.jsx";
import Wishlist from "./pages/Wishlist/page.jsx";
import ProfileVerification from "./pages/Profile/index.jsx";
import ChatbotPage from "./pages/Help/index.jsx";
import LoginPage from "./pages/Login/index.jsx";
import PrivacyPolicy from "./pages/PrivecyPolicy/index.jsx";
import TermsAndConditions from "./pages/Term&Condition/index.jsx";
import Chats from "./pages/Chats/index.jsx";
import ChatRoom from "./components/ChatRoom.jsx";
import Store from "./pages/Store/index.jsx";
import CategoryForm from "./components/CategoryForm.jsx";
import ImageUpload from "./pages/ImageUpload/index.jsx";
import SearchPage from "./pages/Search/index.jsx";

import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AboutUs from "./pages/aboutus/index.jsx";
import SellerPage from "./pages/sellerpage.jsx/index.jsx";
import Settings from "./pages/settings/index.jsx";
import ListingDetails from "./pages/listingDetails/index.jsx";
import { Toaster } from "react-hot-toast";
import BecomeSeller from "./pages/BecomeSeller/index.jsx";
import SellerDashboard from "./pages/Seller-Dashboard/index.jsx";

function App() {

  return (
    <div className="relative">
        <ScrollToTop/>
          <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/categorydetails" element={<CategoryDetails />} />
        <Route
          path="/product/:productId"
          element={<ProductDescription />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/help" element={<ChatbotPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/seller/:sellerId" element={<SellerPage />} />
        <Route path="/settings" element={<Settings />} />
         <Route path="/my-listings/:productId" element={<ListingDetails/>} />
         <Route path="/become-seller" element={<BecomeSeller/>} />
         <Route path="/dashboard" element={<SellerDashboard/>} />


        {/* ✅ Protected routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-listing"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <Sell />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-verification"
          element={
            <ProtectedRoute>
              <ProfileVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatroom/:id"
          element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sells/:slug"
          element={
            <ProtectedRoute>
              <CategoryForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-images"
          element={
            <ProtectedRoute>
              <ImageUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileVerification />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-gray-500">Page not found</div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
