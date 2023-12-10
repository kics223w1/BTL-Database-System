import React, { FC, useEffect } from "react";
import { Bill, Customer } from "../features/types";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";
import CustomerDishes from "./Customer-dishes";
import CustomerPromotions from "./Customer-promotions";

const billColumns: GridColDef[] = [
  { field: "bill_id", headerName: "bill_id", width: 200 },
  { field: "bill_datetime", headerName: "bill_datetime", width: 200 },
  { field: "pay_status", headerName: "pay_status", width: 200 },
  { field: "res_id", headerName: "res_id", width: 200 },
  { field: "table_id", headerName: "table_id", width: 200 },
  { field: "cus_id", headerName: "cus_id", width: 200 },
  { field: "total_cost", headerName: "total_cost", width: 200 },
];

const convertToBillRows = (bills: Bill[]) => {
  return bills.flatMap((bill) => {
    return {
      id: bill.bill_id,
      bill_id: bill.bill_id,
      bill_datetime: bill.bill_datetime,
      pay_status: bill.pay_status,
      res_id: bill.res_id,
      table_id: bill.table_id,
      cus_id: bill.cus_id,
      total_cost: bill.total_cost,
    };
  });
};

type Props = {
  currentCustomer: Customer;
};

const CustomerBill: FC<Props> = ({ currentCustomer }) => {
  const [bills, setBills] = React.useState<Bill[]>([]);
  const [billRows, setBillRows] = React.useState<any[]>([]);
  const [selectedBill, setSelectedBill] = React.useState<Bill | undefined>(
    undefined
  );

  const apiRef = useGridApiRef();

  useEffect(() => {
    handleFetchBill();
  }, [currentCustomer.cus_id]);

  const handleFetchBill = async () => {
    const response = await axios.get(`${BACKEND_URL}/bill`);
    const obj: { data: Bill[]; success: boolean } | undefined =
      await response.data;

    setSelectedBill(undefined);
    apiRef.current?.setRowSelectionModel([]);

    if (!obj) {
      toast.error("Something went wrong!");
      setBills([]);
      setBillRows([]);
      return;
    }

    if (!obj.success) {
      toast.error(`${obj.data}`);
      setBills([]);
      setBillRows([]);
      return;
    }

    const bills = obj.data.flatMap((bill: Bill) => {
      return bill.cus_id === currentCustomer.cus_id ? [bill] : [];
    });
    const billRows = convertToBillRows(bills);
    setBillRows(billRows);
    setBills(bills);
  };

  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex flex-col gap-5 w-full h-[600px]">
        <span className="font-bold text-lg">Your bills</span>
        <DataGrid
          rows={billRows}
          columns={billColumns}
          apiRef={apiRef}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          onRowSelectionModelChange={(indexes: any) => {
            const newSelectedBills = bills.flatMap((bill: Bill) => {
              return indexes.includes(bill.bill_id) ? [bill] : [];
            });
            if (newSelectedBills.length === 0) {
              setSelectedBill(undefined);
              return;
            }
            setSelectedBill(newSelectedBills[newSelectedBills.length - 1]);
          }}
          checkboxSelection
        />
      </div>
      <div className="flex flex-col gap-5 w-full h-[600px]">
        <span className="font-bold text-lg">
          {selectedBill
            ? `Dishes in bill ${selectedBill.bill_id}`
            : "Please select a bill to see its dishes"}
        </span>
        <CustomerDishes selectedBill={selectedBill} />
      </div>
      <div className="flex flex-col gap-5 w-full h-[600px] mt-5">
        <span className="font-bold text-lg">
          {selectedBill
            ? `Promotions in bill ${selectedBill.bill_id}`
            : "Please select a bill to see its promotions"}
        </span>
        <CustomerPromotions selectedBill={selectedBill} />
      </div>
    </div>
  );
};

export default CustomerBill;
