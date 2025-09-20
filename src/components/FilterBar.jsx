import React, { useState } from "react";

const FilterBar = ({ sortOption, handleSort }) => {
  const [showLeftOptions, setShowLeftOptions] = useState(false);
  const [showRightOptions, setShowRightOptions] = useState(false);

  // Define all options
  const leftOptions = [
    { label: "Price: Low to High", value: "priceLowHigh" },
    { label: "Price: High to Low", value: "priceHighLow" },
  ];

  const rightOptions = [
    { label: "Date: New to Old", value: "dateNewOld" },
    { label: "Date: Old to New", value: "dateOldNew" },
  ];

  // Get the currently selected option for left and right
  const leftSelected = leftOptions.find(o => o.value === sortOption) || leftOptions[0];
  const rightSelected = rightOptions.find(o => o.value === sortOption) || rightOptions[0];

  return (
    <div className="fixed bottom-0 md:hidden left-0 right-0 z-50 bg-white border border-gray-300 shadow-md px-4 py-3 flex justify-between items-center max-w-[1500px] mx-auto">
      {/* Left Filter */}
      <div className="relative">
        <button
          className="px-4 py-2 border rounded-md bg-blue-600 text-white"
          onClick={() => setShowLeftOptions(!showLeftOptions)}
        >
          {leftSelected.label}
        </button>

        {showLeftOptions && (
          <div className="absolute mt-1 bg-white border rounded-md shadow-md w-max">
            {leftOptions
              .filter(o => o.value !== leftSelected.value) // exclude selected
              .map((o) => (
                <div
                  key={o.value}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleSort(o.value);
                    setShowLeftOptions(false);
                  }}
                >
                  {o.label}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Right Filter */}
      <div className="relative">
        <button
          className="px-4 py-2 border rounded-md bg-blue-600 text-white"
          onClick={() => setShowRightOptions(!showRightOptions)}
        >
          {rightSelected.label}
        </button>

        {showRightOptions && (
          <div className="absolute right-0 mt-1 bg-white border rounded-md shadow-md w-max">
            {rightOptions
              .filter(o => o.value !== rightSelected.value)
              .map((o) => (
                <div
                  key={o.value}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleSort(o.value);
                    setShowRightOptions(false);
                  }}
                >
                  {o.label}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
