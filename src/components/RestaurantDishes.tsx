import React, { FC } from "react";
import { Customer, Dish } from "../features/types";
import RestaurantDishesTop from "./RestaurantDishes-Top";
import Dishes from "./Dishes";
import BillDishes from "./Bill-dishes";
import AddBillDialog from "./dialogs/add-bill-dialog";

type RestaurantDishesProps = {
  dishes: Dish[];
};

const RestaurantDishes: FC<RestaurantDishesProps> = ({ dishes }) => {
  const [currentCustomer, setCurrentCustomer] = React.useState<
    Customer | undefined
  >(undefined);
  const [addBillDialogVisible, setAddBillDialogVisible] =
    React.useState<boolean>(false);
  const [currentBillID, setCurrentBillID] = React.useState<string>("");

  return (
    <div className="flex flex-col w-full h-full px-36 py-14 mb-10 overflow-auto">
      <RestaurantDishesTop
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
        isPageBill={true}
        handleOnClickCreateBill={() => {
          if (currentBillID) {
            setCurrentBillID("");
          }

          setAddBillDialogVisible(true);
        }}
      />
      {currentBillID ? (
        <BillDishes billID={currentBillID} />
      ) : (
        <Dishes dishes={dishes} />
      )}

      {addBillDialogVisible && currentCustomer && (
        <AddBillDialog
          isOpen={addBillDialogVisible && currentCustomer ? true : false}
          handleClose={() => {
            setAddBillDialogVisible(false);
          }}
          customer={currentCustomer}
          handleSetBillID={setCurrentBillID}
        />
      )}
    </div>
  );
};

export default RestaurantDishes;
