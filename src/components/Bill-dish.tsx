import React, { FC, useEffect } from "react";
import { Dish, DishInBill } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

type BillDishProps = {
  dish: Dish;
  handleClickUpdate: (dishID: string, quantity: number) => void;
};

const BillDish: FC<BillDishProps> = ({ dish, handleClickUpdate }) => {
  const [quantity, setQuantity] = React.useState<number>(0);

  return (
    <li className="flex gap-4 justify-between max-w-[600px] my-4">
      <div className="basis-3/12">
        <img
          className="w-full h-full md:h-auto object-cover block rounded-md aspect-square"
          src={dish.dish_img}
        />
      </div>
      <div className="basis-9/12">
        <p className="text-lg font-semibold">{dish.dish_name}</p>

        <p className="my-2 space-x-1">
          <span className="font-semibold">{dish.price} VND</span>
        </p>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <button
              onClick={() => {
                setQuantity(quantity - 1);
              }}
              disabled={quantity === 0}
              className={
                "bg-orange-500 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-bold w-8 h-8 rounded-md"
              }
            >
              -
            </button>
            <p className="font-bold w-8 h-8 flex justify-center items-center">
              {quantity}
            </p>
            <button
              className="bg-orange-500 text-white font-bold w-8 h-8 rounded-md"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              handleClickUpdate(dish.dish_id, quantity);
            }}
            className="border border-orange-500 text-xs font-semibold text-orange-500 p-2 px-4 rounded-md"
          >
            Update
          </button>
        </div>
      </div>
    </li>
  );
};

export default BillDish;
