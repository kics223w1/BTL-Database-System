import React, { FC, useEffect } from "react";
import { Bill, Dish, DishInBill, Promotion } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";
import BillDish from "./Bill-dish";
import OrderSummary from "./OrderSummary";

type BillDishesProps = {
  billID: string;
};

const BillDishes: FC<BillDishesProps> = ({ billID }) => {
  const [dishes, setDishes] = React.useState<Dish[]>([]);
  const [currentBill, setCurrentBill] = React.useState<Bill | undefined>(
    undefined
  );

  useEffect(() => {
    const setup = async () => {
      const response = await axios.get(`${BACKEND_URL}/food`);
      const obj: { data: Dish[]; success: boolean } | undefined =
        await response.data;
      if (obj && obj.success) {
        setDishes(obj.data);
      } else {
        setDishes([]);
      }
    };

    setup();
  }, []);

  const handleAddDish = async (dishID: string, count: number) => {
    if (count === 0) {
      await handleDeleteDish(dishID);
      return;
    }

    const currentDishes = await getCurrentDishes();
    const isInclude = currentDishes.some((d) => d.dish_id === dishID);

    const dishIncluded = {
      bill_id: billID,
      dish_id: dishID,
      count,
    };

    if (isInclude) {
      const response = await axios.patch(`${BACKEND_URL}/bill/update`, {
        dish_included: dishIncluded,
      });
      const obj: { data: string; success: boolean } | undefined =
        await response.data;
      showStatus(obj);
    } else {
      const response = await axios.post(`${BACKEND_URL}/bill/add`, {
        dish_included: dishIncluded,
      });
      const obj: { data: string; success: boolean } | undefined =
        await response.data;
      showStatus(obj);
    }
  };

  const handleDeleteDish = async (dishID: string) => {
    const dishIncluded = {
      bill_id: billID,
      dish_id: dishID,
    };
    const response = await axios.delete(`${BACKEND_URL}/bill/delete`, {
      data: {
        dish_included: dishIncluded,
      },
    });
    const obj: { data: string; success: boolean } | undefined =
      await response.data;
    showStatus(obj);
  };

  const showStatus = (obj: { data: string; success: boolean } | undefined) => {
    if (obj && obj.success) {
      toast.success("Update successfully!");
      handleUpdateCurrentBill();
    } else if (obj && !obj.success) {
      toast.error(obj.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const getCurrentDishes = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/dish_included?bill_id=${billID}`
    );
    const obj: { data: DishInBill[]; success: boolean } | undefined =
      await response.data;
    if (obj && obj.success) {
      return obj.data;
    }
    return [];
  };

  const handleUpdateCurrentBill = async () => {
    const response = await axios.get(`${BACKEND_URL}/bill_1?bill_id=${billID}`);
    const obj: { data: Bill[]; success: boolean } | undefined =
      await response.data;
    if (obj && obj.success && obj.data.length > 0) {
      setCurrentBill(obj.data[0]);
    } else {
      setCurrentBill(undefined);
    }
  };

  return (
    <div className="flex gap-2">
      <ul className="basis-7/12">
        {dishes.map((dish: Dish, index) => {
          return (
            <BillDish
              key={`${dish.dish_id}`}
              dish={dish}
              handleClickUpdate={handleAddDish}
            />
          );
        })}
      </ul>
      {currentBill && <OrderSummary bill={currentBill} />}
    </div>
  );
};

export default BillDishes;
