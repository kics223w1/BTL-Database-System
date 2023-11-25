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

      // if (data?.data) {
      //   setBanners(
      //     data?.data?.cards.filter(
      //       (items) => items?.card?.card?.id === "topical_banner"
      //     )[0]
      //   );

      //   setFoods(
      //     data?.data?.cards.filter(
      //       (items) => items?.card?.card?.id === "whats_on_your_mind"
      //     )[0]
      //   );

      //   setRestaurants(
      //     data?.data?.cards.filter(
      //       (items) => items?.card?.card?.id === "restaurant_grid_listing"
      //     )[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      //   );
      // }
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