import React, { FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const billColumns: GridColDef[] = [
  { field: "bill_id", headerName: "bill_id", width: 200 },
  { field: "bill_datetime", headerName: "bill_datetime", width: 200 },
  { field: "pay_status", headerName: "pay_status", width: 200 },
  { field: "res_id", headerName: "res_id", width: 200 },
  { field: "table_id", headerName: "table_id", width: 200 },
  { field: "cus_id", headerName: "cus_id", width: 200 },
  { field: "total_cost", headerName: "total_cost", width: 200 },
];

type Props = {};

const DefaultCustomerBill: FC<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex flex-col gap-5 w-full h-[600px]">
        <span className="font-bold text-lg">
          Please select a customer to his bills
        </span>
        <DataGrid
          rows={[]}
          columns={billColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </div>
    </div>
  );
};

export default DefaultCustomerBill;
