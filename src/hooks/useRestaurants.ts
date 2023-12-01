import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAddress } from "../features/address/addressSlice";
import { Promotion, Restaurant } from "../features/types";
import { BACKEND_URL } from "../utils/constants";

const useRestaurants = () => {
  const { address } = useSelector(selectAddress);
  const [banners, setBanners] = useState([]);
  const [foods, setFoods] = useState([]);

  const [topRestaurants, setTopRestaurants] = useState([]);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRestaurants = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setIsLoading(true);

      const [responsePromo, responseRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/promotions`),
        axios.get(`${BACKEND_URL}/restaurant`),
      ]);

      const objPromo: { data: Promotion[]; success: boolean } | undefined =
        responsePromo.data;
      const newPromotions = objPromo && objPromo.data ? objPromo.data : [];
      setPromotions(newPromotions);

      const objRes: { data: Restaurant[]; success: boolean } | undefined =
        responseRes.data;
      const newRestaurants = objRes && objRes.data ? objRes.data : [];
      setRestaurants(newRestaurants);
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
    promotions,
    isLoading,
    error,
    triggerGetRestaurants: () => {
      return getRestaurants();
    },
  };
};

export default useRestaurants;
