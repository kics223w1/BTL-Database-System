import { useSelector } from "react-redux";
import {
  selectItemsInCart,
  selectTotalPrice,
} from "../features/cart/cartSlice";
import { selectBooking } from "../features/cart/bookingSlice";
import React, { useEffect, useState } from "react";
import { Discount } from "../features/types";

const OrderSummary = () => {
  const [usedDiscounts, setUsedDiscounts] = useState<Discount[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  useEffect(() => {
    const discount1: Discount = {
      discount_id: "A242A",
      name: "Summer discount 10% off",
      value: 0.1,
    };
    const discount2: Discount = {
      discount_id: "1242A",
      name: "Summer discount 20% off",
      value: 0.2,
    };
    setDiscounts([discount1, discount2]);
  }, []);

  const totalPrice = useSelector(selectTotalPrice);
  const booking = useSelector(selectBooking);
  const discount =
    usedDiscounts.reduce((val, cur) => {
      return val + cur.value;
    }, 0) * totalPrice;
  const totalAmt = totalPrice - discount;

  return (
    <div className="flex flex-col gap-4 basis-5/12">
      <div className="h-fit p-8 rounded-md border shadow-md my-8">
        <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>

        {/* order details */}
        <div className="py-4 text-lg space-y-4 border-b">
          <div className="flex justify-between items-center font-semibold">
            <p className="font-normal">Price:</p>
            <p>{totalPrice} VND</p>
          </div>
          {usedDiscounts.map((discount, index) => {
            return (
              <div
                className="flex justify-between items-center font-semibold"
                key={`${index}_usedValue`}
              >
                <p className="font-normal">
                  Discount ({discount.value * 100}%)
                </p>
                <p> - {discount.value * totalPrice} VND</p>
              </div>
            );
          })}

          {usedDiscounts.length > 0 && (
            <p className="text-sm my-2">
              You'll save {discount.toFixed(0)} VND on this order 🎉
            </p>
          )}
        </div>

        <div className="py-4 border-b">
          <div className="md:flex justify-between items-center font-bold text-lg md:text-2xl gap-2">
            <h1>Total Amount</h1>
            <h1 className="text-orange-500">{totalAmt} VND</h1>
          </div>
        </div>

        <button className="w-full block mt-4 uppercase font-bold text-lg bg-orange-600 text-white text-center p-4 rounded-md">
          Place order
        </button>
      </div>

      {discounts.map((discount) => {
        const isUsed = usedDiscounts.some(
          (dis) => dis.discount_id === discount.discount_id
        );
        return (
          <div
            className="flex items-center justify-center gap-4 rounded-md border shadow-md p-4"
            key={discount.discount_id}
          >
            <span className="text-base font-medium"> 🎉 {discount.name}</span>
            <button
              className="bg-orange-600 rounded px-4 py-1 hover:bg-orange-400"
              onClick={() => {
                if (isUsed) {
                  setUsedDiscounts(
                    usedDiscounts.filter(
                      (dis) => dis.discount_id !== discount.discount_id
                    )
                  );
                } else {
                  setUsedDiscounts([...usedDiscounts, discount]);
                }
              }}
            >
              {isUsed ? "Remove this" : "Use this"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSummary;
