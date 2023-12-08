import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import { Customer, CustomerPay } from "../features/types";
import toast from "react-hot-toast";
import { TextField } from "@mui/material";
import AddCustomerDialog from "../components/dialogs/add-customer-dialog";

const columns: GridColDef[] = [
  { field: "cus_id", headerName: "cus_id", width: 200 },
  {
    field: "cus_name",
    headerName: "cus_name",
    width: 300,
  },
  {
    field: "phone_num",
    headerName: "phone_num",
    width: 200,
  },
  {
    field: "account_id",
    headerName: "account_id",
    width: 200,
  },
  {
    field: "loyalty_point",
    headerName: "loyalty_point",
    width: 200,
  },
];

const columnsCustomerPay: GridColDef[] = [
  ...columns,
  {
    field: "Total",
    headerName: "Total",
    width: 200,
  },
];

const convertToRows = (customers: Customer[]) => {
  return customers.map((customer) => {
    return {
      id: customer.cus_id,
      cus_id: customer.cus_id,
      cus_name: customer.cus_name,
      phone_num: customer.phone_num,
      account_id: customer.account_id,
      loyalty_point: customer.loyalty_point,
    };
  });
};

const convertToRowsCustomerPay = (customers: CustomerPay[]) => {
  return customers.map((customer) => {
    return {
      id: customer.cus_id,
      cus_id: customer.cus_id,
      cus_name: customer.cus_name,
      phone_num: customer.phone_num,
      account_id: customer.account_id,
      loyalty_point: customer.loyalty_point,
      Total: customer.Total,
    };
  });
};

const CustomerManagement = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] =
    React.useState<boolean>(false);

  const apiRef = useGridApiRef();

  useEffect(() => {
    handleGetCustomers();
  }, []);

  const handleGetCustomers = async () => {
    const responseCustomer = await axios.get(`${BACKEND_URL}/customer`);

    const obj: { data: Customer[]; success: boolean } | undefined =
      responseCustomer.data;

    if (obj && obj.success) {
      const newRows = convertToRows(obj.data);
      setCustomers(obj.data);
      setRows(newRows);
      return;
    }

    setCustomers([]);
    setRows([]);
    setSelectedCustomer(undefined);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto justify-center py-14 px-32 gap-10">
      <div className="w-full h-[600px] flex flex-col gap-5">
        <span className="text-lg font-bold">Customer Table </span>
        <DataGrid
          rows={rows}
          columns={columns}
          apiRef={apiRef}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          onRowSelectionModelChange={(indexes: any) => {
            const newSelectedCustomer = customers.flatMap((cus: Customer) => {
              return indexes.includes(cus.cus_id) ? [cus] : [];
            });
            if (newSelectedCustomer.length === 0) {
              setSelectedCustomer(undefined);
              return;
            }
            setSelectedCustomer(
              newSelectedCustomer[newSelectedCustomer.length - 1]
            );
          }}
          checkboxSelection
        />
        <div className="flex items-center justify-center w-full mt-5 gap-5">
          <button
            className={`bg-orange-400 py-2 rounded px-4 hover:bg-orange-400/90`}
            onClick={() => {
              setIsAddCustomerDialogOpen(true);
            }}
          >
            Create customer
          </button>
          <button
            className={`bg-orange-400 py-2 rounded px-4 hover:bg-orange-400/90`}
            onClick={handleGetCustomers}
          >
            Refresh
          </button>
        </div>
      </div>

      <CustomerManagementBottom />

      {isAddCustomerDialogOpen && (
        <AddCustomerDialog
          isOpen={isAddCustomerDialogOpen}
          handleClose={() => {
            setIsAddCustomerDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

const CustomerManagementBottom = () => {
  const [amount, setAmount] = React.useState<number>(100000);
  const [month, setMonth] = React.useState<number>(1);
  const [year, setYear] = React.useState<number>(2023);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);

  const apiRef = useGridApiRef();

  const handleFindCustomer = async () => {
    if (month <= 0 || year <= 0) {
      toast.error("Month and year must be greater than 0!");
      return;
    }

    setIsLoading(true);
    const response = await axios.get(`${BACKEND_URL}/customer_pay`, {
      params: {
        month: month,
        year: year,
        money: amount,
      },
    });

    setIsLoading(false);

    const obj: { data: CustomerPay[]; success: boolean } | undefined =
      response.data;

    if (!obj) {
      toast.error("Something went wrong!");
      setRows([]);
      return;
    }

    if (!obj.success) {
      toast.error(`${obj.data}`, {
        duration: 2000,
      });
      setRows([]);
      return;
    }

    if (obj.data.length === 0) {
      toast.success(
        `There are no customers who made payments of ${amount} VND during ${month}/${year}!`,
        {
          duration: 5000,
        }
      );
      setRows([]);
      return;
    }

    const newRows = convertToRowsCustomerPay(obj.data);
    setRows(newRows);
  };

  return (
    <div className="flex flex-col gap-5 py-10 border-t border-gray-200">
      <span className="text-lg font-bold">PROCEDURE customer_expense</span>

      <div className="flex items-baseline gap-5">
        <TextField
          label="Amount (VND)"
          value={amount}
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />

        <TextField
          label="At month"
          value={month}
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setMonth(Number(e.target.value));
          }}
        />

        <TextField
          label="At year"
          value={year}
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setYear(Number(e.target.value.trim()));
          }}
        />

        <button
          className={`bg-orange-400 py-2 rounded w-[440px] px-4 hover:bg-orange-400/90`}
          onClick={handleFindCustomer}
        >
          {isLoading ? "Loading..." : "Find customers"}
        </button>
      </div>

      <div className="w-full h-96">
        <DataGrid
          rows={rows}
          columns={columnsCustomerPay}
          apiRef={apiRef}
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

export default CustomerManagement;
