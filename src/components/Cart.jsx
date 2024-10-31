import { useEffect, useState } from "react";
import EmptyCart from "../ui/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import ConfirmModal from "./ConfirmModal";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClearCart() {
    setIsModalOpen(true);
  }

  function confirmClearCart() {
    dispatch(clearCart());
    setIsModalOpen(false);
  }

  function cancelClearCart() {
    setIsModalOpen(false);
  }

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className="relative">
      {/* Apply blur to the background content when modal is open */}
      <div
        className={`${isModalOpen ? "blur-sm" : ""} mt-10 w-full max-w-3xl mx-auto p-6 pt-16 bg-gray-50 rounded-lg shadow-lg`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Your Cart Items
        </h2>

        <div className="divide-y divide-gray-300">
          <CartItems items={cartItems} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <Link
            to="/order/new"
            className="w-full sm:w-auto px-6 py-3 text-center bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ConfirmModal
            isOpen={isModalOpen}
            onClose={cancelClearCart}
            onConfirm={confirmClearCart}
          />
        </div>
      )}
    </div>
  );
}

export default Cart;
