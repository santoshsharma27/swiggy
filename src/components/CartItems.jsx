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
    <div className="space-y-6 p-4 bg-gray-100">
      {items?.map((item) => {
        const itemId = item.card.info.id;
        const currentCount = itemCounts[itemId] || 0;

        return (
          <div
            className="p-4 border-b flex items-center justify-between bg-white shadow rounded-lg transition-all hover:shadow-md"
            key={itemId}
          >
            {/* Item Details */}
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {item?.card?.info?.name}
              </h3>
              <div className="text-sm text-gray-600 mt-1">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white font-bold hover:bg-red-600"
                onClick={() => deleteHandler(item)}
              >
                -
              </button>
              <span className="text-lg font-semibold text-gray-800">
                {currentCount}
              </span>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold hover:bg-green-600"
                onClick={() => addHandler(item)}
              >
                +
              </button>
            </div>
          </div>
        );
      })}

      {/* Total Price Display */}
      <div className="p-4 border-t mt-6 bg-white shadow rounded-lg text-right">
        <div className="text-xl font-bold text-gray-800">
          Total Amount: ₹{totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
