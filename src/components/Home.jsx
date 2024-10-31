import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnlineStatus";
import { SWIGGY_API } from "../utils/constant";

const Home = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [searchError, setSearchError] = useState("");

  const isOnline = useOnline();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(SWIGGY_API);
      if (!res.ok) throw new Error("Error fetching restaurants.");

      const json = await res.json();
      const restaurantData = extractRestaurants(json);

      setAllRestaurants(restaurantData);
      setFilteredRestaurants(restaurantData);
      setFetchError("");
    } catch (error) {
      console.error("Fetch Error:", error);
      setFetchError("Failed to load restaurants. Please try again later.");
    }
  };

  const extractRestaurants = (json) => {
    for (let card of json?.data?.cards || []) {
      const restaurants =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (restaurants) return restaurants;
    }
    return [];
  };

  // Debounce Logic for Search Input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchText);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = (value) => {
    if (value.trim() === "") {
      setFilteredRestaurants(allRestaurants);
      setSearchError("");
    } else {
      const filtered = allRestaurants.filter((restaurant) =>
        restaurant?.info?.name.toLowerCase().includes(value.toLowerCase()),
      );

      setFilteredRestaurants(filtered);
      setSearchError(
        filtered.length === 0
          ? "Oops! It seems there are no restaurants matching that name. Discover something new instead!"
          : "",
      );
    }
  };

  const filterTopRated = () => {
    const topRatedRestaurants = allRestaurants.filter(
      (restaurant) => restaurant?.info?.avgRating > 4.3,
    );
    setFilteredRestaurants(topRatedRestaurants);
    setSearchText("");
    setSearchError(
      topRatedRestaurants.length === 0 ? "No top-rated restaurants found." : "",
    );
  };

  if (!isOnline) {
    return (
      <h1 className="m-10 p-10 text-center">
        Please check your internet connection.
      </h1>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-4 pt-20 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="flex w-full justify-center px-4 sm:w-auto sm:px-0">
          <input
            className="w-full max-w-[90%] rounded-full border border-solid px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-[350px]"
            type="text"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="rounded-full bg-gray-100 px-6 py-3 font-semibold text-gray-800 transition-colors duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={filterTopRated}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      {fetchError && (
        <p className="pt-10 text-center text-red-500">{fetchError}</p>
      )}
      {searchError && (
        <p className="pt-10 text-center text-red-500">{searchError}</p>
      )}

      {allRestaurants.length === 0 && !fetchError ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap items-center justify-center pt-6">
          {filteredRestaurants.length > 0
            ? filteredRestaurants.map((restaurant) => (
                <Link
                  key={restaurant?.info.id}
                  to={"/restaurants/" + restaurant?.info?.id}
                >
                  <RestaurantCard resData={restaurant?.info} />
                </Link>
              ))
            : !searchError && (
                <p className="pt-10 text-center text-gray-500">
                  No restaurants available at the moment.
                </p>
              )}
        </div>
      )}
    </div>
  );
};

export default Home;
