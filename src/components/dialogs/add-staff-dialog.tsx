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
import { Restaurant, Staff, StaffForAdding } from "../../features/types";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import React, { useState, FC } from "react";

type AddStaffDialogProps = {
  staffs: Staff[];
  selectedStaff: Staff | undefined;
  restaurant: Restaurant[];
  isOpen: boolean;
  handleClose: () => void;
  handleAgree: () => void;
};

const AddStaffDialog: FC<AddStaffDialogProps> = ({
  restaurant,
  staffs,
  selectedStaff,
  isOpen,
  handleClose,
  handleAgree,
}) => {
  const [identification, setIdentification] = useState(
    selectedStaff ? selectedStaff.identification : ""
  );
  const [name, setName] = useState(
    selectedStaff ? selectedStaff.staff_name : ""
  );
  const [gender, setGender] = useState<number>(
    selectedStaff ? selectedStaff.gender : 1
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    selectedStaff ? selectedStaff.date_of_birth : ""
  );
  const [managerID, setManagerID] = useState(
    selectedStaff ? selectedStaff.manager_id : ""
  );
  const [province, setProvince] = useState(
    selectedStaff ? selectedStaff.province : ""
  );
  const [district, setDistrict] = useState(
    selectedStaff ? selectedStaff.district : ""
  );
  const [ward, setWard] = useState(selectedStaff ? selectedStaff.ward : "");
  const [addressNumber, setAddressNumber] = useState(
    selectedStaff ? selectedStaff.address_number : ""
  );
  const [restaurantId, setRestaurantId] = useState(
    selectedStaff ? selectedStaff.res_id : ""
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accountId, setAccountId] = useState(
    selectedStaff ? selectedStaff.account_id : ""
  );

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const managers = staffs.flatMap((staff: Staff) => {
    return staff.manager_id === null ? [staff] : [];
  });

  const handleAddNewStaff = async () => {
    setErrorMessages([]);
    setSuccessMessage("");

    const newStaff: StaffForAdding = {
      name: name,
      identification,
      gender,
      date_of_birth: dateOfBirth,
      manager_id: managerID ? managerID : null,
      province,
      district,
      ward,
      address_number: addressNumber,
      email: email,
      phone_number: phone,
      res_id: restaurantId,
      accID: accountId,
    };

    const { data } = await axios.post(`${BACKEND_URL}/staff`, {
      staff: newStaff,
    });

    if (data.success) {
      setSuccessMessage(data.data);
      return;
    }

    setErrorMessages(data.data);
  };

  const handleUpdateStaff = async () => {};

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
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
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
          value={email}
          margin="dense"
          label="Email"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          autoFocus
          margin="dense"
          value={phone}
          label="Phone number"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />

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
            and hit `Get Staffs` to see the latest table
          </p>
        )}
      </DialogContent>
      <DialogActions className="flex items-center justify-between">
        <Button onClick={handleClose}>Close</Button>

        <div className="flex items-center gap-2">
          <Button onClick={handleUpdateStaff}>Update</Button>
          <Button onClick={handleAddNewStaff}>Add</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffDialog;
