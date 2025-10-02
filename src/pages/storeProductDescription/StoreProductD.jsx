// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// // Dummy data (replace with backend API later)
// const productData = {
//   id: 1,
//   name: "iPhone 12",
//   price: 45000,
//   description:
//     "The iPhone 12 comes with a 6.1-inch Super Retina XDR display, A14 Bionic chip, and a dual-camera system with Night mode. It offers an immersive 5G experience and exceptional performance in a sleek design.",
//   images: [
//     "https://picsum.photos/600/400?random=11",
//     "https://picsum.photos/600/400?random=12",
//     "https://picsum.photos/600/400?random=13",
//     "https://picsum.photos/600/400?random=14",
//   ],
//   postedOn: "25 Sep 2025",
//   location: "Indore, MP",
//   seller: {
//     name: "NextGen Electronics",
//     logo: "https://picsum.photos/100/100?random=50",
//     trusted: true,
//     phone: "+91 98765 43210",
//   },
//   specs: {
//     brand: "Apple",
//     model: "iPhone 12",
//     storage: "128GB",
//     ram: "6GB",
//     camera: "12MP + 12MP Dual Camera",
//     battery: "2815 mAh",
//     processor: "A14 Bionic Chip",
//     display: "6.1-inch Super Retina XDR",
//   },
// };

// const shop = {
//   name: "NextGen Electronics",
//   logo: "https://picsum.photos/100/100?random=50",
//   trusted: true,
//   description:
//     "Your one-stop shop for used mobiles, bikes, and accessories. Trusted by thousands of customers.",
// };

// const StoreProductD = () => {
//   const { id } = useParams();
//   const product = productData;
//   const [mainImage, setMainImage] = useState(product.images[0]);

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-50 mt-25 lg:mt-0 min-h-screen py-8">
//         <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Product Images Section */}
//           <div className="flex flex-col">
//             <div className="bg-white shadow-md">
//               <img
//                 src={mainImage}
//                 alt={product.name}
//                 className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//             {/* Thumbnail Images */}
//             <div className="flex gap-3 mt-4 overflow-x-auto">
//               {product.images.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt={`thumbnail-${i}`}
//                   onClick={() => setMainImage(img)}
//                   className={`w-24 h-20 object-cover cursor-pointer border-2 ${
//                     mainImage === img ? "border-blue-500" : "border-gray-200"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="flex flex-col justify-between">
//             <div className="bg-white p-6 shadow-md">
//               <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//               <p className="text-gray-500 text-sm mt-1">Posted on {product.postedOn}</p>

//               <p className="text-3xl font-bold text-blue-600 mt-4">
//                 ₹{product.price.toLocaleString()}
//               </p>

//               {/* Seller Info */}
//               <div className="mt-6 flex items-center gap-4">
//                 <img
//                   src={product.seller.logo}
//                   alt={product.seller.name}
//                   className="w-14 h-14 border-2 border-blue-200"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     {product.seller.name}
//                     {product.seller.trusted && (
//                       <FaCheckCircle className="text-blue-500" title="Trusted Seller" />
//                     )}
//                   </h3>
//                   <p className="text-gray-600 text-sm flex items-center gap-1">
//                     <FaMapMarkerAlt /> {product.location}
//                   </p>
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                 <button className="flex-1 px-6 py-3 bg-blue-600 text-white shadow hover:bg-blue-700 transition">
//                   Buy Now
//                 </button>
//                 <a
//                   href={`tel:${product.seller.phone}`}
//                   className="flex items-center justify-center gap-2 flex-1 px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
//                 >
//                   <FaPhoneAlt /> Contact Seller
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Description & Specs + Shop Details on the side */}
//         <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white p-6 shadow-md">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Description</h2>
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             </div>

//             <div className="bg-white p-6 shadow-md">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-gray-700">
//                 {Object.entries(product.specs).map(([key, value]) => (
//                   <div key={key} className="flex justify-between border-b pb-2">
//                     <span className="font-medium capitalize">{key}</span>
//                     <span>{value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Shop Details (replacing reviews) */}
//           <div className="bg-white p-6 shadow-md flex flex-col items-center md:items-start">
//             <img
//               src={shop.logo}
//               alt={shop.name}
//               className="w-24 h-24 object-cover border-4 border-blue-200 mb-4"
//             />
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
//               {shop.name}
//               {shop.trusted && (
//                 <FaCheckCircle className="text-blue-500 w-6 h-6" title="Trusted Seller" />
//               )}
//             </h2>
//             <p className="text-gray-600 mt-2">{shop.description}</p>
//           </div>
//         </div>

//         {/* Store Location Map */}
//         <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-10">
//           <div className="bg-white p-6 shadow-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Store Location</h2>
//             <iframe
//               title="Store Location"
//               src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
//                 product.location
//               )}`}
//               width="100%"
//               height="400"
//               allowFullScreen
//               loading="lazy"
//               className="border"
//             ></iframe>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default StoreProductD;












































// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import axios from "axios";

// const StoreProductD = () => {
//   const { id } = useParams(); // product id from URL
//   const [product, setProduct] = useState(null);
//   const [shop, setShop] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/store/all-ads/${id}`);
//         setProduct(res.data);

//         // Set first image as main image
//         if (res.data.images && res.data.images.length > 0) {
//           setMainImage(res.data.images[0]);
//         }

