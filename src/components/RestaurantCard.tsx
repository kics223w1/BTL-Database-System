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

import { Restaurant } from "../features/types";
import React from "react";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const srcImage = getRestaurantImage();

  return (
    <div>
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

      <div className="flex items-center gap-2">
        <p className="text-zinc-800 font-medium">Hotline:</p>
        <p className="text-zinc-600">{restaurant.hotline}</p>
      </div>
      <p className="text-zinc-600">
        {restaurant.address_number} {restaurant.ward}, {restaurant.district},{" "}
        {restaurant.province}
      </p>
    </div>
  );
};

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

export default RestaurantCard;
