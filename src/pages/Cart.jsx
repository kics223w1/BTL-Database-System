import { useSelector } from "react-redux";
import CartItemList from "../components/CartItemList";
import OrderSummary from "../components/OrderSummary";
import { selectItemsInCart } from "../features/cart/cartSlice";
import { selectBooking } from "../features/cart/bookingSlice";

const Cart = () => {
  const cartItems = useSelector(selectItemsInCart);
  const booking = useSelector(selectBooking);

  const isSummaryVisible =
    (cartItems && cartItems.length > 0) ||
    (booking && booking.booking.tables > 0);

  return (
    <div className="container-max py-8 pb-16">
      <h1 className="text-2xl my-4 font-semibold">Cart</h1>

      <div className="min-h-[60vh] pb-8 md:flex gap-8">
        <CartItemList />
        {isSummaryVisible && <OrderSummary />}
      </div>
    </div>
  );
};

export default Cart;
