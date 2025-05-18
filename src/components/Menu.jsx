import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
import RestaurantGrid from "./restaurant/RestaurantGrid";
import useOnline from "../hooks/useOnlineStatus";
import { SWIGGY_API } from "../utils/constant";

const Menu = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(true);

  const isOnline = useOnline();

  // Fetch restaurant data from API
  const fetchRestaurants = async () => {
    setLoading(true);
    setFetchError("");

    try {
      const res = await fetch(SWIGGY_API);
      if (!res.ok) throw new Error("Error fetching restaurants.");
      const json = await res.json();

      const restaurantData = extractRestaurants(json);
      setAllRestaurants(restaurantData);
      setFilteredRestaurants(restaurantData);
    } catch (error) {
      console.error("Fetch Error:", error);
      setFetchError("Failed to load restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Extract restaurants from deeply nested API response
  const extractRestaurants = (json) => {
    for (let card of json?.data?.cards || []) {
      const restaurants =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (restaurants) return restaurants;
    }
    return [];
  };

  useEffect(() => {
    fetchRestaurants();
    window.scrollTo(0, 0);
  }, []);

  // Handle search input and filter matching restaurants
  const handleSearch = (value) => {
    window.scrollTo(0, 0);
    const trimmed = value.trim().toLowerCase();
    setSearchText(value);

    if (!trimmed) {
      setFilteredRestaurants(allRestaurants);
      setSearchError("");
      return;
    }

    const filtered = allRestaurants.filter((r) =>
      r?.info?.name?.toLowerCase().includes(trimmed),
    );

    setFilteredRestaurants(filtered);
    setSearchError(
      filtered.length === 0
        ? "Oops! It seems there are no restaurants matching that name. Discover something new instead!"
        : "",
    );
  };

  // Filter top-rated restaurants
  const filterTopRated = () => {
    window.scrollTo(0, 0);
    const topRated = allRestaurants.filter((r) => r?.info?.avgRating > 4.3);

    setFilteredRestaurants(topRated);
    setSearchText("");
    setSearchError(
      topRated.length === 0 ? "No top-rated restaurants found." : "",
    );
  };

  // Show offline message if user is not online
  if (!isOnline) {
    return (
      <h1 className="m-10 p-10 text-center">
        Please check your internet connection.
      </h1>
    );
  }

  return (
    <div>
      {/* Search & filter bar */}
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

export default Menu;
