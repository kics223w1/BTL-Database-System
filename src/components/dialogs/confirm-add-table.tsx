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

type ConfirmAddTableProps = {
  isOpen: boolean;
  restaurant: Restaurant;
  handleClose: () => void;
};

const ConfirmDeleteTable: React.FC<ConfirmAddTableProps> = ({
  isOpen,
  restaurant,
  handleClose,
}) => {
  const [tables, setTables] = React.useState<Table[]>([]);
  const [tableId, setTableId] = React.useState<string>("");

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
        }

        setTables([]);
      } catch (error) {
        setTables([]);
      }
    };

    setup();
  }, []);

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
        <DialogContentText id="alert-dialog-description">
          {`Insert new table to ${restaurant.res_name}`}
        </DialogContentText>

        {/* <TextField
          value={identification}
          autoFocus
          margin="dense"
          label="Identification number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setIdentification(e.target.value);
          }}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
        // onClick={handleDeleteTable}
        // disabled={selectedTable === undefined}
        >
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteTable;
