import React from "react";

const RestaurantOrder = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-base font-medium">Quantity:</span>
        <input
          type="number"
          defaultValue={1}
          className="w-10 border rounded text-center"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base font-medium">Date:</span>
        <input type="date" className="border rounded text-center" />
      </div>
      <button className="bg-orange-400 text-white py-1 px-4 rounded-md items-center gap-2 hidden md:flex">
        Book table
      </button>
    </div>
  );
};

export default RestaurantOrder;
