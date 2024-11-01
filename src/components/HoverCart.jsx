import { useSelector } from "react-redux";
import { selectTotalPrice } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HoverCart({ setIsCartHovered }) {
  const [itemCounts, setItemCounts] = useState({});
  const cartItems = useSelector((store) => store.cart.cart);
  const totalPrice = useSelector(selectTotalPrice);
  const navigate = useNavigate();
  const location = useLocation();

  function handleCheckout() {
    navigate("/order/new"); // Navigate to the order page
  }

  // Close hover cart automatically when on checkout page
  useEffect(() => {
    if (
      location.pathname === "/order/new" ||
      location.pathname === "/payment" ||
      location.pathname === "/cart" ||
      location.pathname === "/grocery" ||
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/contact"
    ) {
      setIsCartHovered(false); // Ensure cart is hidden on this route
    }
  }, [location, setIsCartHovered]);

  useEffect(() => {
    const counts = {};
    cartItems.forEach((item) => {
      counts[item.card.info.id] = item.quantity || 1;
    });
    setItemCounts(counts);
  }, [cartItems]);

  return (
    <div className="space-y-6 rounded-lg p-4">
      {cartItems.map((item) => {
        const itemId = item.card.info.id;
        const itemQuantity = itemCounts[itemId] || 1;
        const itemPrice =
          (item.card.info.price || item.card.info.defaultPrice) / 100;

        return (
          <div
            className="flex items-center justify-between rounded-lg border-b bg-gray-50 p-4"
            key={itemId}
          >
            <div className="flex w-full items-center">
              <img
                className="mr-4 h-16 w-16 rounded-md object-cover shadow-sm"
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
              />
              <div className="flex flex-1 items-center justify-evenly gap-12 text-xs">
                <div>
                  {item.card.info.name} x {itemQuantity}
                </div>
                <div>₹{(itemPrice * itemQuantity).toFixed(2)}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-6 border-t pt-2">
        {cartItems.length > 0 && (
          <>
            <div className="flex items-center justify-between text-gray-800">
              <span>Sub total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="rounded-md bg-orange-500 px-6 py-2 uppercase text-white transition-colors hover:bg-orange-600"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HoverCart;
