import { useParams } from "react-router-dom";

import RestaurantInfo from "../components/RestaurantInfo";
import ShimmerRestaurant from "../components/shimmers/ShimmerRestaurant";
import RestaurantMenu from "../components/RestaurantMenu";
import useRestaurantsMenu from "../hooks/useRestaurantsMenu";
import RestaurantOrder from "../components/RestaurantOrder";
import React from "react";
import RestaurantDishes from "../components/RestaurantDishes";

const Restaurant = () => {
  const { dishes, isLoading } = useRestaurantsMenu();

  return <RestaurantDishes dishes={dishes} />;
};
export default Restaurant;
