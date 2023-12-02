import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Account } from "../../features/types";
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

type AddTableDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const AddCustomerDialog: React.FC<AddTableDialogProps> = ({
  isOpen,
  handleClose,
}) => {
  const [customerID, setCustomerID] = React.useState<string>("");
  const [customerName, setCustomerName] = React.useState<string>("");
  const [phoneNum, setPhoneNum] = React.useState<string>("");
  const [accountID, setAccountID] = React.useState<string>("");
  const [accountIDS, setAccountIDS] = React.useState<string[]>([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const setup = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/acc`);
        const obj: { data: Account[]; success: boolean } | undefined =
          response.data;

        if (!obj) {
          setAccountIDS([]);
          return;
        }

        if (obj.success) {
          setAccountIDS(obj.data.map((account) => account.account_id));
          return;
        } else {
          setAccountIDS([]);
        }
      } catch (error) {
        setAccountIDS([]);
      }
    };
    setup();
  }, []);

  const handleCreateCustomer = async () => {
    if (!customerID) {
      toast.error("Customer ID must not be empty");
      return;
    }

    if (!customerName) {
      toast.error("Customer Name must not be empty");
      return;
    }

    if (!phoneNum) {
      toast.error("Phone number must not be empty");
      return;
    }

    if (customerID.length > 10) {
      toast.error("Customer ID must not be longer than 10 characters");
      return;
    }

    if (customerName.length > 50) {
      toast.error("Customer Name must not be longer than 50 characters");
      return;
    }

    if (phoneNum.length > 10) {
      toast.error("Phone number must not be longer than 10 characters");
      return;
    }

    setIsLoading(true);

    const response = await axios.post(`${BACKEND_URL}/customer`, {
      customer: {
        id: customerID,
        name: customerName,
        phone: phoneNum,
        accID: accountID,
      },
    });

    setIsLoading(false);

    const obj: { data: string; success: boolean } | undefined = response.data;
    if (!obj) {
      toast.error("Something went wrong!");
      return;
    }

    if (obj.success) {
      toast.success(`${obj.data}`, {
        duration: 4000,
      });
    } else {
      toast.error(`${obj.data}`, {
        duration: 4000,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create customer</DialogTitle>
      <DialogContent>
        <TextField
          value={customerID}
          autoFocus
          margin="dense"
          label={"Customer ID"}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setCustomerID(e.target.value.trim());
          }}
        />

        <TextField
          value={customerName}
          autoFocus
          margin="dense"
          label="Customer Name"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setCustomerName(e.target.value.trim());
          }}
        />

        <TextField
          value={phoneNum}
          autoFocus
          margin="dense"
          label="Phone number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setPhoneNum(e.target.value.trim());
          }}
        />

        <FormControl
          variant="standard"
          sx={{ width: "100%", marginTop: "16px" }}
        >
          <InputLabel>Account ID</InputLabel>
          <Select
            value={accountID}
            onChange={(e: any) => {
              setAccountID(e.target.value);
            }}
          >
            {accountIDS.map((accountID) => {
              return (
                <MenuItem key={`${accountID}CreateCustomer`} value={accountID}>
                  {accountID}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={handleCreateCustomer}
          disabled={!accountID || !customerID || !customerName || !phoneNum}
        >
          {isLoading ? "Loading..." : "Create account"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerDialog;
