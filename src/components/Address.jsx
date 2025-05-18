import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserName } from "../utils/userSlice";

const Address = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate API call before navigating
    setTimeout(() => {
      navigate("/payment");
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setUserName("");
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setLandmark("");
  };

  const handleUserName = (e) => {
    const value = e.target.value;
    setUserName(value);
    dispatch(addUserName(value));
  };

  return (
    <div className="mx-auto mt-12 max-w-lg rounded-lg p-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Place Your Order
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={handleUserName}
            required
            placeholder="Enter your name"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            minLength="10"
            maxLength="10"
            required
            placeholder="Enter your phone number"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label
            htmlFor="address"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Delivery Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your delivery address"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        {/* City Name */}
        <div>
          <label
            htmlFor="city"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="Enter your city name"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        {/* Landmark */}
        <div>
          <label
            htmlFor="landmark"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Enter a nearby landmark"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-3 font-bold text-white shadow-md transition-all duration-200 ease-in-out hover:bg-orange-600 focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
        >
          SAVE ADDRESS & PROCEED TO PAY
        </button>
      </form>
    </div>
  );
};

export default Address;
