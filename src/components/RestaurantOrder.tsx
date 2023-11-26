import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBooking } from "../features/cart/bookingSlice";
import toast from "react-hot-toast";

const RestaurantOrder = () => {
  const [tables, setTables] = useState<number>(1);
  const [date, setDate] = useState<string>("");

  const dispatch = useDispatch();

  const handleOnclick = () => {
    if (tables === 0) {
      toast.error("Please choose at least one table!");
      return;
    }

    dispatch(setBooking({ date, tables }));
    toast.success(
      `Booked ${tables} ${tables > 1 ? "tables" : "table"} on ${date}!`
    );
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-base font-medium">Tables:</span>
        <input
          onChange={(e) => {
            const text = e.target.value;
            setTables(parseInt(text));
          }}
          type="number"
          defaultValue={1}
          className="w-10 border rounded text-center"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base font-medium">Date:</span>
        <input
          type="date"
          className="border rounded text-center"
          onChange={(e) => {
            const text = e.target.value;
            setDate(text);
          }}
        />
      </div>
      <button
        className="bg-orange-400 text-white py-1 px-4 rounded-md items-center gap-2 hidden md:flex"
        onClick={handleOnclick}
      >
        Book tables
      </button>
    </div>
  );
};

export default RestaurantOrder;
