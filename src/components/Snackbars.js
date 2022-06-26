import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// props
// open: boolean
// message: snackbar message
// anchorOrigin: { vertical: "top", horizontal: "center" }
// duration: number
// severity: "error" | "warning" | "info" | "success"
// onClose: function
export default function CustomizedSnackbars(props) {
  const defaultvertical = "bottom";
  const defaulthorizontal = "left";
  return (
    
      <Snackbar
        open={props.open}
        autoHideDuration={props.duration || 3000}
        // anchorOrigin={{defaultvertical, defaulthorizontal}}
        onClose={props.onClose}
      >
        <Alert
          onClose={props.onClose}
          severity={props.severity || "info"}
          sx={{ width: "100%" }}
        >
          {props.message || "null"}
        </Alert>
      </Snackbar>
  );
}
