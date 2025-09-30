  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { FaCheckCircle } from "react-icons/fa";
  import Footer from "../../components/Footer";
  import Navbar from "../../components/Navbar";
  import axios from "axios";
  import StoreCarousel from "../../components/StoreCrousal";

  // Sample categories/brands
  const brands = ["Apple", "Samsung", "Xiaomi", "OnePlus", "Vivo", "Oppo"];

  const shop = {
    name: "NextGen Electronics",
    logo: "https://picsum.photos/100/100?random=50",
    trusted: true,
    description: "Your one-stop shop for used mobiles, bikes, and accessories. Trusted by thousands of customers.",
  };

  const Store = () => {
    const [mobiles, setMobiles] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState(50000);
    const [sortOrder, setSortOrder] = useState("lowToHigh");

    // Fetch products
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const res = await axios.get("http://localhost:5000/api/store/all-ads", {
            headers: {
              "x-store-token": localStorage.getItem("storeToken"),
            },
          });

          if (res.data.ads) {
            const featuredProducts = res.data.ads.filter((ad) => ad.price > 20000);
            const normalMobiles = res.data.ads.filter((ad) => ad.price <= 20000);

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
    }, []);

    // Handle brand filter
    const toggleBrand = (brand) => {
      setSelectedBrands((prev) =>
        prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
      );
    };

    // Filter and sort refurbished products
    const getFilteredProducts = (products) => {
      return products
        .filter(
          (p) =>
            (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
            p.price <= priceRange &&
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) =>
          sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
        );
    };

    const renderProducts = (products) => (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-6 mt-6">
      {products.map((product) => {
        const isFeatured = product.price > 20000; // ✅ mark featured condition

        return (
          <div
            key={product._id}
            className={`bg-white flex flex-col relative group overflow-hidden shadow-md transition hover:shadow-xl hover:scale-105 ${
              isFeatured ? "border-2 border-yellow-400" : "border border-blue-300"
            }`}
          >
            {/* Featured Badge */}
            {isFeatured && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                FEATURED
              </span>
            )}

            {/* Product Image */}
            <Link
              to={`/store/product/${product._id}`}
              className="flex justify-center items-center h-48 bg-gray-50 overflow-hidden"
            >
              <img
                src={product.images[0] || "https://via.placeholder.com/300"}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            {/* Product Details */}
            <div className="p-4  flex flex-col flex-1">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {product.brand} {product.model}
              </h2>
              <p className="text-gray-500 text-sm ">{product.storage} </p>
              {/* Price */}
              <p
                className={`font-bold text-lg mt-3 ${
                  isFeatured ? "text-yellow-600" : "text-blue-600"
                }`}
              >
                ₹{product.price.toLocaleString()}
              </p>
                
              <div className="flex items-center mt-2 gap-2">
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-800 font-medium text-sm">
                      {shop.name}
                    </span>
                    {shop.trusted && (
                      <FaCheckCircle
                        className="text-blue-500 w-4 h-4"
                        title="Trusted Seller"
                      />
                    )}
                  </div>
                </div>
              </div>
              
                  
                      <p className="text-gray-500 text-sm mb-1">seoni mp</p>

              {/* Button */}
              {/* <Link
                to={`/store/product/${product._id}`}
                className={`mt-4 px-5 py-2 text-white text-sm text-center rounded-lg shadow-md transition ${
                  isFeatured
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                View
              </Link> */}
            </div>
          </div>
        );
      })}
    </div>
  );


    return (
      <>
        <Navbar />
        <div className="bg-gray-50 min-h-screen">
          {/* Carousel */}
          <StoreCarousel />

          {/* Search Bar */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-center">
    {/* Heading */}
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
      Find Your Perfect Deal
    </h2>
    <p className="text-gray-500 mb-6">
      Browse cars, bikes, mobiles, furniture, and more…
    </p>

    {/* Search Box */}
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



          {/* Main Section with Sidebar */}
          <div className=" mx-auto px-4 md:px-6 pb-8 flex gap-6">
            {/* Sidebar Filters */}
            <aside className="w-64 hidden md:block bg-white rounded-xl p-6 shadow-lg sticky top-24 h-fit">
              <h3 className="text-xl font-bold mb-5 border-b pb-2 text-gray-700">Filters</h3>

              {/* Brand Filter */}
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

              {/* Price Filter */}
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

              {/* Sort Filter */}
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

            {/* Products Section */}
            <main className="flex-1">


            <main className="flex-1">
  <section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-800">Available Mobiles</h2>

  {loading ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border border-gray-500 rounded-lg p-4 animate-pulse">
          <div className="bg-gray-200 h-40 w-full mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  ) : (
    renderProducts([...featured, ...mobiles])
  )}
</section>

  </main>

            </main>
          </div>

          {/* Newsletter Signup */}
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
          <Footer />
        </div>
      </>
    );
  };

  export default Store;
