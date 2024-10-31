import { useEffect } from "react";

const offersData = [
  {
    id: 1,
    title: "20% Off on All Burgers",
    description: "Enjoy a 20% discount on all burgers. Use code: BURGER20",
    discount: "20% OFF",
    image: "https://example.com/burger.jpg", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "Free Delivery Over $30",
    description: "Order above $30 and get free delivery. No code needed!",
    discount: "Free Delivery",
    image: "https://example.com/delivery.jpg", // Replace with actual image URLs
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Pizza",
    description: "Order any pizza and get one free. Only on weekends!",
    discount: "BOGO Pizza",
    image: "https://example.com/pizza.jpg", // Replace with actual image URLs
  },
];

const Offers = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 px-6 py-12 pt-20 md:px-12 lg:px-24">
      <h2 className="mb-10 text-center text-4xl font-bold text-gray-800">
        Special Offers Just For You
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {offersData.map((offer) => (
          <div
            key={offer.id}
            className="transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-500 hover:scale-105"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="h-48 w-full object-cover"
            />
            <div className="flex h-full flex-col p-5">
              <span className="mb-1 text-sm font-semibold text-green-500">
                {offer.discount}
              </span>
              <h3 className="mb-2 text-2xl font-bold text-gray-800">
                {offer.title}
              </h3>
              <p className="mb-4 text-gray-600">{offer.description}</p>
              <button className="mt-auto rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600">
                Avail Offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
