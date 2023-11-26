import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DialogContentText } from "@mui/material";

type AddStaffDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleAgree: () => void;
};

const AddStaffDialog: React.FC<AddStaffDialogProps> = ({
  isOpen,
  handleClose,
  handleAgree,
}) => {
  const [gender, setGender] = React.useState<string>("Male");
  const [role, setRole] = React.useState<string>("Receptionist");

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Add new staff"}</DialogTitle>

      <DialogContent className="flex flex-col w-[600px]">
        <DialogContentText id="alert-dialog-description">
          Please fill in information below
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          label="Identification number"
          type="number"
          fullWidth
          variant="standard"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField"]}>
            <DateField label="Date of birth" variant="standard" fullWidth />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl
          variant="standard"
          sx={{ minWidth: 120, marginTop: "16px" }}
        >
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="standard"
          sx={{ minWidth: 120, marginTop: "16px" }}
        >
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <MenuItem value={"Male"}>Receptionist</MenuItem>
            <MenuItem value={"Female"}>Cashier</MenuItem>
          </Select>
        </FormControl>

        <TextField
          autoFocus
          margin="dense"
          label="Province"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          label="District"
          type="text"
          fullWidth
          variant="standard"
        />

        <TextField
          autoFocus
          margin="dense"
          label="Ward"
          type="text"
          fullWidth
          variant="standard"
        />

        <TextField
          autoFocus
          margin="dense"
          label="Manager ID (Will update later)"
          type="text"
          fullWidth
          variant="standard"
        />

        <TextField
          autoFocus
          margin="dense"
          label="Restaurant ID (Will update later)"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleAgree} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffDialog;
