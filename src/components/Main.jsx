import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { productApi } from "../api/product";
import { wishlistApi } from "../api/wishlist"; // your wishlist API
import httpClient from "../utils/httpClient"; // if using axios instance


const categoriesList = [
  "Mobiles",
  "Cars",
  "Furniture",
  "Jobs",
  "Fashion",
  "Electronics",
  "Home Appliances",
  "Sports",
];



const ListingsPage = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); // store wishlist product IDs
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        setProducts(Array.isArray(response.data.products) ? response.data.products : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await wishlistApi.get(); // GET /wishlist
        const productIds = res.data.products.map(p => p._id);
        setWishlist(productIds);
      } catch (err) {
        console.error("Error fetching wishlist", err);
      }
    };

    fetchWishlist();
  }, []);

  const handleSort = (option) => {
    setSortOption(option);
    const sortedItems = [...products];

    if (option === "priceLowHigh") {
      sortedItems.sort((a, b) => Number(a.fields.Price) - Number(b.fields.Price));
    } else if (option === "priceHighLow") {
      sortedItems.sort((a, b) => Number(b.fields.Price) - Number(a.fields.Price));
    } else if (option === "dateNewOld") {
      sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === "dateOldNew") {
      sortedItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setProducts(sortedItems);
  };

  // Toggle wishlist
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

  // Skeleton loader
  const ProductSkeleton = () => (
    <div className="animate-pulse bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
      <div className="h-40 md:h-48 bg-gray-200 w-full" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <section className="py-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">

        <div className="bg-white rounded-2xl hidden  lg:block shadow-xl p-6">
          <h4 className="font-extrabold text-xl mb-5 text-purple-700 tracking-wide">
            Categories
          </h4>
          <ul className="space-y-3">
            {categoriesList.map((cat, idx) => (
              <li key={idx}>
                <Link
                  to={`/search?query=${encodeURIComponent(cat.toLowerCase())}`}
                  className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg group"
                >
                  <span className="font-medium group-hover:font-semibold">{cat}</span>
                  <svg
                    className="w-4 h-4 text-purple-500 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-bold text-lg text-purple-700 mb-3">Sort Products</h4>
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="dateNewOld">Date: New to Old</option>
            <option value="dateOldNew">Date: Old to New</option>
          </select>
        </div>
      </aside>

      {/* Listings */}
      <main className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => <ProductSkeleton key={idx} />)
            : products.length > 0
              ? products.map((item) => (
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
              ))
              : <p className="text-gray-500 col-span-full">No products found</p>}
        </div>
      </main>
    </section>
  );
};

export default ListingsPage;
