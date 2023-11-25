// @ts-ignore
import pizza from "../../assets/dishes/pizza.png";
// @ts-ignore
import burger from "../../assets/dishes/burger.png";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
  selectItemsInCart,
} from "../features/cart/cartSlice";
import { CDN_URL } from "../utils/constants";
import React, { FC } from "react";
import { Dish } from "../features/types";

type CartItemListProps = {};

const CartItemList: FC<CartItemListProps> = () => {
  const cartItems = useSelector(selectItemsInCart);
  const dispatch = useDispatch();

  const removeItem = (id) => dispatch(removeFromCart({ id }));
  const decreaseQuantity = (id) => dispatch(decreaseItemQuantity({ id }));
  const increaseQuantity = (id) => dispatch(increaseItemQuantity({ id }));

  console.log("cart: ", cartItems);

  if (cartItems.length === 0 || !cartItems) {
    return (
      <div className="flex grow min-h-[60vh] justify-center items-center">
        <p>Your cart is empty!</p>
      </div>
    );
  }

  return (
    <ul className="basis-7/12">
      {cartItems.map((cardItem: any, index) => {
        const dish = cardItem.item;
        const quantity = cardItem.quantity;
        return (
          <li
            key={`CardItem_${index}`}
            className="flex gap-4 justify-between max-w-[600px] my-4"
          >
            <div className="basis-3/12">
              <img
                className="w-full h-full md:h-auto object-cover block rounded-md aspect-square"
                src={index % 2 === 0 ? pizza : burger}
                alt=""
              />
            </div>
            <div className="basis-9/12">
              <p className="text-lg font-semibold">{dish.name}</p>

              <p className="my-2 space-x-1">
                <span className="font-semibold">{dish.price} VND</span>
                <span className="text-gray-800 font-normal">
                  ({dish.price} × {quantity})
                </span>
              </p>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(dish.id)}
                    disabled={quantity === 1}
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
                    onClick={() => increaseQuantity(dish.id)}
                    className="bg-orange-500 text-white font-bold w-8 h-8 rounded-md"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(dish.id)}
                  className="border border-orange-500 text-xs font-semibold text-orange-500 p-2 px-4 rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CartItemList;
