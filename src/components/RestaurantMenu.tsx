import { FC, useState } from "react";
import RestaurantMenuItem from "./RestaurantDishes";
import React from "react";
import { Dish } from "../features/types";

type RestaurantMenuProps = {
  dishes: Dish[];
};

const RestaurantMenu: FC<RestaurantMenuProps> = ({ dishes }) => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);

  const handleToggleAccordion = (index) => {
    if (index === activeAccordionIndex) {
      // setActiveAccordionIndex(null);
    } else {
      setActiveAccordionIndex(index);
    }
  };

  return <div></div>;
};

export default RestaurantMenu;
