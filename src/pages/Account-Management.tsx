import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Account, Customer } from "../features/types";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import AddAccountDialog from "../components/dialogs/add-account-dialog";
import RestaurantDishesTop from "../components/RestaurantDishes-Top";
import CustomerBill from "../components/Customer-bill";
import Dishes from "../components/Dishes";
import useRestaurantsMenu from "../hooks/useRestaurantsMenu";

const columns: GridColDef[] = [
  { field: "account_id", headerName: "account_id", width: 250 },
  {
    field: "account_password",
    headerName: "account_password",
    width: 250,
  },
];

const convertToRows = (accounts: Account[]) => {
  return accounts.map((account) => {
    return {
      id: account.account_id,
      account_id: account.account_id,
      account_password: account.account_password,
    };
  });
};

const AccountManagement = () => {
  const { dishes, isLoading } = useRestaurantsMenu();

  const [rows, setRows] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [addAccountDialogOpen, setAddAccountDialogOpen] =
    useState<boolean>(false);

  const [currentCustomer, setCurrentCustomer] = React.useState<
    Customer | undefined
  >(undefined);

  useEffect(() => {
    handleGetAccounts();
  }, []);

  const handleGetAccounts = async () => {
    const response = await axios.get(`${BACKEND_URL}/acc`);
    const obj: { data: Account[]; success: boolean } | undefined =
      await response.data;

    if (!obj) {
      toast.error("Something went wrong!");
      setRows([]);
      return;
    }

    if (!obj.success) {
      toast.error(`${obj.data}`);
      setRows([]);
      return;
    }

    const newRows = convertToRows(obj.data);
    setAccounts(obj.data);
    setRows(newRows);
  };

  return (
    <div className="w-full h-full overflow-auto px-36 py-14 mb-10">
      <span className="font-bold text-lg">Account table</span>
      <div className="w-full h-[600px]">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </div>

      <div className="flex items-center justify-center gap-5 mt-10">
        <button
          className={`bg-orange-400 py-2 rounded w-[440px] px-4 hover:bg-orange-400/90`}
          onClick={() => {
            setAddAccountDialogOpen(true);
          }}
        >
          Create new account
        </button>
        <button
          className={`bg-orange-400 py-2 rounded w-[440px] px-4 hover:bg-orange-400/90`}
          onClick={handleGetAccounts}
        >
          Refresh
        </button>
      </div>

      {addAccountDialogOpen && (
        <AddAccountDialog
          accounts={accounts}
          isOpen={addAccountDialogOpen}
          handleClose={() => {
            setAddAccountDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AccountManagement;
