import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

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

// Example products mapped by category
const productsByCategory = {
  mobiles: [
    {
      title: "iPhone 14 Pro",
      price: "₹90,000",
      image: "https://picsum.photos/600/400?random=21",
      description: "A powerful phone with A16 Bionic chip, 6.1-inch display, and advanced camera system.",
      highlights: [
        "A16 Bionic chip",
        "6.1-inch Super Retina XDR display",
        "48MP Main Camera with ProRAW",
        "Face ID security",
        "Up to 28 hours of battery life",
      ],
      fullDescription:
        "The iPhone 14 Pro delivers cutting-edge performance with its A16 Bionic chip, a stunning 6.1-inch display, and an advanced camera system for photography and videography. Perfect for tech enthusiasts and professional users.",
    },
    // Add more products...
  ],
  cars: [
    {
      title: "Maruti Swift",
      price: "₹5,00,000",
      image: "https://picsum.photos/600/400?random=31",
      description: "Compact and efficient car, perfect for city drives with excellent mileage.",
      highlights: [
        "Fuel-efficient petrol engine",
        "Compact and stylish design",
        "Automatic transmission option",
        "Comfortable interiors",
      ],
      fullDescription:
        "The Maruti Swift is ideal for urban commuting, offering a fuel-efficient engine, smooth handling, and modern interiors. Perfect for first-time car owners and city driving.",
    },
    // Add more cars...
  ],
  furniture: [
    {
      title: "Sofa Set",
      price: "₹15,000",
      image: "https://picsum.photos/600/400?random=41",
      description: "Comfortable 3-piece sofa set with modern design and high-quality fabric.",
      highlights: [
        "High-quality fabric",
        "Modern and stylish design",
        "Durable wooden frame",
        "Easy to clean and maintain",
      ],
      fullDescription:
        "This sofa set offers a perfect blend of comfort and style. It features a durable wooden frame, soft cushions, and a sleek modern design to complement any living room.",
    },
  ],
};

const ProductDescription = () => {
  const { category, productId } = useParams();
  const product = productsByCategory[category]?.[productId];
  const recommendedProducts =
    productsByCategory[category]?.filter((_, idx) => idx !== Number(productId)) || [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-sans">
        Product not found.
      </div>
    );
  }

  return (
   <>
      <Navbar />
    <div className="min-h-screen bg-gray-50 font-sans pb-24"> {/* pb-24 for bottom fixed buttons */}

      <section className="py-8 md:py-16 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white hidden md:block rounded-xl shadow p-4">
            <h4 className="font-bold text-lg mb-4 text-purple-700">Categories</h4>
            <ul className="space-y-2 text-gray-700 text-sm md:text-base">
              {categoriesList.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    to={`/category/${cat.toLowerCase()}`}
                    className="hover:text-purple-600 transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl hidden md:block shadow p-4 space-y-3">
            <h4 className="font-bold text-lg text-purple-700">Sponsored Ads</h4>
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 h-32 md:h-40 flex items-center justify-center text-gray-500 rounded-lg text-sm md:text-base"
              >
                Google Ad Space
              </div>
            ))}
          </div>
        </aside>

        {/* Product Details */}
        <main className="flex-1 flex flex-col gap-8">

          {/* Main Product Info */}
          <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>

            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-purple-800">{product.title}</h2>
              <p className="text-2xl md:text-3xl text-purple-600 font-semibold">{product.price}</p>
              <p className="text-gray-700 text-sm md:text-base">{product.description}</p>

              {/* Highlights */}
              <div>
                <h3 className="text-xl font-bold text-purple-700 mt-4 mb-2">Product Highlights</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {product.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Full Description */}
              <div>
                <h3 className="text-xl font-bold text-purple-700 mt-4 mb-2">Description</h3>
                <p className="text-gray-700 text-sm md:text-base">{product.fullDescription}</p>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Recommended Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {recommendedProducts.map((item, idx) => (
                  <Link key={idx} to={`/product/${category}/${idx}`}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 md:h-48 object-cover"
                      />
                      <div className="p-3 md:p-4">
                        <h4 className="text-base md:text-lg font-bold mb-1">{item.title}</h4>
                        <p className="text-purple-600 font-semibold text-sm md:text-base">{item.price}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </main>
      </section>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t p-4 flex justify-center gap-4 z-50">
        <button className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition">
          Make a Deal
        </button>
        <button className="flex-1 px-6 py-3 bg-white border border-purple-600 text-purple-600 font-semibold rounded hover:bg-purple-50 transition">
          Chat with Seller
        </button>
      </div>

    </div>
    </>
  );
};

export default ProductDescription;
