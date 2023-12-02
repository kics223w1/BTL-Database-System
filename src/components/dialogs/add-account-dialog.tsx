import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Account, Restaurant } from "../../features/types";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

type AddTableDialogProps = {
  isOpen: boolean;
  accounts: Account[];
  handleClose: () => void;
};

const AddAccountDialog: React.FC<AddTableDialogProps> = ({
  isOpen,
  accounts,
  handleClose,
}) => {
  const [accountID, setAccountID] = React.useState<string>("");
  const [accountPassword, setAccountPassword] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleInsertTable = async () => {
    if (!accountID) {
      toast.error("accountID must not be empty");
      return;
    }

    if (!accountPassword) {
      toast.error("accountPassword must not be empty");
      return;
    }

    if (accountID.length > 10) {
      toast.error("accountID must not be longer than 10 characters");
      return;
    }

    if (accountPassword.length > 20) {
      toast.error("accountPassword must not be longer than 10 characters");
      return;
    }

    setIsLoading(true);

    const response = await axios.post(`${BACKEND_URL}/acc`, {
      account: {
        account_id: accountID,
        account_password: accountPassword,
      },
    });

    setIsLoading(false);

    const obj: { data: string; success: boolean } | undefined = response.data;
    if (!obj) {
      toast.error("Something went wrong!");
      return;
    }

    if (obj.success) {
      toast.success(`${obj.data}`);
    } else {
      toast.error(`${obj.data}`);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create account</DialogTitle>
      <DialogContent>
        <TextField
          value={accountID}
          autoFocus
          margin="dense"
          label={"Account ID"}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setAccountID(e.target.value.trim());
          }}
        />

        <TextField
          value={accountPassword}
          autoFocus
          margin="dense"
          label="Account password"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setAccountPassword(e.target.value.trim());
          }}
        />
        <button
          className={`bg-orange-400 py-2 rounded w-[440px] px-4 hover:bg-orange-400/90`}
          onClick={() => {}}
        >
          Login
        </button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={handleInsertTable}
          disabled={!accountID || !accountPassword}
        >
          {isLoading ? "Loading..." : "Create account"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAccountDialog;
