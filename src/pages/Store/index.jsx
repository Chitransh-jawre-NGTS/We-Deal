import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StoreCarousel from "../../components/StoreCrousal";
import { getAllAds } from "../../api/storeApi/store"; // API call
import BannerCarousel from "../../components/AdBanner";

// Utility function to calculate distance between two coordinates
const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const brands = ["Apple", "Samsung", "Xiaomi", "OnePlus", "Vivo", "Oppo"];

const Store = () => {
  const [mobiles, setMobiles] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [userLocation, setUserLocation] = useState(null);

  // Detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Location access denied:", err);
          setUserLocation(null);
        }
      );
    }
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllAds();
        if (data.ads) {
          let adsWithDistance = data.ads;

          if (userLocation) {
            adsWithDistance = data.ads.map((ad) => {
              if (ad.store?.latitude && ad.store?.longitude) {
                const distance = getDistanceInKm(
                  userLocation.latitude,
                  userLocation.longitude,
                  ad.store.latitude,
                  ad.store.longitude
                );
                return { ...ad, distance };
              }
              return { ...ad, distance: Infinity };
            });
          }

          const featuredProducts = adsWithDistance.filter((ad) => ad.price > 20000);
          const normalMobiles = adsWithDistance.filter((ad) => ad.price <= 20000);

          setFeatured(featuredProducts);
          setMobiles(normalMobiles);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [userLocation]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const getFilteredProducts = (products) =>
    products
      .filter(
        (p) =>
          (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
          p.price <= priceRange &&
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
      );

  const renderProducts = (products) => (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-6 mt-6">
      {products.map((product) => {
        const isFeatured = product.price > 20000;
        const store = product.store || {};
        const hasDelivery = product.deliveryAvailable;

        return (
          <div
            key={product._id}
            className={`bg-white flex flex-col relative group overflow-hidden shadow-md transition hover:shadow-xl hover:scale-105 ${
              isFeatured ? "border-2 border-yellow-400" : "border border-blue-300"
            }`}
          >
            {isFeatured && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                FEATURED
              </span>
            )}

            <Link
              to={`/store/product/${product._id}`}
              state={{ product, shop: store }}
              className="flex justify-center items-center h-48 bg-gray-50 overflow-hidden"
            >
              <img
                src={product.images[0] || "https://via.placeholder.com/300"}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {product.brand} {product.model}
              </h2>
              <p className="text-gray-500 text-sm">{product.storage}</p>

              <p
                className={`font-bold text-lg mt-3 ${
                  isFeatured ? "text-yellow-600" : "text-blue-600"
                }`}
              >
                ₹{product.price.toLocaleString()}
              </p>

              <div className="flex items-center mt-2 gap-2">
                <img
                  src={store.logo || "https://via.placeholder.com/50"}
                  alt={store.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-800 font-medium text-sm">{store.name}</span>
                    {store.trusted && (
                      <FaCheckCircle
                        className="text-blue-500 w-4 h-4"
                        title="Trusted Seller"
                      />
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm mb-1">
                {store.location || "Location not specified"}
              </p>

              <div className="flex items-center mt-1">
                {hasDelivery ? (
                  <span className="flex items-center text-green-600 text-sm font-medium">
                    <FaTruck className="mr-1" /> Delivery Available
                  </span>
                ) : (
                  <span className="flex items-center text-red-500 text-sm font-medium">
                    <FaTimesCircle className="mr-1" /> Delivery Not Available
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const allProducts = getFilteredProducts([...featured, ...mobiles]);
  const nearbyProducts = allProducts.filter((p) => p.distance <= 5);
  const under10kmProducts = allProducts.filter((p) => p.distance > 5 && p.distance <= 10);
  const under50kmProducts = allProducts.filter((p) => p.distance > 10 && p.distance <= 50);

  const renderSection = (title, products) => (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">{title}</h3>
      {products.length > 0 ? (
        renderProducts(products)
      ) : (
        <div className="text-center py-8 bg-gray-100 rounded-xl shadow">
          <h4 className="text-lg font-semibold text-gray-700">
            No products available in this area
          </h4>
          <p className="text-gray-500">Our stores are coming soon! Stay tuned.</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <StoreCarousel />

        <section className="max-w-4xl mx-auto px-4 md:px-6 pb-10 lg:py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Find Your Perfect Deal
          </h2>
          <p className="text-gray-500 mb-6">
            Browse cars, bikes, mobiles, furniture, and more…
          </p>
          <div className="flex justify-center items-center w-full max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-md"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-r-full transition-all shadow-lg">
              Search
            </button>
          </div>
        </section>

        <div className="mx-auto px-4 md:px-6 pb-8 flex gap-6">
          <aside className="w-64 hidden md:block bg-white rounded-xl p-6 shadow-lg sticky top-24 h-fit">
            <h3 className="text-xl font-bold mb-5 border-b pb-2 text-gray-700">Filters</h3>
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-gray-600">Brand</h4>
              <ul className="flex flex-col gap-2">
                {brands.map((brand, i) => (
                  <li key={i}>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        value={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="accent-blue-500"
                      />
                      {brand}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-gray-600">Max Price: ₹{priceRange}</h4>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-gray-600">Sort by Price</h4>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </aside>

          <main className="flex-1">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800">Available Mobiles</h2>
              {loading ? (
                [...Array(8)].map((_, i) => (
                  <div key={i} className="border border-gray-500 rounded-lg p-4 animate-pulse mt-4">
                    <div className="bg-gray-200 h-40 w-full mb-4 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))
              ) : userLocation ? (
                <>
                  {renderSection("Nearby Products (within 5 km)", nearbyProducts)}
                  {renderSection("Products under 10 km", under10kmProducts)}
                  {renderSection("Products under 50 km", under50kmProducts)}
                </>
              ) : renderSection("All Products", allProducts)}
            </section>
          </main>
        </div>

        <section className="mb-10 max-w-300 mx-auto bg-gray-100 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">Subscribe to Our Newsletter</h2>
          <p className="text-gray-700 mt-2">Get updates on latest products and offers.</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 flex-1"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </section>

        <BannerCarousel />
        <Footer />
      </div>
    </>
  );
};

export default Store;
