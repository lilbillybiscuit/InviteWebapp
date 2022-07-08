import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import globals from "../globals";
import Snackbars from "./Snackbars";
export default function ChangeAccountDialog(props) {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [accountID, setAccountID] = React.useState("");
  const handleSubmit = async () => {
    setSubmitting(true);
    const response = await fetch(
      `${globals.api_domain}/api/session/changeaccount`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({accountid: accountID}),
      }
    );
    if (response.status === 200) {
      var json = await response.json();
      if (json.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload(false);
        },1000);
      } else {
        setSnackbarOpen(true);
      }
      setSubmitting(false);
    } else {
      setSubmitting(false);
      setSnackbarOpen(true);
    }
  };
  const handleTextUpdate = (event) => {
    setAccountID(event.target.value);
  }
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Switch accounts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter another account ID to switch accounts. Your account ID is
            included in your RSVP convirmation email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Account ID"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleTextUpdate}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} disabled={submitting}>
            Cancel
          </Button>
          <Box sx={{m:1, position: "relative"}}>
            <Button
              variant="contained"
              sx={buttonSx}
              disabled={submitting}
              onClick={handleSubmit}
            >
              Change
            </Button>
            {submitting && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </DialogActions>
      </Dialog>
      <Snackbars
        open={snackbarOpen}
        message="Something went wrong with changing your ID"
        severity="error"
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}
