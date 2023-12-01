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
import toast from "react-hot-toast";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

type ConfirmDeleteTableProps = {
  isOpen: boolean;
  restaurant: Restaurant;
  handleClose: () => void;
};

const ConfirmDeleteTable: React.FC<ConfirmDeleteTableProps> = ({
  isOpen,
  restaurant,
  handleClose,
}) => {
  const [selectedTable, setSelectedTable] = React.useState<Table | undefined>(
    undefined
  );
  const [tables, setTables] = React.useState<Table[]>([]);

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

  const handleDeleteTable = async () => {
    if (!selectedTable) {
      toast.error("Please select a table to delete!");
      return;
    }

    try {
      const response = await axios.delete(`${BACKEND_URL}/table`, {
        params: {
          table_id: selectedTable.table_id,
          res_id: restaurant.res_id,
        },
      });
      const obj: { data: string; success: boolean } | undefined = response.data;

      setSelectedTable(undefined);

      if (!obj) {
        toast.error("Something went wrong");
        return;
      }

      if (obj.success) {
        console.log(obj);

        toast.success(
          "Delete table successfully, please refresh the page to see the changes"
        );
        handleClose();
        return;
      }

      toast.error(
        `This table is reserved, you can't delete it. Please delete the table which hasn't been reserved! \n\n Database error: ${obj.data}`
      );
    } catch (error) {
      setSelectedTable(undefined);
      toast.error(`${error}`);
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
        <DialogContentText id="alert-dialog-description">
          {tables.length === 0
            ? "This restaurant has 0 table, please close the dialog."
            : "Select table to delete"}
        </DialogContentText>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {tables.map((table, index) => {
              return (
                <FormControlLabel
                  key={`TableID_${restaurant.res_id}_${index}`}
                  control={
                    <Radio
                      checked={
                        selectedTable &&
                        selectedTable.table_id === table.table_id
                      }
                    />
                  }
                  onClick={() => {
                    setSelectedTable(table);
                  }}
                  label={`${table.table_id}, slot: ${table.slot_count}`}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={handleDeleteTable}
          disabled={selectedTable === undefined}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteTable;
