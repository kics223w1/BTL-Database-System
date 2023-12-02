import React from "react";
import { TextField } from "@mui/material";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import { Account, Customer } from "../features/types";
import toast from "react-hot-toast";

const RestaurantDishesTop = () => {
  const [account, setAccount] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [currentCustomer, setCurrentCustomer] = React.useState<
    Customer | undefined
  >(undefined);

  const handleLogin = async () => {
    if (!account) {
      toast.error("Account must not be empty");
      return;
    }
    if (!password) {
      toast.error("Password must not be empty");
      return;
    }

    const response = await axios.get(`${BACKEND_URL}/acc`);
    const obj: { data: Account[]; success: boolean } | undefined =
      await response.data;

    if (!obj) {
      toast.error("Something went wrong!");
      return;
    }

    if (!obj.success) {
      toast.error(`${obj.data}`);
      return;
    }

    const isValid = obj.data.some(
      (acc) => acc.account_id === account && acc.account_password === password
    );

    if (isValid) {
      const responseCustomer = await axios.get(`${BACKEND_URL}/customer`);

      const obj: { data: Customer[]; success: boolean } | undefined =
        responseCustomer.data;

      if (obj && obj.success) {
        const customer = obj.data.find(
          (customer) => customer.account_id === account
        );
        setCurrentCustomer(customer);
        return;
      }
    }

    toast.error("Account or password is incorrect!");
  };

  return (
    <div className="flex flex-col border-b border-gray-200 pb-5">
      <span className="font-bold text-lg">Login to order</span>
      {currentCustomer ? (
        <div className="flex gap-5 items-baseline">
          <span className="text-lg font-medium">
            Welcome, {currentCustomer.cus_name}!
          </span>
          <span className="text-lg font-medium">
            You have {currentCustomer.loyalty_point} loyalty points.
          </span>
          <button
            className="bg-orange-400 hover:bg-orange-400/90 p-2 w-[250px] rounded"
            onClick={() => {
              setCurrentCustomer(undefined);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-5 items-baseline">
          <TextField
            value={account}
            autoFocus
            margin="dense"
            label={"Account"}
            fullWidth
            variant="standard"
            onChange={(e) => {
              setAccount(e.target.value.trim());
            }}
          />

          <TextField
            value={password}
            autoFocus
            margin="dense"
            label={"Password"}
            fullWidth
            variant="standard"
            onChange={(e) => {
              setPassword(e.target.value.trim());
            }}
          />

          <button
            className="bg-orange-400 hover:bg-orange-400/90 p-2 w-[250px] rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDishesTop;
