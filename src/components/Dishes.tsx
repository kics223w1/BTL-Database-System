import React from "react";
import { Dish } from "../features/types";

const Dishes = ({ dishes }: { dishes: Dish[] }) => {
  return (
    <ul className="p-4">
      {dishes.map((dish, index) => {
        return (
          <li
            className="p-2 py-8 flex gap-4 md:gap-8 justify-between items-center border-b"
            key={index}
          >
            <div className="basis-8/12 space-y-2 flex flex-col gap-1">
              <h2 className="text-xl font-semibold">{dish.dish_name}</h2>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">Price:</span>
                <span className="text-sm font-medium">{dish.price} VND</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">Type:</span>
                <span className="text-sm font-medium">{dish.dish_type}</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">ID:</span>
                <span className="text-sm font-medium">{dish.dish_id}</span>
              </div>
            </div>

            <div className="w-full basis-4/12 relative">
              <img
                className="w-full aspect-video object-contain rounded-md"
                src={dish.dish_img}
                alt=""
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Dishes;
