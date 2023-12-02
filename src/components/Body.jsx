import useRestaurants from "../hooks/useRestaurants";
import RestaurantList from "./RestaurantList";

const Body = () => {
  const { banners, foods, restaurants, promotions, isLoading } =
    useRestaurants();

  return (
    <div className="bg-white relative py-8">
      <RestaurantList isLoading={isLoading} restaurants={restaurants} />
    </div>
  );
};
export default Body;
