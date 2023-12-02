import React from "react";
import toast from "react-hot-toast";
import { TextField } from "@mui/material";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import { CustomerAndTotal } from "../features/types";

const CustomerManagementBottom = () => {
  const [amount, setAmount] = React.useState<number>(100000);
  const [month, setMonth] = React.useState<number>(1);
  const [year, setYear] = React.useState<number>(2023);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleFindCustomer = async () => {
    if (month <= 0 || year <= 0) {
      toast.error("Month and year must be greater than 0!");
      return;
    }

    setIsLoading(true);
    const response = await axios.get(`${BACKEND_URL}/customer`, {
      params: {
        month: month,
        year: year,
      },
    });

    setIsLoading(false);

    const obj: { data: CustomerAndTotal[]; success: boolean } | undefined =
      response.data;

    if (!obj) {
      toast.error("Something went wrong!");
      return;
    }

    if (obj.success) {
      toast.success(`${obj.data}`, {
        duration: 6000,
      });
      return;
    }

    toast.error(`${obj.data}`, {
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col gap-5 py-10 border-t border-gray-200">
      <div className="flex items-baseline gap-5">
        <TextField
          label="Amount"
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
          className={`bg-orange-400 py-2 rounded w-80 hover:bg-orange-400/90`}
          onClick={handleFindCustomer}
        >
          {isLoading ? "Loading..." : "Find customer"}
        </button>
      </div>
    </div>
  );
};

export default CustomerManagementBottom;
