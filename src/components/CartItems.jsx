import { useDispatch, useSelector } from "react-redux";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  deleteItem,
  selectTotalPrice,
} from "../utils/cartSlice";
import { useState, useEffect } from "react";

function CartItems({ items }) {
  const [itemCounts, setItemCounts] = useState({});

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cart);
  const totalPrice = useSelector(selectTotalPrice);

  // Initialize item counts from the cart
  useEffect(() => {
    const counts = {};
    cartItems.forEach((item) => {
      counts[item.card.info.id] = item.quantity || 1;
    });
    setItemCounts(counts);
  }, [cartItems]);

  function addHandler(item) {
    const itemId = item.card.info.id;
    dispatch(incrementItemQuantity(itemId));
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));
  }

  function deleteHandler(item) {
    const itemId = item.card.info.id;
    const currentCount = itemCounts[itemId] || 0;

    if (currentCount > 1) {
      dispatch(decrementItemQuantity(itemId));
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [itemId]: currentCount - 1,
      }));
    } else if (currentCount === 1) {
      dispatch(deleteItem(itemId));
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [itemId]: 0,
      }));
    }
  }

  return (
    <div className="space-y-6">
      {items?.map((item) => {
        const itemId = item.card.info.id;
        const currentCount = itemCounts[itemId] || 0;

        return (
          <div
            className="flex items-center justify-between rounded-lg transition-all"
            key={itemId}
          >
            {/* Item Details */}
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-800">
                {item?.card?.info?.name}
              </h3>
              <div className="mt-1 text-sm text-gray-600">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-bold text-white hover:bg-red-600"
                onClick={() => deleteHandler(item)}
              >
                -
              </button>
              <span className="text-lg font-semibold text-gray-800">
                {currentCount}
              </span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white hover:bg-green-600"
                onClick={() => addHandler(item)}
              >
                +
              </button>
            </div>
          </div>
        );
      })}

      {/* Total Price Display */}
      <div className="mt-6 border-t border-black bg-white p-4 text-right">
        <div className="text-base font-bold text-gray-800">
          TO PAY: ₹{totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
