import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Customer,
  PayLoadReservation,
  ReservedTable,
  Restaurant,
  Table,
} from "../../features/types";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import moment from "moment";

type BookTableDialogProps = {
  isOpen: boolean;
  restaurant: Restaurant;
  customer: Customer;
  handleClose: () => void;
};

const BookTableDialog: React.FC<BookTableDialogProps> = ({
  isOpen,
  restaurant,
  customer,
  handleClose,
}) => {
  const [selectedTable, setSelectedTable] = React.useState<Table | undefined>(
    undefined
  );
  const [tables, setTables] = React.useState<Table[]>([]);
  const [reservedTables, setReservedTables] = React.useState<ReservedTable[]>(
    []
  );
  const [reservationID, setReservationID] = React.useState<string>("");
  const [allIDs, setAllIDs] = React.useState<string[]>([]);

  React.useEffect(() => {
    const setup = async () => {
      try {
        const [responseTable, responseReservedTable] = await Promise.all([
          axios.get(`${BACKEND_URL}/table`),
          axios.get(`${BACKEND_URL}/reservedTable`),
        ]);

        // Table
        const objTable: { data: Table[]; success: boolean } | undefined =
          responseTable.data;
        if (!objTable) {
          setTables([]);
        } else {
          if (objTable.success) {
            const resID = restaurant.res_id;
            const newTables = objTable.data.flatMap((table) => {
              return table.res_id === resID ? [table] : [];
            });
            setTables(newTables);
          } else {
            setTables([]);
          }
        }

        // Reserved table
        const objReservedTable:
          | {
              data: ReservedTable[];
              success: boolean;
            }
          | undefined = responseReservedTable.data;
        if (!objReservedTable) {
          setReservedTables([]);
        } else {
          if (objReservedTable.success) {
            const resID = restaurant.res_id;
            const newAllIDs = objReservedTable.data.map(
              (reservedTable) => reservedTable.reservation_id
            );
            const newReservedTables = objReservedTable.data.flatMap(
              (reservedTable) => {
                return reservedTable.res_id === resID ? [reservedTable] : [];
              }
            );

            setReservedTables(newReservedTables);
            setAllIDs(newAllIDs);
          } else {
            setReservedTables([]);
          }
        }
      } catch (error) {
        setTables([]);
      }
    };

    setup();
  }, []);

  const handleBookTable = async () => {
    if (!selectedTable) {
      toast.error("Please select a table!");
      return;
    }

    if (!reservationID) {
      toast.error("Please enter reservation ID!");
      return;
    }

    // Get the current date and time
    const currentDate = moment();

    // Format the date and time
    const formattedDateTime = currentDate.format("YYYY-MM-DD HH:mm:ss");
    const payLoad: PayLoadReservation = {
      reservation_id: reservationID,
      res_id: restaurant.res_id,
      cus_id: customer.cus_id,
      date_time: formattedDateTime,
      table_id: selectedTable.table_id,
      slot_count: selectedTable.slot_count,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/reservation`, {
        reservation: payLoad,
      });
      const obj: { data: string; success: boolean } | undefined = response.data;

      setSelectedTable(undefined);

      if (!obj) {
        toast.error("Something went wrong");
        return;
      }

      if (obj.success) {
        console.log(obj);

        toast.success(`${obj.data}`);
        handleClose();
        return;
      }

      toast.error(`Database error: ${obj.data}`);
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
        Book table at {restaurant.res_name} (ID: {restaurant.res_id})
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {tables.length === 0
            ? "This restaurant has 0 table, please close the dialog."
            : "You can't book the table that has been reserved!"}
        </DialogContentText>

        <TextField
          value={reservationID}
          margin="dense"
          label={`Enter reservation ID`}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setReservationID(e.target.value);
          }}
        />

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {tables.map((table, index) => {
              const isEnabled = reservedTables.every(
                (reservedTables) => reservedTables.table_id !== table.table_id
              );

              return (
                <FormControlLabel
                  key={`TableID_${restaurant.res_id}_${index}`}
                  control={
                    <Radio
                      disabled={!isEnabled}
                      checked={
                        selectedTable &&
                        selectedTable.table_id === table.table_id
                      }
                    />
                  }
                  onClick={() => {
                    if (isEnabled) {
                      setSelectedTable(table);
                    }
                  }}
                  label={`${table.table_id}, slot: ${table.slot_count} ${
                    isEnabled ? "" : "(reserved)"
                  }`}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={handleBookTable}
          disabled={!selectedTable || !reservationID}
        >
          Book this table
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookTableDialog;
