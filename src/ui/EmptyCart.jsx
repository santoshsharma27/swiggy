import { Link } from "react-router-dom"; // Assuming you're using React Router
import { FaShoppingCart } from "react-icons/fa"; // For adding a cart icon

function EmptyCart() {
  return (
    <div className="pt-32 text-center">
      <FaShoppingCart className="mx-auto mb-6 text-6xl text-gray-400" />
      <h2 className="mb-2 text-2xl font-semibold">Your Cart is Empty</h2>
      <p className="mb-6 text-gray-600">
        It looks like you haven&apos;t added anything to your cart yet. Start
        exploring our menu and fill it up with your favorite items!
      </p>
      <Link
        to="/" // Update this path based on your app's routing
        className="inline-block rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
      >
        Go to Home Page
      </Link>
    </div>
  );
}

export default EmptyCart;