//         // Optionally fetch seller/store info if needed
//         if (res.data.storeId) {
//           const storeRes = await axios.get(`http://localhost:5000/api/stores/${res.data.storeId}`);
//           setShop(storeRes.data);
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
//           Loading product details...
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!product) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-red-600">
//           Product not found
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-50 min-h-screen py-8">
//         <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Product Images */}
//           <div className="flex flex-col">
//             <div className="bg-white shadow-md">
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//             <div className="flex gap-3 mt-4 overflow-x-auto">
//               {product.images?.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt={`thumbnail-${i}`}
//                   onClick={() => setMainImage(img)}
//                   className={`w-24 h-20 object-cover cursor-pointer border-2 ${
//                     mainImage === img ? "border-blue-500" : "border-gray-200"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="flex flex-col justify-between">
//             <div className="bg-white p-6 shadow-md">
//               <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
//               <p className="text-gray-500 text-sm mt-1">
//                 Posted on {new Date(product.createdAt).toLocaleDateString()}
//               </p>

//               <p className="text-3xl font-bold text-blue-600 mt-4">
//                 ₹{product.price.toLocaleString()}
//               </p>

//               {/* Seller Info */}
//               {shop && (
//                 <div className="mt-6 flex items-center gap-4">
//                   <img
//                     src={shop.logo || "https://via.placeholder.com/100"}
//                     alt={shop.name}
//                     className="w-14 h-14 border-2 border-blue-200"
//                   />
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                       {shop.name}
//                       {shop.trusted && (
//                         <FaCheckCircle className="text-blue-500" title="Trusted Seller" />
//                       )}
//                     </h3>
//                     <p className="text-gray-600 text-sm flex items-center gap-1">
//                       <FaMapMarkerAlt /> {product.location || "Not specified"}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* CTA Buttons */}
//               <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                 <button className="flex-1 px-6 py-3 bg-blue-600 text-white shadow hover:bg-blue-700 transition">
//                   Buy Now
//                 </button>
//                 {shop?.phone && (
//                   <a
//                     href={`tel:${shop.phone}`}
//                     className="flex items-center justify-center gap-2 flex-1 px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
//                   >
//                     <FaPhoneAlt /> Contact Seller
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Description & Specs */}
//         <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white p-6 shadow-md">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Description</h2>
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             </div>

//             {product.specs && (
//               <div className="bg-white p-6 shadow-md">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-gray-700">
//                   {Object.entries(product.specs).map(([key, value]) => (
//                     <div key={key} className="flex justify-between border-b pb-2">
//                       <span className="font-medium capitalize">{key}</span>
//                       <span>{value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Shop Details */}
//           {shop && (
//             <div className="bg-white p-6 shadow-md flex flex-col items-center md:items-start">
//               <img
//                 src={shop.logo || "https://via.placeholder.com/100"}
//                 alt={shop.name}
//                 className="w-24 h-24 object-cover border-4 border-blue-200 mb-4"
//               />
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
//                 {shop.name}
//                 {shop.trusted && (
//                   <FaCheckCircle className="text-blue-500 w-6 h-6" title="Trusted Seller" />
//                 )}
//               </h2>
//               <p className="text-gray-600 mt-2">{shop.description}</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default StoreProductD;


























import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const StoreProductD = () => {
  const location = useLocation();
  const { product, shop } = location.state || {};
  const [mainImage, setMainImage] = useState(product?.images[0] || "");

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-red-600">
          Product details not available
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        {/* Top Section: Images + Product Info */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="flex flex-col">
            <div className="bg-white shadow-md">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-100 object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumbnail-${i}`}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-20 object-cover cursor-pointer border-2 ${
                    mainImage === img ? "border-blue-500" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div className="bg-white p-6 shadow-md">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-gray-500 text-sm mt-1">
                Posted on {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-4">
                ₹{product.price.toLocaleString()}
              </p>

              {/* Seller Info */}
              {shop && (
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={shop.logo || "https://via.placeholder.com/100"}
                    alt={shop.name}
                    className="w-14 h-14 border-2 border-blue-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      {shop.name}
                      {shop.trusted && (
                        <FaCheckCircle className="text-blue-500" title="Trusted Seller" />
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      <FaMapMarkerAlt /> {product.location || "Not specified"}
                    </p>
                    {shop.phone && (
                      <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                        <FaPhoneAlt /> {shop.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white shadow hover:bg-blue-700 transition">
                  Buy Now
                </button>
                {shop?.phone && (
                  <a
                    href={`tel:${shop.phone}`}
                    className="flex items-center justify-center gap-2 flex-1 px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                  >
                    <FaPhoneAlt /> Contact Seller
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Description + Specs + Shop Card */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Description & Specs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.specs && (
              <div className="bg-white p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-gray-700">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium capitalize">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shop Details */}
          {shop && (
            <div className="bg-white p-6 shadow-md flex flex-col items-center md:items-start">
              <img
                src={shop.logo || "https://via.placeholder.com/100"}
                alt={shop.name}
                className="w-24 h-24 object-cover border-4 border-blue-200 mb-4"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                {shop.name}
                {shop.trusted && (
                  <FaCheckCircle className="text-blue-500 w-6 h-6" title="Trusted Seller" />
                )}
              </h2>
              <p className="text-gray-600 mt-2">{shop.description}</p>
            </div>
          )}
        </div>

        {/* Optional: Map (if you want) */}
        {product.location && (
          <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-10">
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Store Location</h2>
              <iframe
                title="Store Location"
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
                  product.location
                )}`}
                width="100%"
                height="400"
                allowFullScreen
                loading="lazy"
                className="border"
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default StoreProductD;
