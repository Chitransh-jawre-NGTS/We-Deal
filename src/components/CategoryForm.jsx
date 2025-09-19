// // src/pages/CategoryForm.jsx
// import React, { useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { categoryData } from "../data/categoryFields";

// const CategoryForm = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const category = categoryData[slug];

//   const [formValues, setFormValues] = useState({});
//   const [error, setError] = useState("");

//   const handleChange = (field, value) => {
//     setFormValues((prev) => ({
//       ...prev,
//       [field]: value,
//       ...(field === "Brand" ? { Model: "" } : {}), // reset dependent field
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // ✅ Check all required fields
//     for (let field of category.fields) {
//       if (!formValues[field.name] || formValues[field.name].trim() === "") {
//         setError(`Please fill out the ${field.name} field.`);
//         return;
//       }
//     }

//     setError(""); // clear error if valid

//     // ✅ Get coordinates from localStorage
//     const coords = JSON.parse(localStorage.getItem("coords")) || null;

//     navigate("/upload-images", { 
//       state: { 
//         formValues, 
//         category: slug,
//         coords   // ✅ pass coordinates also
//       } 
//     });
//   };

//   if (!category) {
//     return <p className="p-4">Invalid category</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Topbar */}
//       <header className="flex items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
//         <Link
//           to="/sell"
//           className="p-2 rounded-full hover:bg-gray-100 transition mr-3"
//         >
//           <FaArrowLeft className="text-gray-700 text-lg" />
//         </Link>
//         <h1 className="text-lg font-semibold capitalize text-gray-800">
//           {slug.replace(/-/g, " ")}
//         </h1>
//       </header>

//       {/* Dynamic Form */}
//       <div className="p-4">
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5 bg-white p-6 rounded-2xl shadow-md"
//         >
//           {category.fields.map((field, idx) => {
//             // Dependent Select
//             if (field.type === "select" && field.dependsOn) {
//               const parentValue = formValues[field.dependsOn];
//               const options = parentValue
//                 ? field.options[parentValue] || []
//                 : [];

//               return (
//                 <div key={idx} className="flex flex-col">
//                   <label className="text-sm font-medium text-gray-700 mb-1">
//                     {field.name} <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     required
//                     value={formValues[field.name] || ""}
//                     onChange={(e) => handleChange(field.name, e.target.value)}
//                     className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
//                     disabled={!parentValue}
//                   >
//                     <option value="">Select {field.name}</option>
//                     {options.map((opt, i) => (
//                       <option key={i} value={opt}>
//                         {opt}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               );
//             }

//             // Normal Select
//             if (field.type === "select") {
//               return (
//                 <div key={idx} className="flex flex-col">
//                   <label className="text-sm font-medium text-gray-700 mb-1">
//                     {field.name} <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     required
//                     value={formValues[field.name] || ""}
//                     onChange={(e) => handleChange(field.name, e.target.value)}
//                     className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                   >
//                     <option value="">Select {field.name}</option>
//                     {field.options.map((opt, i) => (
//                       <option key={i} value={opt}>
//                         {opt}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               );
//             }

//             // Text input
//             return (
//               <div key={idx} className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   {field.name} <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formValues[field.name] || ""}
//                   onChange={(e) => handleChange(field.name, e.target.value)}
//                   placeholder={`Enter ${field.name}`}
//                   className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                 />
//               </div>
//             );
//           })}

//           {/* Error Message */}
//           {error && (
//             <p className="text-red-600 text-sm font-medium">{error}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-transform shadow"
//           >
//             Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CategoryForm;


// src/pages/CategoryForm.jsx
















import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { categoryData } from "../data/categoryFields";

const CategoryForm = ({ userLocation }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = categoryData[slug];

  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    // ✅ Try localStorage coords first
    const storedCoords = JSON.parse(localStorage.getItem("coords")) || null;
    if (storedCoords) {
      setCoords(storedCoords);
    } else if (userLocation) {
      // ✅ Fallback: geocode userLocation to get coords
      (async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              userLocation
            )}&format=json`
          );
          const data = await res.json();
          if (data[0]) {
            setCoords({
              longitude: parseFloat(data[0].lon),
              latitude: parseFloat(data[0].lat),
            });
          }
        } catch (err) {
          console.error("Failed to get coordinates:", err);
        }
      })();
    }
  }, [userLocation]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "Brand" ? { Model: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let field of category.fields) {
      if (!formValues[field.name] || formValues[field.name].trim() === "") {
        setError(`Please fill out the ${field.name} field.`);
        return;
      }
    }

    setError("");
    navigate("/upload-images", {
      state: { formValues, category: slug, coords },
    });
  };

  if (!category) return <p className="p-4">Invalid category</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Topbar */}
      <header className="flex items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
        <Link to="/sell" className="p-2 rounded-full hover:bg-gray-100 transition mr-3">
          <FaArrowLeft className="text-gray-700 text-lg" />
        </Link>
        <h1 className="text-lg font-semibold capitalize text-gray-800">
          {slug.replace(/-/g, " ")}
        </h1>
      </header>

      {/* Form */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-md">
           {category.fields.map((field, idx) => {
            // Dependent Select
            if (field.type === "select" && field.dependsOn) {
              const parentValue = formValues[field.dependsOn];
              const options = parentValue
                ? field.options[parentValue] || []
                : [];

              return (
                <div key={idx} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {field.name} <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formValues[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
                    disabled={!parentValue}
                  >
                    <option value="">Select {field.name}</option>
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // Normal Select
            if (field.type === "select") {
              return (
                <div key={idx} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {field.name} <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formValues[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">Select {field.name}</option>
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // Text input
            return (
              <div key={idx} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {field.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formValues[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={`Enter ${field.name}`}
                  className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            );
          })}
          {/* Add this just before the submit button */}
<div className="flex flex-col">
  <label className="text-sm font-medium text-gray-700 mb-1">
    Description <span className="text-red-500">*</span>
  </label>
  <textarea
    required
    value={formValues.description || ""}
    onChange={(e) => handleChange("description", e.target.value)}
    placeholder="Enter a detailed description about your product or ad..."
    className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
    rows={4}
  />
</div>



          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-transform shadow"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
