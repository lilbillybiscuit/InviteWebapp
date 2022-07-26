import React, { Component } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import globals from "../globals";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const GuestCounter = forwardRef((props, ref) => {
  const handleGuestAdd = () => {
    var newGuestCount = props.guestCount + 1;
    if (0 < newGuestCount && newGuestCount <= 5) {
      props.onClick(newGuestCount);
    }
  };
  const handleGuestSubtract = () => {
    var newGuestCount = props.guestCount - 1;
    if (0 < newGuestCount && newGuestCount <= 5) {
      props.onClick(newGuestCount);
    }
  };
  useImperativeHandle(ref, () => ({
    getCount: () => {
      return props.guestCount;
    },
  }));
  return (
    <Stack spacing={3} direction="row" alignItems="center">
      <IconButton onClick={handleGuestSubtract}>
        <RemoveIcon />
      </IconButton>
      <Typography variant="h6">{props.guestCount}</Typography>

      <IconButton onClick={handleGuestAdd}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
});
export default GuestCounter;
