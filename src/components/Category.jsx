import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Cars", imgSrc: "src/assets/images/categoryimage/swift-exterior-right-front-three-quarter-31.webp" },
  { name: "Bikes", imgSrc: "src/assets/images/categoryimage/yamaha-fz-x-ride-free-bike-500x500.webp" }, // new
  { name: "Mobiles", imgSrc: "src/assets/images/categoryimage/mobiles.webp" },
  { name: "Furniture", imgSrc: "src/assets/images/categoryimage/furniture.webp" },
  // { name: "Jobs", imgSrc: "src/assets/images/categoryimage/job.jpg" },
  { name: "Fashion", imgSrc: "src/assets/images/categoryimage/fashion.jpg" },
  { name: "Electronics", imgSrc: "src/assets/images/categoryimage/electronics.jpg" },
  { name: "Home Appliances", imgSrc: "src/assets/images/categoryimage/kitchen-appliances-banner.png" },
  { name: "Sports", imgSrc: "src/assets/images/categoryimage/sports.jpg" },
  { name: "Real Estate", imgSrc: "src/assets/images/categoryimage/0x0.webp" }, // new
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/categorydetails?category=${encodeURIComponent(category)}`);
  };



  return (
    <div className="bg-gray-50 font-sans">
      <section className="pt-2 md:pt-8 px-4 md:px-16 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-800 mb-4 md:mb-6">
          Explore Categories
        </h2>
        <p className="text-gray-700 text-sm md:text-lg max-w-xl md:max-w-2xl mx-auto mb-2">
          Browse through our categories to find what you are looking for. Click on any category to explore related items.
        </p>

        {/* Small & medium devices: infinite horizontal scroll carousel */}
        <div className="lg:hidden overflow-x-auto py-2 scroll-smooth snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleClick(cat.name)}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 w-32 flex flex-col items-center justify-center p-4 flex-shrink-0 snap-center"
              >
                <img
                  src={cat.imgSrc}
                  alt={cat.name}
                  className="w-16 h-16 mb-2 object-contain"
                />
                <h3 className="text-xs font-bold text-blue-700">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Large devices: grid layout */}
        <div className="hidden lg:grid grid-cols-4 gap-6 justify-items-center">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(cat.name)}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl hover:scale-105 w-88 flex flex-col items-center justify-center p-4"
            >
              <img
                src={cat.imgSrc}
                alt={cat.name}
                className="w-40 h-40 mb-2 object-contain"
              />
              <h3 className=" text-xl font-bold text-gray-700">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;




















// import React from "react";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   { name: "Mobiles", imgSrc: "src/assets/images/categoryimage/mobiles.webp" },
//   { name: "Cars", imgSrc: "src/assets/images/categoryimage/swift-exterior-right-front-three-quarter-31.webp" },
//   { name: "Furniture", imgSrc: "src/assets/images/categoryimage/furniture.webp" },
//   { name: "Jobs", imgSrc: "src/assets/images/categoryimage/job.jpg" },
//   { name: "Fashion", imgSrc: "src/assets/images/categoryimage/fashion.jpg" },
//   { name: "Electronics", imgSrc: "src/assets/images/categoryimage/electronics.jpg" },
//   { name: "Home Appliances", imgSrc: "src/assets/images/categoryimage/kitchen-appliances-banner.png" },
//   { name: "Sports", imgSrc: "src/assets/images/categoryimage/sports.jpg" },
// ];

// const Categories = () => {
//   const navigate = useNavigate();

//   const handleClick = (category) => {
//     navigate(`/categorydetails?category=${encodeURIComponent(category)}`);
//   };

//   // Duplicate categories for infinite scroll effect
//   const infiniteCategories = [...categories, ...categories];

//   return (
//     <div className="bg-gray-50 font-sans">
//       <section className="pt-6 md:pt-12 px-4 md:px-16 text-center">
//         <h2 className="text-3xl md:text-5xl font-extrabold text-blue-800 mb-4 md:mb-6">
//           Explore Categories
//         </h2>
//         <p className="text-gray-700 text-sm md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6">
//           Browse through our categories to find what you are looking for. Click on any category to explore related items.
//         </p>

//         {/* Small & medium devices: infinite horizontal scroll carousel */}
//         <div className="lg:hidden overflow-x-auto py-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
//           <div className="flex gap-4 px-2">
//             {infiniteCategories.map((cat, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => handleClick(cat.name)}
//                 className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl w-32 flex flex-col items-center justify-center p-4 flex-shrink-0 snap-center"
//               >
//                 <div className="w-20 h-20 mb-2 rounded-full overflow-hidden border border-gray-200 shadow-sm">
//                   <img
//                     src={cat.imgSrc}
//                     alt={cat.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition">
//                   {cat.name}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Large devices: grid layout */}
//         <div className="hidden lg:grid grid-cols-4 gap-8 justify-items-center mt-6">
//           {categories.map((cat, idx) => (
//             <div
//               key={idx}
//               onClick={() => handleClick(cat.name)}
//               className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl w-82 flex flex-col items-center justify-center p-5"
//             >
//               <div className="w-54 h-54 mb-3 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
//                 <img
//                   src={cat.imgSrc}
//                   alt={cat.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3 className="text-lg font-bold text-blue-700 hover:text-blue-900 transition">
//                 {cat.name}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Categories;
