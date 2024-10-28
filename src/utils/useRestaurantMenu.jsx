import { useEffect, useState } from "react";
import { MENU_API } from "./constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resId) {
      fetchMenu();
    }
  }, [resId]);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch(MENU_API + resId);
      if (!res.ok) {
        throw new Error("Failed to fetch restaurant menu data");
      }
      const json = await res.json();
      setResInfo(json.data);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { resInfo, loading, error }; // Return loading and error states
};

export default useRestaurantMenu;
