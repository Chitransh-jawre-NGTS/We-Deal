import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import FilterBar from "../../components/FilterBar";

// Reuse the featuredItemsData array
const featuredItemsData = [
  { title: "iPhone 14 Pro", price: 90000, date: "2025-09-10", image: "https://picsum.photos/400/300?random=1", featured: true, location: "Seoni, Madhya Pradesh" },
  { title: "Maruti Swift", price: 500000, date: "2025-09-08", image: "https://picsum.photos/400/300?random=2", featured: false, location: "Indore, Madhya Pradesh" },
  { title: "Sofa Set", price: 15000, date: "2025-09-05", image: "https://picsum.photos/400/300?random=3", featured: true, location: "Bhopal, Madhya Pradesh" },
  { title: "Laptop Dell XPS", price: 120000, date: "2025-09-12", image: "https://picsum.photos/400/300?random=4", featured: false, location: "Jabalpur, Madhya Pradesh" },
  // ... add the rest of your products
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchInput, setSearchInput] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      const filtered = featuredItemsData.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sortedItems = [...results];

    if (option === "priceLowHigh") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighLow") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (option === "dateNewOld") {
      sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "dateOldNew") {
      sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setResults(sortedItems);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`);
  };

  return (
    <>
      <Navbar showMobileMenu={false} />

      {/* Top Bar with Back button and Search */}
      <div className=" flex bg-white md-hidden  sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-inner">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for products or locations..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </form>
      </div>

      <FilterBar sortOption={sortOption} handleSort={handleSort} />

      <section className="pb-8 md:py-16 px-4 md:px-16 max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        {/* <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
  
        </aside> */}

        {/* Listings */}
        <main className="flex-1 flex flex-col gap-6">
          <h1 className="text-xl font-semibold mb-4">
            Here what we found  for "{query}"
          </h1>

          {results.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
              {results.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="relative bg-white border p-2 border-gray-500 shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 transform">
                    {item.featured && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <FaHeart className="absolute top-5 right-3 text-white border-gray-500 text-lg cursor-pointer" />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 md:h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="md:p-4">
                      <h4 className="text-base md:text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-800 font-semibold text-sm md:text-base">
                        ₹{item.price.toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm mb-1">{item.location}</p>
                      <p className="text-gray-400 text-xs">Published: {item.date}</p>
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
