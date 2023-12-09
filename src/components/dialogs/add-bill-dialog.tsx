import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Bill,
  BillToCreate,
  Customer,
  Restaurant,
  Table,
} from "../../features/types";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import moment from "moment";

type AddBillDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  customer: Customer;
  handleSetBillID: (billID: string) => void;
};

const AddBillDialog: React.FC<AddBillDialogProps> = ({
  isOpen,
  handleClose,
  customer,
  handleSetBillID,
}) => {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [bills, setBills] = React.useState<Bill[]>([]);
  const [tables, setTables] = React.useState<Table[]>([]);

  const [billID, setBillID] = React.useState<string>("");
  const [tableId, setTableId] = React.useState<string>("");
  const [resId, setResId] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const setup = async () => {
      setIsLoading(false);
      setBillID("");
      setTableId("");
      setResId("");

      try {
        const [responseRes, responseBill, responseTable] = await Promise.all([
          axios.get(`${BACKEND_URL}/restaurant`),
          axios.get(`${BACKEND_URL}/bill`),
          axios.get(`${BACKEND_URL}/table`),
        ]);
        const objRes: { data: Restaurant[]; success: boolean } | undefined =
          responseRes.data;
        const objBill: { data: Bill[]; success: boolean } | undefined =
          responseBill.data;
        const objTable: { data: Table[]; success: boolean } | undefined =
          responseTable.data;

        if (objRes && objRes.success) {
          setRestaurants(objRes.data);
        } else {
          setRestaurants([]);
        }

        if (objBill && objBill.success) {
          setBills(objBill.data);
        } else {
          setBills([]);
        }

        if (objTable && objTable.success) {
          setTables(objTable.data);
        } else {
          setTables([]);
        }
      } catch (error) {
        setRestaurants([]);
        setBills([]);
        setTables([]);
      }
    };

    setup();
  }, []);

  const handleCreateBill = async () => {
    // Get the current date and time
    const currentDate = moment();

    // Format the date and time
    const formattedDateTime = currentDate.format("YYYY-MM-DD HH:mm:ss");

    const newBill: BillToCreate = {
      bill_id: billID,
      bill_datetime: formattedDateTime,
      res_id: resId,
      table_id: tableId,
      cus_id: customer.cus_id,
    };

    const response = await axios.post(`${BACKEND_URL}/bill/create_bill`, {
      bill: newBill,
    });
    const obj: { data: string; success: boolean } | undefined = response.data;
    if (obj && obj.success) {
      toast.success(`${obj.data}`);
      handleSetBillID(billID);
      handleClose();
      return;
    }
    if (obj) {
      toast.error(`${obj.data}`);
      return;
    }
    toast.error("Something went wrong!");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create a bill</DialogTitle>
      <DialogContent className="w-[400px]">
        <TextField
          value={billID}
          margin="dense"
          label={`IDs: ${bills.map((bill) => bill.bill_id)}`}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setBillID(e.target.value.trim());
          }}
        />

        <FormControl
          variant="standard"
          sx={{ width: "100%", marginTop: "16px" }}
        >
          <InputLabel>Restaurant ID</InputLabel>
          <Select
            value={resId}
            onChange={(e: any) => {
              setResId(e.target.value);
            }}
          >
            {restaurants.map((restaurant) => {
              return (
                <MenuItem key={restaurant.res_id} value={restaurant.res_id}>
                  {restaurant.res_name} with ID: {restaurant.res_id}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          value={tableId}
          margin="dense"
          label={`Table ID`}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setTableId(e.target.value.trim());
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={handleCreateBill}
          disabled={!billID || !tableId || !resId}
        >
          {isLoading ? "Loading..." : "Create bill"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBillDialog;
