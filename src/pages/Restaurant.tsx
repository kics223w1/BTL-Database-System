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
  const { restaurant, dishes, isLoading } = useRestaurantsMenu(id);

  return (
    <div className="container-md my-8">
      {isLoading ? (
        <ShimmerRestaurant />
      ) : (
        <>
          <RestaurantInfo restaurant={restaurant} />
          <RestaurantOrder />
          <RestaurantDishes dishes={dishes} />
        </>
      )}
    </div>
  );
};
export default Restaurant;
