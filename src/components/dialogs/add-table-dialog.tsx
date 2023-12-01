import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Restaurant, Table } from "../../features/types";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

type AddTableDialogProps = {
  isOpen: boolean;
  restaurant: Restaurant;
  handleClose: () => void;
};

const AddTableDialog: React.FC<AddTableDialogProps> = ({
  isOpen,
  restaurant,
  handleClose,
}) => {
  const [tables, setTables] = React.useState<Table[]>([]);
  const [tableId, setTableId] = React.useState<string>("");

  const [slots, setSlots] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const setup = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/table`);
        const obj: { data: Table[]; success: boolean } | undefined =
          response.data;

        if (!obj) {
          setTables([]);
          return;
        }

        if (obj.success) {
          const resID = restaurant.res_id;
          const newTables = obj.data.flatMap((table) => {
            return table.res_id === resID ? [table] : [];
          });
          setTables(newTables);
          return;
        } else {
          setTables([]);
        }
      } catch (error) {
        setTables([]);
      }
    };

    setup();
  }, []);

  const handleInsertTable = async () => {
    if (slots <= 0) {
      toast.error("Slot count must be greater than 0!");
      return;
    }

    const newTable: Table = {
      res_id: restaurant.res_id,
      table_id: tableId,
      slot_count: slots,
    };

    setIsLoading(true);

    const response = await axios.post(`${BACKEND_URL}/table`, {
      table: newTable,
    });

    setIsLoading(false);

    const obj: { data: string; success: boolean } | undefined = response.data;
    if (!obj) {
      toast.error("Something went wrong!");
      return;
    }

    if (obj.success) {
      toast.success(
        "Insert table successfully. Please refresh to see changes!"
      );
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
      <DialogTitle id="alert-dialog-title">
        Restaurant {restaurant.res_name}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={tableId}
          autoFocus
          margin="dense"
          label={`IDs: ${tables.map((table) => table.table_id)}`}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setTableId(e.target.value.trim());
          }}
        />

        <TextField
          value={slots}
          autoFocus
          margin="dense"
          label="Slot count"
          fullWidth
          type="number"
          variant="standard"
          onChange={(e) => {
            setSlots(Number(e.target.value));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleInsertTable} disabled={!tableId || !slots}>
          {isLoading ? "Loading..." : "Insert"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTableDialog;
