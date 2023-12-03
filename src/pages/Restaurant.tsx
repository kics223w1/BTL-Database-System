import { useParams } from "react-router-dom";

import RestaurantInfo from "../components/RestaurantInfo";
import ShimmerRestaurant from "../components/shimmers/ShimmerRestaurant";
import RestaurantMenu from "../components/RestaurantMenu";
import useRestaurantsMenu from "../hooks/useRestaurantsMenu";
import RestaurantOrder from "../components/RestaurantOrder";
import React from "react";
import RestaurantDishes from "../components/RestaurantDishes";

const Restaurant = () => {
  const { id } = useParams();
  const { dishes, isLoading } = useRestaurantsMenu();

  return (
    <div className="w-full h-full overflow-auto py-14 px-64 gap-10">
      {isLoading ? <ShimmerRestaurant /> : <RestaurantDishes dishes={dishes} />}
    </div>
  );
};
export default Restaurant;
