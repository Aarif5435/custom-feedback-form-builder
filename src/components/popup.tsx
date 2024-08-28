

import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { Field, setFields, FeedbackForm } from "../redux/feedbackFormsSlice";

type props = {
    currentValue: any;
    open: boolean,
    setOpen: (open: boolean) => void;
    currentTitle: string;
}

const FormTitleDialog: React.FC<props> = ({currentValue, open, setOpen, currentTitle}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateNewForm = (title: string) => {
    const newForm: FeedbackForm = {
     ...currentValue,
     title
    };

    dispatch(setFields(newForm));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            width: "400px",
            maxWidth: "none",
          },
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const title = formJson.text as string;
            handleCreateNewForm(title);
            handleClose();
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
          
        >
          Edit
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "8px" }}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            placeholder="Enter form title"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
              style: { fontSize: "16px" },
              disableUnderline: false,
              sx: {
                "&:before": {
                  borderBottom: "2px solid black",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "2px solid black",
                },
              },
            }}
            InputLabelProps={{
              style: { fontSize: "16px", color: "#9e9e9e" },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ paddingRight: "16px", paddingBottom: "8px" }}>
          <Button
            type="submit"
            sx={{
              color: "#4caf50",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            UPDATE
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: "#9e9e9e",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormTitleDialog;
