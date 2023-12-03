import React, { FC, useEffect, useState } from "react";
import { Bill, Promotion } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  bill: Bill;
};

const OrderSummary: FC<Props> = ({ bill }) => {
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const handlePlaceOrder = async () => {
    if (bill.pay_status) {
      return;
    }

    const response = await axios.patch(
      `${BACKEND_URL}/bill?bill_id=${bill.bill_id}`
    );
    const obj: { data: string; success: boolean } | undefined =
      await response.data;
    if (obj && obj.success) {
      toast.success("Place order successfully");
      setIsPaid(true);
      return;
    }

    setIsPaid(false);
    if (!obj) {
      toast.error("Place order failed");
    } else {
      toast.error(`${obj.data}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 basis-5/12">
      <div className="h-fit p-8 rounded-md border shadow-md my-8">
        <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>

        {/* order details */}
        <div className="py-4 text-lg space-y-4 border-b">
          <div className="flex justify-between items-center font-semibold">
            <span className="font-medium">ID:</span>
            <span className="font-medium">{bill.bill_id}</span>
          </div>
        </div>

        <div className="py-4 text-lg space-y-4 border-b">
          <div className="flex justify-between items-center font-semibold">
            <span className="font-medium">Date time:</span>
            <span className="font-medium">{bill.bill_datetime}</span>
          </div>
        </div>

        <div className="py-4 text-lg space-y-4 border-b">
          <div className="flex justify-between items-center font-semibold">
            <span className="font-medium">Restaurant ID:</span>
            <span className="font-medium">{bill.res_id}</span>
          </div>
        </div>

        <div className="py-4 text-lg space-y-4 border-b">
          <div className="flex justify-between items-center font-semibold">
            <span className="font-medium">Table ID:</span>
            <span className="font-medium">{bill.table_id}</span>
          </div>
        </div>
        <div className="py-4 text-lg space-y-4 border-b">
          <div className="flex justify-between items-center font-semibold">
            <span className="font-medium">Customer ID:</span>
            <span className="font-medium">{bill.cus_id}</span>
          </div>
        </div>

        <div className="py-4 border-b">
          <div className="md:flex justify-between items-center font-bold text-lg md:text-2xl gap-2">
            <h1>Total Cost:</h1>
            <h1 className="text-orange-500">{bill.total_cost} VND</h1>
          </div>
        </div>

        {isPaid ? (
          <div
            className={`w-full block mt-4 uppercase font-bold text-lg bg-orange-600 text-white text-center p-4 rounded-md`}
          >
            Paid, thank you!
          </div>
        ) : (
          <button
            onClick={handlePlaceOrder}
            className={`w-full block mt-4 uppercase font-bold text-lg bg-orange-600 hover:bg-orange-400
           text-white text-center p-4 rounded-md`}
          >
            Place order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
