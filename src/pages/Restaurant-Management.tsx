import React, { useEffect, useState } from "react";
import { Restaurant } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import RestaurantList from "../components/RestaurantList";
import RestaurantCard from "../components/RestaurantCard";
import ShimmerCard from "../components/ShimmerCard";
// @ts-ignore
import macDonald from "../../assets/mcDonald.png";
// @ts-ignore
import doki from "../../assets/doki.png";
// @ts-ignore
import burgerking from "../../assets/burgerking.png";
// @ts-ignore
import dominoPizza from "../../assets/dominoPizza.png";
// @ts-ignore
import hana from "../../assets/hana.png";
// @ts-ignore
import kfc from "../../assets/kfc.png";
// @ts-ignore
import kichi from "../../assets/kichi.png";
// @ts-ignore
import vietkitchen from "../../assets/vietkitchen.png";
import ConfirmDeleteTable from "../components/dialogs/confirm-delete-table";

const getRestaurantImage = () => {
  const arr = [
    macDonald,
    doki,
    burgerking,
    dominoPizza,
    hana,
    kfc,
    kichi,
    vietkitchen,
  ];
  const index = Math.floor(Math.random() * arr.length);
  return index >= 0 && index < arr.length ? arr[index] : arr[0];
};

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletedRestaurant, setDeletedRestaurant] = useState<
    Restaurant | undefined
  >(undefined);

  useEffect(() => {
    const setup = async () => {
      setIsLoading(true);

      const [responseRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/restaurant`),
      ]);

      setIsLoading(false);

      const objRes: { data: Restaurant[]; success: boolean } | undefined =
        responseRes.data;
      const newRestaurants = objRes && objRes.data ? objRes.data : [];

      setRestaurants(newRestaurants);
    };
    setup();
  }, []);

  const handleInsertTable = async () => {};

  return (
    <div className="w-full h-[90vh] px-36 py-14">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {restaurants.map((restaurant, i) => {
          const srcImage = getRestaurantImage();

          return (
            <div key={`${restaurant.res_id}_${i}`}>
              <div className="overlay-container">
                <img
                  src={srcImage}
                  alt="restaurant"
                  className="relative w-full min-h-[180px] overflow-hidden aspect-video object-cover block rounded-md"
                />
                <div className="overlay w-full rounded-md p-2 px-3 ">
                  <p className="text-xl font-bold flex gap-2 flex-wrap"></p>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold mt-2 text-zinc-800">
                  {restaurant.res_name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-zinc-800 font-medium">Restaurant ID:</p>
                <p className="text-zinc-600">{restaurant.res_id}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-zinc-800 font-medium">Table count:</p>
                <p className="text-zinc-600">{restaurant.table_count}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-zinc-800 font-medium">Total slot:</p>
                <p className="text-zinc-600">{restaurant.total_slot}</p>
              </div>

              <div className="flex items-center gap-2 h-10">
                <button className="bg-orange-400 hover:bg-orange-400/90 rounded w-full">
                  Insert 1 table
                </button>
                <button
                  className={`bg-orange-400 hover:bg-orange-400/90 rounded w-full ${
                    restaurant.table_count <= 0 &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={restaurant.table_count <= 0}
                  onClick={() => {
                    setDeletedRestaurant(restaurant);
                  }}
                >
                  Delete 1 table
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {deletedRestaurant && (
        <ConfirmDeleteTable
          isOpen={deletedRestaurant !== undefined}
          handleClose={() => {
            setDeletedRestaurant(undefined);
          }}
          restaurant={deletedRestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantManagement;
