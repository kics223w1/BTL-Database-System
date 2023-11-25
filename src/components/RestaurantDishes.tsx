import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import React, { FC } from "react";
import { Dish } from "../features/types";
// @ts-ignore
import burger from "../../assets/dishes/burger.png";
// @ts-ignore
import pizza from "../../assets/dishes/pizza.png";

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
          const itemPrice = dish.price;
          const srcImage = index % 2 === 0 ? burger : pizza;

          return (
            <li
              className="p-2 py-8 flex gap-4 md:gap-8 justify-between items-center border-b"
              key={index}
            >
              <div className="basis-8/12 space-y-2">
                <h2 className="text-xl font-semibold">{dish.name}</h2>
                <p className="text-sm font-semibold">Price: {itemPrice} VND</p>
              </div>

              <div className="w-full basis-4/12 relative">
                <img
                  className="w-full aspect-video object-contain rounded-md"
                  src={srcImage}
                  alt=""
                />
                <button
                  onClick={() => handleAddToCart({ ...dish, itemPrice })}
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
