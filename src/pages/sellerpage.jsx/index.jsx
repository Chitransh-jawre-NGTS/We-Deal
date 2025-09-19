import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaHeart } from "react-icons/fa";
import { productApi } from "../../api/product"; // your API file to fetch products
import { wishlistApi } from "../../api/wishlist"; // your wishlist API

const SellerPage = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);


  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        // Fetch all products
        const res = await productApi.getAll();
        const allProducts = res.data.products || [];

        // Filter products for this seller
        const sellerProducts = allProducts.filter(
          (p) => p.sellerId === sellerId
        );

        setProducts(sellerProducts);

        // Assuming seller info is included in first product for now
        if (sellerProducts.length > 0) {
          const sellerInfo = sellerProducts[0].seller; // If API gives seller info
          setSeller({
            name: sellerInfo?.name || "Seller Name",
            avatar: sellerInfo?.avatar || "/placeholder.png",
            verified: sellerInfo?.verified || false,
            memberSince: sellerInfo?.createdAt || sellerProducts[0].createdAt,
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch seller data:", err);
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [sellerId]);
    useEffect(() => {
  const fetchWishlist = async () => {
    try {
      const res = await wishlistApi.get(); // your API to get user's wishlist
      setWishlist(res.data.products.map(p => p._id));
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };
  fetchWishlist();
}, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading seller details...
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Seller not found
      </div>
    );
  }


   const toggleWishlist = async (productId) => {
      try {
        if (wishlist.includes(productId)) {
          const res = await wishlistApi.remove(productId);
          setWishlist(res.data.products.map(p => p._id));
        } else {
          const res = await wishlistApi.add(productId);
          setWishlist(res.data.products.map(p => p._id));
        }
      } catch (err) {
        console.error("Error updating wishlist", err);
      }
    };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <div className="flex items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition mr-3"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Seller Details</h1>
      </div>

      {/* Seller Info */}
      <div className="bg-white p-6 shadow-md flex items-center gap-4 mt-4 mx-4 rounded-xl">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {seller.name}{" "}
            {seller.verified && <FaCheckCircle className="text-blue-500" />}
          </h2>
          <p className="text-gray-500 text-sm">
            Member since: {new Date(seller.memberSince).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Seller Products */}
      <section className="mt-6 px-4 md:px-16 max-w-7xl mx-auto">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Products by {seller.name}
        </h3>

        {products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((item) => (
            <div
                             key={item._id}
                             className="relative bg-white border p-2 border-blue-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
                           >
                             <FaHeart
                               onClick={() => toggleWishlist(item._id)}
                               className={`absolute top-5 right-3 text-lg cursor-pointer transition ${wishlist.includes(item._id) ? "text-red-500" : "text-white"
                                 }`}
                             />
                             <img
                               src={item.images[0]}
                               alt={`${item.fields.Brand} ${item.fields.Model}`}
                               className="w-full h-40 md:h-48 object-cover"
                               loading="lazy"
                               onClick={() =>
                                 navigate(`/product/${item._id}`, { state: { product: item, allProducts: products } })
                               }
                             />
                             <div className="md:p-4">
                               <p className="text-gray-800 font-semibold text-lg md:text-base">
                                 {item.fields.Price
                                   ? `₹${Number(item.fields.Price).toLocaleString()}`
                                   : item.fields.Role || "N/A"}
                               </p>
           
                               <h4 className="text-base md:text-lg font-bold mb-1">
                                 {item.fields.Brand} {item.fields.Model}
                               </h4>
           
                               <p className="text-gray-500 text-sm mb-1">{item.fields.Year} {item.fields.Km}</p>
                               <p className="text-gray-400 text-xs">
                                 Published: {new Date(item.createdAt).toLocaleDateString()}
                               </p>
                             </div>
                           </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerPage;
