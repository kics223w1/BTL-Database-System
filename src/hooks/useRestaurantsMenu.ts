import axios from "axios";
import { useEffect, useState } from "react";
import { GET_RESTAURANTS_URL } from "../utils/constants";
import { Dish, Restaurant } from "../features/types";

const useRestaurantsMenu = (restId) => {
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>(
    undefined
  );
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://api.team100.com/restaurant?id=${restId}`
        );
        const newRestaurant: Restaurant = data ? data.restaurant : undefined;
        const newDishes: Dish[] = data ? data.dishes : [];

        setRestaurant(newRestaurant);
        setDishes(newDishes);
      } catch (err) {
        console.log(err.response);
        setError(err.response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { restaurant, dishes, isLoading, error };
};

export default useRestaurantsMenu;
