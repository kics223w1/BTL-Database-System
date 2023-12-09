import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DialogContentText } from "@mui/material";
import {
  Restaurant,
  Staff,
  StaffForAdding,
  StaffForUpdating,
} from "../../features/types";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import React, { useState, FC } from "react";

type UpdateStaffDialogProps = {
  staffs: Staff[];
  selectedStaff: Staff;
  restaurant: Restaurant[];
  isOpen: boolean;
  handleClose: () => void;
  handleAgree: () => void;
};

const UpdateStaffDialog: FC<UpdateStaffDialogProps> = ({
  restaurant,
  staffs,
  selectedStaff,
  isOpen,
  handleClose,
  handleAgree,
}) => {
  const [identification, setIdentification] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string>(
    selectedStaff.gender === 1
      ? "Male"
      : selectedStaff.gender === 2
      ? "Female"
      : "NULL"
  );
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [managerID, setManagerID] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [accountId, setAccountId] = useState("");

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const managers = staffs.flatMap((staff: Staff) => {
    return staff.manager_id === null ? [staff] : [];
  });

  const handleUpdateStaff = async () => {
    setErrorMessages([]);
    setSuccessMessage("");

    const updatedStaff: StaffForUpdating = {
      id: selectedStaff.staff_id,
      name: name ? name : "NULL",
      identification: identification ? identification : "NULL",
      gender: gender === "Male" ? 1 : gender === "Female" ? 0 : "NULL",
      date_of_birth: dateOfBirth ? dateOfBirth : "NULL",
      manager_id: managerID ? managerID : "NULL",
      province: province ? province : "NULL",
      district: district ? district : "NULL",
      ward: ward ? ward : "NULL",
      address_number: addressNumber ? addressNumber : "NULL",
      res_id: restaurantId ? restaurantId : "NULL",
      accID: accountId ? accountId : "NULL",
    };

    const { data } = await axios.patch(`${BACKEND_URL}/staff`, {
      staff: updatedStaff,
    });

    if (data.success) {
      setSuccessMessage(data.data);
      return;
    }

    setErrorMessages([data.data]);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Update staff ${selectedStaff.staff_name} with ID: ${selectedStaff.staff_id}`}</DialogTitle>

      <DialogContent className="flex flex-col w-[600px]">
        <DialogContentText id="alert-dialog-description">
          Leave blank for the fields that you don't want to update
        </DialogContentText>

        <TextField
          value={identification}
          autoFocus
          margin="dense"
          label="Identification number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setIdentification(e.target.value);
          }}
        />

        <TextField
          value={name}
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <FormControl
          variant="standard"
          sx={{ minWidth: 120, marginTop: "16px" }}
        >
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e: any) => {
              setGender(e.target.value);
            }}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"NULL"}>NULL, no update</MenuItem>
          </Select>
        </FormControl>

        <TextField
          autoFocus
          value={dateOfBirth}
          margin="dense"
          placeholder="YYYY-MM-DD"
          label="Date of birth (YYYY-MM-DD)"
          type="string"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
        />

        <FormControl
          variant="standard"
          sx={{ minWidth: 120, marginTop: "16px" }}
        >
          <InputLabel>Manager</InputLabel>
          <Select
            value={managerID}
            onChange={(e: any) => {
              setManagerID(e.target.value);
            }}
          >
            {managers.map((manager, index) => (
              <MenuItem
                key={`MenuAddManager_${index}`}
                value={`${manager.staff_id}`}
              >
                {manager.staff_name} (ID: {manager.staff_id})
              </MenuItem>
            ))}
            <MenuItem value={""}>No ID (NULL)</MenuItem>
          </Select>
        </FormControl>

        <TextField
          autoFocus
          value={province}
          margin="dense"
          label="Province"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setProvince(e.target.value);
          }}
        />
        <TextField
          autoFocus
          value={district}
          margin="dense"
          label="District"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setDistrict(e.target.value);
          }}
        />

        <TextField
          autoFocus
          margin="dense"
          value={ward}
          label="Ward"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setWard(e.target.value);
          }}
        />

        <TextField
          autoFocus
          margin="dense"
          value={addressNumber}
          label="Address number"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setAddressNumber(e.target.value);
          }}
        />

        <FormControl
          variant="standard"
          sx={{ minWidth: 120, marginTop: "16px" }}
        >
          <InputLabel>Restaurant</InputLabel>
          <Select
            value={restaurantId}
            onChange={(e) => {
              setRestaurantId(e.target.value);
            }}
          >
            {restaurant.map((res, index) => (
              <MenuItem
                key={`MenuAddRestaurant_${index}`}
                value={`${res.res_id}`}
              >
                {res.res_name} (ID: {res.res_id})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          autoFocus
          margin="dense"
          value={accountId}
          label="AccountID"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setAccountId(e.target.value);
          }}
        />

        {errorMessages.length > 0 && (
          <div className="flex flex-col gap-1">
            {errorMessages.map((message, index) => (
              <p
                key={`ErrorMessage_${index}`}
                className="text-red-500 text-sm font-medium"
              >
                {message}
              </p>
            ))}
          </div>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm font-medium mt-2">
            Message from server: {successMessage} <br /> Please close the dialog
            and hit `Refresh` to see the latest table
          </p>
        )}
      </DialogContent>
      <DialogActions className="flex items-center justify-between">
        <Button onClick={handleClose}>Close</Button>

        <div className="flex items-center gap-2">
          <Button onClick={handleUpdateStaff}>Update staff</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateStaffDialog;
