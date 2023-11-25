import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAddress } from "../features/address/addressSlice";
import { Restaurant } from "../features/types";

const useRestaurants = (url) => {
  const { address } = useSelector(selectAddress);
  const [banners, setBanners] = useState([]);
  const [foods, setFoods] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRestaurants = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setIsLoading(true);
      const { data } = await axios.get("https://api.team100.com/restaurants");
      const restaurants: Restaurant[] = data ? data.restaurants : [];

      setRestaurants(restaurants);
    } catch (err) {
      console.log(err.response);
      setError(err.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [address.city]);

  return {
    banners,
    foods,
    topRestaurants,
    restaurants,
    isLoading,
    error,
    triggerGetRestaurants: () => {
      return getRestaurants();
    },
  };
};

export default useRestaurants;
