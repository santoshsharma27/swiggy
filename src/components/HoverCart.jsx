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
    <div className="space-y-6 p-4 rounded-lg">
      {cartItems.map((item) => {
        const itemId = item.card.info.id;
        const itemQuantity = itemCounts[itemId] || 1;
        const itemPrice =
          (item.card.info.price || item.card.info.defaultPrice) / 100;

        return (
          <div
            className="p-4 border-b flex items-center justify-between bg-gray-50 rounded-lg"
            key={itemId}
          >
            <div className="flex items-center w-full">
              <img
                className="w-16 h-16 object-cover rounded-md shadow-sm mr-4"
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
              />
              <div className="flex-1 text-xs flex justify-evenly items-center gap-12">
                <div>
                  {item.card.info.name} x {itemQuantity}
                </div>
                <div>₹{(itemPrice * itemQuantity).toFixed(2)}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="pt-2 border-t mt-6">
        {cartItems.length > 0 && (
          <>
            <div className="flex justify-between items-center text-gray-800">
              <span>Sub total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors uppercase"
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
