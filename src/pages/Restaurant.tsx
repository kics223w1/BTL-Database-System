import { useParams } from "react-router-dom";

import useRestaurantsMenu from "../hooks/useRestaurantsMenu";
import React from "react";
import RestaurantDishes from "../components/RestaurantDishes";

const Restaurant = () => {
  const { dishes, isLoading } = useRestaurantsMenu();

  return <RestaurantDishes dishes={dishes} />;
};
export default Restaurant;
