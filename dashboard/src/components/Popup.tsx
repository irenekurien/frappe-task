import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

type PopupType = {
  title: string;
  isOpen: boolean;
  content: React.ReactElement;
  buttons: React.ReactElement;
  handleClose: () => void;
};

const Popup = ({
  title,
  isOpen,
  content,
  buttons,
  handleClose,
}: PopupType) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        {buttons}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
