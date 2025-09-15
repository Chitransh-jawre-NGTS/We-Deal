import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/home"; // Landing page
import CategoryDetails from "./components/ProductCategory"; // Category page
import ProductDescription from "./components/ProductDescription";
import Account from "./pages/Account/Index";
import Orders from "./pages/Orders.jsx";
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



function App() {
  return (
    <div className="relative">
      {/* Navbar always visible */}
      {/* <Navbar /> */}

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/category/:category" element={<CategoryDetails />} />
        <Route path="/product/:category/:productId" element={<ProductDescription />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile-verification" element={<ProfileVerification />} />
         <Route path="/help" element={<ChatbotPage />} />
         <Route path="/login" element={<LoginPage/>} />
               <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/chat" element={<Chats />} />
        <Route path="/chat/:id" element={<ChatRoom />} />
        <Route path="/store" element={<Store/>}/>
        <Route path="/sells/:slug" element={<CategoryForm />} />
         <Route path="/upload-images" element={<ImageUpload />} />
         <Route path="/search" element={<SearchPage />} />
         <Route path="/profile" element={<ProfileVerification />} />

        {/* Optional 404 page */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-gray-500">
              Page not found
            </div>
          }
        />
      </Routes>

      {/* Mobile bottom navigation */}
    </div>
  );
}

export default App;
