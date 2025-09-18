import React from "react";
import { ArrowLeft } from "lucide-react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const LocationSelector = ({
  location,
  setLocation,
  setShowLocationPage,
  getLocation,
  currentLocation,
}) => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b shadow-sm">
        <button onClick={() => setShowLocationPage(false)}>
          <ArrowLeft className="text-xl text-gray-700" />
        </button>
        <h2 className="text-lg font-semibold">Choose Location</h2>
      </div>

      <div className="p-4">
        <div className="flex items-center border rounded-full px-3 py-2 shadow-sm">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search city, area..."
            className="flex-1 outline-none text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={getLocation} // uses Navbar's getLocation
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FaMapMarkerAlt />
          Detect My Current Location
        </button>
      </div>

      {currentLocation && location && (
        <div className="px-4 py-2 text-gray-700 text-sm">
          <p className="mt-4">📍 {location}</p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
