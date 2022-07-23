import React, { Component } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Snackbars from "./Snackbars";
import globals from "../globals";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const AddTokenMenu = forwardRef((props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
  const [generatedURL, setGeneratedURL] = React.useState(null);
  const [failureSnackbarOpen, setFailureSnackbarOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  useImperativeHandle(ref, () => ({
    setMenuOpen: (event) => {
      setAnchorEl(event.currentTarget);
    },
    setMenuClose: () => {
      setAnchorEl(null);
      setSuccess(false);
      setLoading(false);
      setGeneratedURL(null);
      setName("");
    },
    getName: () => {
      return name;
    },
  }));

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      fetch(`${globals.api_domain}/api/tokens/create`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intendedfor: name,
        }),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setGeneratedURL(res.shareUrl);
            setSuccess(true);
            setSuccessSnackbarOpen(true);
            setLoading(false);
            props.refreshList();
          });
        } else {
          setLoading(false);
          setFailureSnackbarOpen(true);
        }
      });
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSuccess(false);
    setLoading(false);
    setGeneratedURL(null);
    setName("");
  };
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ mt: 1, ml: 2, mr: 2, mb: 1 }}>
        {success ? (
          <>
            <Typography variant="h6">Success!</Typography>
            <Typography variant="body1">
              Copy the link below and share it with one person
            </Typography>
            {generatedURL ? (
              <Box sx={{ display: "flex" }}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="Intended for..."
                  variant="standard"
                  value={generatedURL}
                  disabled
                />
                <Tooltip title="Copy">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(generatedURL);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <></>
            )}
          </>
        ) : (
          <React.Fragment>
            <Typography variant="h6">Create Invite Link</Typography>
            <Typography variant="body1">
              Generate a one-time share link to invite your friends!
            </Typography>
            <TextField
              id="standard-basic"
              fullWidth
              label="Intended for..."
              variant="standard"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "right", mt: 1 }}>
              <Box sx={{ position: "relative" }}>
                <Button
                  variant="contained"
                  sx={buttonSx}
                  disabled={loading}
                  onClick={handleButtonClick}
                >
                  Generate
                </Button>
                {loading && (
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
            </Box>
          </React.Fragment>
        )}
      </Box>
      <Snackbars
        open={successSnackbarOpen}
        severity="success"
        message="Share link successfully created"
        onClose={() => setSuccessSnackbarOpen(false)}
      />
      <Snackbars
        open={failureSnackbarOpen}
        severity="error"
        message="Something went wrong"
        onClose={() => setFailureSnackbarOpen(false)}
      />
    </Menu>
  );
});

export default AddTokenMenu;
