import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import plus from "../../public/asset/PlusIcon.png";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Field, setFields, FeedbackForm } from "../redux/feedbackFormsSlice";
import { v4 as uuidv4 } from "uuid";
import { fetchFeedbackForms, deleteFeedbackForm } from '@/redux/feedbackFormsSlice';
import { Snackbar, SnackbarOrigin } from '@mui/material';

interface State extends SnackbarOrigin {
  toastOpen: boolean;
  message: string;
}

const NewFormCard: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.feedbackForms.forms);
  const [state, setState] = React.useState<State>({
    toastOpen: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, toastOpen, message } = state;

  useEffect(() => {
    dispatch(fetchFeedbackForms());
  }, [dispatch]);

  const handleCreateNewForm = (title: string) => {
    const newForm: FeedbackForm = {
      id: uuidv4(), 
      title,
      fields: [], 
      isPublished: false
    };


    dispatch(setFields(newForm));

    router.push({
      pathname: "/admin/form-builder",
      query: {
        id: newForm.id || "new-form2344",
        title: newForm.title,
        description: newForm.description,
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    if(forms.length < 7){
      setOpen(true);
    }else{
      setState({
        toastOpen: true,
        vertical: "top",
        horizontal: "center",
        message: "You have reached the maximum form creation limit",
      });
    }
  };

  return (
    <>
      <div
        onClick={handleClickOpen}
        className="w-80 h-96 shadow-lg bg-white rounded p-4 m-4 flex items-center justify-center cursor-pointer border-2"
      >
        <div className="text-center">
          <div className="flex justify-center">
            <Image src={plus} alt={"plus"} />
          </div>
          <p className="text-3xl font-semibold text-black mt-6">New Form</p>
        </div>
      </div>

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
          Create Feedback Form
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
            CREATE
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={toastOpen}
        onClose={() => setState({ ...state, toastOpen: false })}
        message={message}
        key={vertical + horizontal}
      />
    </>
  );
};

export default NewFormCard;
