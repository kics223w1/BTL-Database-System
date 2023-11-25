import React, { FC } from "react";
import { Restaurant } from "../features/types";

type RestaurantInfoProps = {
  restaurant: Restaurant | undefined;
};

const RestaurantInfo: FC<RestaurantInfoProps> = ({ restaurant }) => {
  if (!restaurant) {
    return <></>;
  }

  return (
    <div className="flex justify-between items-center pb-4">
      <div>
        <div className="flex items-baseline gap-2">
          <h2 className="text-lg font-semibold mt-2 text-zinc-800">
            {restaurant.name}
          </h2>
          <span className="text-sm text-zinc-600">({restaurant.province})</span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-zinc-800 font-medium">Tables:</p>
          <p className="text-zinc-600">{restaurant.table_count} tables</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-zinc-800 font-medium">Hotline:</p>
          <p className="text-zinc-600">{restaurant.hotline}</p>
        </div>
        <p className="text-zinc-600">
          {restaurant.number} {restaurant.ward}, {restaurant.district}
        </p>
      </div>
    </div>
  );
};
export default RestaurantInfo;
