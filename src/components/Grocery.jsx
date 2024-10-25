import { useState } from "react";

const Grocery = () => {
  const [cart, setCart] = useState({});
  const [clickedButton, setClickedButton] = useState(null); // To track which button was clicked

  const products = [
    {
      id: 1,
      name: "Apples",
      price: 2.99,
      image: "/images/apples.png",
      category: "Fruits",
    },
    {
      id: 2,
      name: "Bananas",
      price: 1.49,
      image: "/images/bananas.png",
      category: "Fruits",
    },
    {
      id: 3,
      name: "Carrots",
      price: 0.99,
      image: "/images/carrots.png",
      category: "Vegetables",
    },
    {
      id: 4,
      name: "Milk",
      price: 3.49,
      image: "/images/milk.png",
      category: "Dairy",
    },
    {
      id: 5,
      name: "Eggs",
      price: 2.29,
      image: "/images/eggs.png",
      category: "Dairy",
    },
    {
      id: 6,
      name: "Bread",
      price: 2.79,
      image: "/images/bread.png",
      category: "Bakery",
    },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: {
        ...product,
        quantity: (prevCart[product.id]?.quantity || 0) + 1,
      },
    }));
    setClickedButton(product.id);

    // Reset button highlight after a short delay
    setTimeout(() => setClickedButton(null), 200);
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Online Grocery Store
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              {product.name}
            </h2>
            <p className="text-gray-500 mb-4">{product.category}</p>
            <p className="text-lg font-bold text-blue-600">
              ₹{product.price.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart(product)}
              className={`mt-4 py-2 px-6 font-semibold rounded-lg shadow-md transition duration-200 ${
                clickedButton === product.id
                  ? "bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Shopping Cart</h2>
        {Object.keys(cart).length > 0 ? (
          <div className="space-y-4">
            {Object.values(cart).map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2 border-gray-200"
              >
                <span className="font-medium text-gray-700">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold text-blue-600">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="font-bold text-lg text-right text-gray-800">
              Total: ₹{getTotalPrice().toFixed(2)}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Grocery;
