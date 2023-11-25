import { useSelector } from "react-redux";
import {
  selectItemsInCart,
  selectTotalPrice,
} from "../features/cart/cartSlice";

const OrderSummary = () => {
  const totalPrice = useSelector(selectTotalPrice);
  const discount = totalPrice * 0.1;
  const totalAmt = totalPrice - discount;

  return (
    <div className="basis-5/12 h-fit sticky top-40 p-8 rounded-md border shadow-md my-8 md:m-0">
      <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>

      {/* order details */}
      <div className="py-4 text-lg space-y-4 border-b">
        <div className="flex justify-between items-center font-semibold">
          <p className="font-normal">Price:</p>
          <p>{totalPrice} VND</p>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <p className="font-normal">Discount (10%)</p>
          <p> - {discount} VND</p>
        </div>

        <p className="text-sm my-2">
          You'll save {discount} VND on this order 🎉
        </p>
      </div>

      <div className="py-4 border-b">
        <div className="md:flex justify-between items-center font-bold text-lg md:text-2xl">
          <h1>Total Amount</h1>
          <h1 className="text-orange-500">{totalAmt} VND</h1>
        </div>
      </div>

      <button className="w-full block mt-4 uppercase font-bold text-lg bg-orange-600 text-white text-center p-4 rounded-md">
        Place order
      </button>
    </div>
  );
};

export default OrderSummary;
