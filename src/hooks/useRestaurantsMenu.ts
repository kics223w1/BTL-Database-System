import axios from "axios";
import { useEffect, useState } from "react";
import { Dish } from "../features/types";
import { BACKEND_URL } from "../utils/constants";

const useRestaurantsMenu = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setup = async () => {
      try {
        setIsLoading(true);

        const responseFood = await axios.get(`${BACKEND_URL}/food`);

        setIsLoading(false);

        const objFood: { data: Dish[]; success: boolean } | undefined =
          responseFood.data;
        const newDishes = objFood && objFood.data ? objFood.data : [];

        setDishes(newDishes);
      } catch (e) {
        console.error("Get food error: ", e);
        setDishes([]);
      }
    };

    setup();
  }, []);

  return { dishes, isLoading, error };
};

export default useRestaurantsMenu;
