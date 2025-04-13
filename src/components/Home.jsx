import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
import RestaurantGrid from "./RestaurantGrid";
import useOnline from "../utils/useOnlineStatus";
import { SWIGGY_API } from "../utils/constant";

const Home = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(true);

  const isOnline = useOnline();

  const fetchData = async () => {
    setLoading(true);
    setFetchError("");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const extractRestaurants = (json) => {
    for (let card of json?.data?.cards || []) {
      const restaurants =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (restaurants) return restaurants;
    }
    return [];
  };

  const handleSearch = (value) => {
    window.scrollTo(0, 0);
    if (value.trim() === "") {
      setFilteredRestaurants(allRestaurants);
      setSearchError("");
    } else {
      const filtered = allRestaurants.filter((restaurant) =>
        restaurant?.info?.name
          .toLowerCase()
          .includes(value.trim().toLowerCase()),
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
    window.scrollTo(0, 0);
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
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
        onFilterTopRated={filterTopRated}
        onReset={() => {
          setFilteredRestaurants(allRestaurants);
          setSearchText("");
          setSearchError("");
        }}
      />

      {fetchError && (
        <p className="pt-10 text-center text-red-500">{fetchError}</p>
      )}
      {searchError && (
        <p className="pt-10 text-center text-red-500">{searchError}</p>
      )}

      {loading && !fetchError ? (
        <Shimmer />
      ) : (
        <RestaurantGrid
          restaurants={filteredRestaurants}
          searchError={searchError}
        />
      )}
    </div>
  );
};

export default Home;
