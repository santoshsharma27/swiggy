import { CDN_URL } from "../utils/constant";
import {
  addItem,
  decrementItemQuantity,
  deleteItem,
  incrementItemQuantity,
} from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Toast from "./Toast";

function ItemList({ items, setNotification }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cart);
  const [itemCounts, setItemCounts] = useState({});

  useEffect(() => {
    const counts = {};
    cartItems.forEach((item) => {
      counts[item.card.info.id] = item.quantity || 1;
    });
    setItemCounts(counts);
  }, [cartItems]);

  function addHandler(item) {
    dispatch(addItem(item));
    const itemId = item.card.info.id;
    const currentCount = itemCounts[itemId];
    if (currentCount >= 1) {
      dispatch(incrementItemQuantity(itemId));
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [itemId]: currentCount + 1,
      }));
    }
    setNotification({ type: "add", message: "Item added to cart!" });
    setTimeout(() => {
      setNotification(null);
    }, 1000);
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
    setNotification({ type: "delete", message: "Item removed from cart!" });
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items?.map((item) => {
        const itemId = item.card.info.id;
        const currentCount = itemCounts[itemId] || 0;

        return (
          <div
            className="relative flex flex-col items-center justify-between rounded-lg p-4"
            key={itemId}
          >
            <img
              className="mb-3 h-48 w-full rounded-md object-cover"
              src={CDN_URL + item?.card?.info?.imageId}
              alt={item?.card?.info?.name}
            />
            <div className="w-full text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {item?.card?.info?.name}
              </h3>
              <div className="mt-1 flex items-center justify-between text-base">
                <span className="font-bold text-gray-700">
                  ₹
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </span>
                {/* Conditionally render rating only if it exists */}
                {item.card.info.ratings?.aggregatedRating?.rating && (
                  <span className="flex items-center rounded-md bg-green-500 px-2 py-1 text-xs text-white">
                    ✭ {item.card.info.ratings.aggregatedRating.rating}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-3 flex w-full items-center justify-center">
              {currentCount > 0 && (
                <button
                  className="flex-1 rounded-l-md bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
                  onClick={() => deleteHandler(item)}
                >
                  -
                </button>
              )}
              {currentCount > 0 && (
                <span className="px-3 text-lg font-semibold">
                  {currentCount}
                </span>
              )}
              <button
                className={`flex-1 py-2 ${
                  currentCount > 0 ? "rounded-r-md" : "rounded-md"
                } bg-green-500 font-semibold text-white hover:bg-green-600`}
                onClick={() => addHandler(item)}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ItemListWithToast({ items }) {
  const [notification, setNotification] = useState(null);

  return (
    <>
      <Toast notification={notification} />
      <ItemList items={items} setNotification={setNotification} />
    </>
  );
}
