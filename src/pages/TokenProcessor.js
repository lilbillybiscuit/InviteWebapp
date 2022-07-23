import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { green, red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import globals from "../globals";
//Icons
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState("pending");
  const [validToken, setValidToken] = React.useState(false);
  let params = useParams();
  let navigate = useNavigate();

  var renderText = () => {
    switch (authenticated) {
      case "pending":
        return "Authenticating...";
      case "error":
        return "Invalid token";
      case "success":
        return "Success - Redirecting...";
      default:
        return "Waiting...";
    }
  };

  var renderIcon = () => {
    switch (authenticated) {
      case "pending":
        return <CircularProgress />;
      case "error":
        return "You may still access this page, but some information will be hidden";
      case "success":
        return (
          <Avatar sx={{ bgcolor: green[500] }}>
            <CheckIcon />
          </Avatar>
        );
      default:
        return null;
    }
  };

  const authenticateAsync = async () => {
    if (!verifyTokenFormat(params.token)) {
      navigate("/");
      return;
    }
    var response = await fetch(`${globals.api_domain}/api/session/getid`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 200) {
      var json = await response.json();
      // no need to check, session already exists
      if (json.accountid) {
        return true;
      } else return false;
    } else return false;
  };

  const verifyTokenFormat = () => {
    var token = params.token;
    return token.startsWith("0") && token.length === 10;
  };

  const userAuthenticateToken = () => {
    setOpen(true);
    authenticateToken();
  };
  const authenticateToken = async (userInitiated) => {
    setConfirmOpen(false);
    fetch(`${globals.api_domain}/api/session/auth`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: params.token }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          if (res.success) {
            setOpen(true);
            setAuthenticated("success");
            setValidToken(true);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            setOpen(false);
            setTimeout(() => {
              setAuthenticated("error");
              setOpen(true);
            }, 200);
          }
        });
      } else {
        setOpen(false);
        setTimeout(() => {
          setAuthenticated("error");
          setOpen(true);
        }, 200);
      }
    });
  };
  React.useEffect(() => {
    //first check if user is already authenticated
    authenticateAsync().then((res) => {
      // res= true: account already exists, ask to replace
      // res= false: account does not exist
      if (res) {
        if (verifyTokenFormat()) {
          //token is valid, ask to replace session
          setOpen(false);
          setConfirmOpen(true);
          return;
        } else {
          navigate("/");
        }
      } else {
        if (verifyTokenFormat()) {
          authenticateToken();
        } else {
          setAuthenticated("error");
        }
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="authentication-dialog-title"
        aria-describedby="authentication-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{renderText()}</DialogTitle>
        <DialogContent
          sx={{
            m: "auto",
          }}
        >
          {renderIcon()}
        </DialogContent>
        {authenticated === "error" ? (
          <DialogActions>
            <Button onClick={() => navigate("/")}>ok</Button>
          </DialogActions>
        ) : null}
      </Dialog>
      <Dialog
        open={confirmOpen}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="confirm-dialog-title">
          Replace your existing session?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Your current activity will be replaced. If you click yes, may still
            go back to your previous activity by entering your account ID.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => {
              navigate("/");
            }}
          >
            No
          </Button>
          <Button color="error" onClick={userAuthenticateToken}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
