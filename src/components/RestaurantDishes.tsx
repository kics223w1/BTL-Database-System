import React, { FC } from "react";
import { Customer, Dish } from "../features/types";
import RestaurantDishesTop from "./RestaurantDishes-Top";
import Dishes from "./Dishes";
import CustomerBill from "./Customer-bill";

type RestaurantDishesProps = {
  dishes: Dish[];
};

const RestaurantDishes: FC<RestaurantDishesProps> = ({ dishes }) => {
  const [currentCustomer, setCurrentCustomer] = React.useState<
    Customer | undefined
  >(undefined);

  return (
    <div className="flex flex-col w-full h-full overflow-auto gap-5">
      <RestaurantDishesTop
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
      />

      {currentCustomer ? (
        <CustomerBill currentCustomer={currentCustomer} />
      ) : (
        <Dishes dishes={dishes} />
      )}
    </div>
  );
};

export default RestaurantDishes;
