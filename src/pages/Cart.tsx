import React, { useEffect } from "react";
import RestaurantDishesTop from "../components/RestaurantDishes-Top";
import { Customer } from "../features/types";
import AddBillDialog from "../components/dialogs/add-bill-dialog";
import BillDishes from "../components/Bill-dishes";

const Cart = () => {
  const [currentCustomer, setCurrentCustomer] = React.useState<
    Customer | undefined
  >(undefined);
  const [addBillDialogVisible, setAddBillDialogVisible] =
    React.useState<boolean>(false);
  const [currentBillID, setCurrentBillID] = React.useState<string>("");

  return (
    <div className="flex flex-col w-full h-[90vh] px-36 py-14 mb-10 overflow-auto">
      <RestaurantDishesTop
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
        isPageBill={true}
        handleOnClickCreateBill={() => {
          setAddBillDialogVisible(true);
        }}
      />
      {currentBillID && <BillDishes billID={currentBillID} />}
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

export default Cart;
