import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  handleAgree: () => void;
  handleDisagree: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  handleClose,
  handleAgree,
  handleDisagree,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Disagree</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
