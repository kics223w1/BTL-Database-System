import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import useRestaurants from "../hooks/useRestaurants";
import { GET_RESTAURANTS_URL } from "../utils/constants";
import BannerList from "./BannerList";
import FoodList from "./FoodList";
import RestaurantList from "./RestaurantList";

const Body = () => {
  const { banners, foods, restaurants, isLoading } =
    useRestaurants(GET_RESTAURANTS_URL);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const serachRef = useRef();

  const handleSearch = (text) => {
    if (!text) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const newFilteredRestaurants = restaurants.flatMap((rest) => {
      const description = `${rest.name} ${rest.district} ${rest.province} ${rest.ward} ${rest.table_count} ${rest.hotline}`;
      if (description.toLowerCase().includes(text.toLowerCase())) {
        return [rest];
      }
      return [];
    });
    setFilteredRestaurants(newFilteredRestaurants);
  };

  useEffect(() => {
    setFilteredRestaurants(restaurants);
  }, [isLoading]);

  return (
    <div className="bg-white relative py-8">
      {/* banners */}
      <BannerList banners={banners} isLoading={isLoading} />

      {/* food list */}
      {/* <FoodList foods={foods} isLoading={isLoading} /> */}

      {/* search bar */}
      <form className="flex gap-2 md:gap-4 max-w-[560px] w-[90%] mx-auto mt-6">
        <input
          placeholder="Search restaurants..."
          className="p-2 px-4 rounded-md border outline-none border-orange-400 grow w-full"
          ref={serachRef}
          onChange={(e) => {
            const textInput = e.target.value.trim();
            handleSearch(textInput);
          }}
        />
        {/* <button
          type="submit"
          className="bg-orange-400 basis-2/12 text-center text-white p-2 flex justify-center gap-2 items-center md:px-8 rounded-md text-sm md:text-base"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />{" "}
          <span className="hidden md:block">Search</span>
        </button> */}
      </form>

      {/* restaurant list */}

      <RestaurantList isLoading={isLoading} restaurants={filteredRestaurants} />
    </div>
  );
};
export default Body;
