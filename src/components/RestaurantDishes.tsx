import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import React, { FC } from "react";
import { Dish } from "../features/types";

type RestaurantDishesProps = {
  dishes: Dish[];
};

const RestaurantDishes: FC<RestaurantDishesProps> = ({ dishes }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart!");
  };

  return (
    <>
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
                <button
                  onClick={() => handleAddToCart({ dish })}
                  className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white font-bold p-2 px-6 rounded-md absolute shadow-md left-[50%] -bottom-5 -translate-x-[50%]"
                >
                  ADD
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default RestaurantDishes;
