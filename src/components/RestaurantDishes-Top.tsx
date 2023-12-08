import React, { FC } from "react";
import { TextField } from "@mui/material";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import { Account, Customer } from "../features/types";
import toast from "react-hot-toast";

type Props = {
  setCurrentCustomer: React.Dispatch<
    React.SetStateAction<Customer | undefined>
  >;
  currentCustomer: Customer | undefined;
  isPageBill?: boolean;
  handleOnClickCreateBill?: () => void;
};

const RestaurantDishesTop: FC<Props> = ({
  setCurrentCustomer,
  currentCustomer,
  isPageBill,
  handleOnClickCreateBill,
}) => {
  const [account, setAccount] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

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
      } else if (obj) {
        toast.error(`${obj.data}`);
        return;
      }
    }

    toast.error(
      "Please go to Customer tab to create a customer with this account before login!"
    );
  };

  return (
    <div className="flex flex-col border-b border-gray-200 pb-5">
      {!currentCustomer && (
        <span className="font-bold text-lg">Please login</span>
      )}
      {currentCustomer ? (
        <div className="flex gap-5 items-baseline">
          <span className="text-lg font-medium">
            Welcome, {currentCustomer.cus_name}!
          </span>
          <span className="text-lg font-medium">
            You have {currentCustomer.loyalty_point} loyalty points.
          </span>
          {isPageBill ? (
            <button
              className="bg-orange-400 hover:bg-orange-400/90 p-2 w-[250px] rounded"
              onClick={() => {
                if (handleOnClickCreateBill) {
                  handleOnClickCreateBill();
                }
              }}
            >
              Create bill to order food
            </button>
          ) : (
            <button
              className="bg-orange-400 hover:bg-orange-400/90 p-2 w-[250px] rounded"
              onClick={() => {
                setCurrentCustomer(undefined);
              }}
            >
              Logout
            </button>
          )}
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
