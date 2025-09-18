import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import { productApi } from "../../api/product";
import FilterBar from "../../components/FilterBar";
import Navbar from "../../components/Navbar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchInput, setSearchInput] = useState(query);
  const navigate = useNavigate();

  // Fetch all products from API
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await productApi.getAll();
      const products = Array.isArray(response.data.products)
        ? response.data.products
        : [];

      if (query) {
        // 1️⃣ First, try to match category (outside fields)
        const categoryMatches = products.filter(
          (p) => p.Category?.toLowerCase() === query // exact match
        );

        if (categoryMatches.length > 0) {
          setResults(categoryMatches);
        } else {
          // 2️⃣ If no category matches, search by Brand, Model, or location
          const filtered = products.filter(
            (p) =>
              p.fields.Brand.toLowerCase().includes(query) ||
              p.fields.Model.toLowerCase().includes(query) ||
              (p.location && p.location.toLowerCase().includes(query))
          );
          setResults(filtered);
        }
      } else {
        setResults(products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setResults([]);
    }
  };

  fetchProducts();
}, [query]);


  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sortedItems = [...results];

    if (option === "priceLowHigh") {
      sortedItems.sort((a, b) => Number(a.fields.Price) - Number(b.fields.Price));
    } else if (option === "priceHighLow") {
      sortedItems.sort((a, b) => Number(b.fields.Price) - Number(a.fields.Price));
    } else if (option === "dateNewOld") {
      sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === "dateOldNew") {
      sortedItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setResults(sortedItems);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`);
  };

  return (
    <>
      <Navbar ShowMobileTop={false}/>
     <div className="flex items-center bg-white sticky top-0 z-50 px-4 py-3 shadow-md">
  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="p-2 rounded-full hover:bg-gray-100 transition"
  >
    <FaArrowLeft className="text-gray-700 text-lg" />
  </button>

  {/* Search Form */}
  <form
    onSubmit={handleSearchSubmit}
    className="flex-1 relative flex items-center ml-3"
  >
    <FaSearch className="absolute left-3 text-gray-400 pointer-events-none" />
    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder="Search for products or locations..."
      className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-inner"
    />
    {searchInput && (
      <button
        type="button"
        onClick={() => setSearchInput("")}
        className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
      >
        <FaTimes />
      </button>
    )}
  </form>
</div>

      <FilterBar sortOption={sortOption} handleSort={handleSort} />

      <section className="pb-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className="text-xl font-semibold mb-4">
            Here’s what we found for "{query}"
          </h1>

          {results.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
              {results.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div
                    onClick={() =>
                      navigate(`/product/${item._id}`, {
                        state: { product: item, allProducts: results },
                      })
                    }
                    className="relative bg-white border p-2 border-gray-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform"
                  >
                    {item.featured && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <FaHeart className="absolute top-5 right-3 text-white border-gray-500 text-lg cursor-pointer" />
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={`${item.fields.Brand} ${item.fields.Model}`}
                      className="w-full h-40 md:h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="md:p-4">
                      <h4 className="text-base md:text-lg font-bold mb-1">
                        {item.fields.Brand} {item.fields.Model}
                      </h4>
                      <p className="text-gray-800 font-semibold text-sm md:text-base">
                        ₹{Number(item.fields.Price).toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm mb-1">{item.location}</p>
                      <p className="text-gray-400 text-xs">
                        Published: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {(idx + 1) % 6 === 0 && (
                    <div className="col-span-full w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 text-lg md:text-xl font-semibold">
                      Advertisement Banner
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default SearchPage;
