import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Apples",
    price: 120.0,
    image: "/images/apples.png",
    category: "Fruits",
    soldOut: true, // Mark as sold out
  },
  {
    id: 2,
    name: "Bananas",
    price: 60.0,
    image: "/images/bananas.png",
    category: "Fruits",
    soldOut: true, // Mark as sold out
  },
  {
    id: 3,
    name: "Carrots",
    price: 65.0,
    image: "/images/carrots.png",
    category: "Vegetables",
    soldOut: true, // Mark as sold out
  },
  {
    id: 4,
    name: "Milk",
    price: 30.0,
    image: "/images/milk.png",
    category: "Dairy",
    soldOut: true, // Mark as sold out
  },
  {
    id: 5,
    name: "Eggs",
    price: 8.0,
    image: "/images/eggs.png",
    category: "Dairy",
    soldOut: true, // Mark as sold out
  },
  {
    id: 6,
    name: "Bread",
    price: 40.0,
    image: "/images/bread.png",
    category: "Bakery",
    soldOut: true, // Mark as sold out
  },
];

const Grocery = () => {
  const [cart, setCart] = useState({});
  const [clickedButton, setClickedButton] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = (product) => {
    if (product.soldOut) return; // Prevent adding to cart if sold out
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: {
        ...product,
        quantity: (prevCart[product.id]?.quantity || 0) + 1,
      },
    }));
    setClickedButton(product.id);
    setTimeout(() => setClickedButton(null), 200);
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center rounded-lg border border-gray-100 p-4 shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-4 h-48 w-full rounded object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              {product.name}
            </h2>
            <p className="mb-4 text-gray-500">{product.category}</p>
            <p className="text-lg font-bold text-blue-600">
              ₹{product.price.toFixed(2)}
            </p>
            {product.soldOut ? (
              <button
                disabled
                className="mt-4 flex transform cursor-not-allowed items-center gap-2 rounded-lg bg-gray-300 px-6 py-2 font-semibold text-gray-600 shadow-md transition duration-200 hover:scale-105"
              >
                <FaShoppingCart className="text-gray-500 line-through" /> Sold
                Out
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className={`mt-4 rounded-lg px-6 py-2 font-semibold shadow-md transition duration-200 ${
                  clickedButton === product.id
                    ? "bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {/* <div className="mt-12 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Shopping Cart</h2>
        {Object.keys(cart).length > 0 ? (
          <div className="space-y-4">
            {Object.values(cart).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-2"
              >
                <span className="font-medium text-gray-700">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold text-blue-600">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="text-right text-lg font-bold text-gray-800">
              Total: ₹{getTotalPrice().toFixed(2)}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Your cart is empty</p>
        )}
      </div> */}
    </div>
  );
};

export default Grocery;
