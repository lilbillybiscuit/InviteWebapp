import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import moment from "moment";
import TimePicker from "./TimePicker";
import { forwardRef, useImperativeHandle, useRef } from "react";

const TimeRangePicker = forwardRef((props, ref) => {
  const PARTY_START = moment(props.PARTY_START);
  const PARTY_END = moment(props.PARTY_END);
  const [current, setCurrent] = React.useState([PARTY_START, PARTY_END]);

  const handleArrivalSliderChange = (event, newValue) => {
    setCurrent([
      moment(PARTY_START).add(newValue[0], "m"),
      moment(PARTY_START).add(newValue[1], "m"),
    ]);
  };

  useImperativeHandle(ref, () => ({
    getCurrent: () => current,
  }));

  return (
    <React.Fragment>
      <Slider
        value={[
          current[0].diff(PARTY_START, "minutes"),
          current[1].diff(PARTY_START, "minutes"),
        ]}
        onChange={handleArrivalSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => {
          return moment(PARTY_START).add(value, "m").format("h:mm a");
        }}
        min={0}
        max={360}
      />
      <Box
        sx={{
          display: "flex",
          mt: 1,
          justifyContent: "space-between",
        }}
      >
        <TimePicker
          label="Start"
          value={current[0]}
          onChange={(date) => {
            setCurrent([moment(date), current[1]]);
          }}
          minTime={PARTY_START}
          maxTime={Math.min(PARTY_END, current[1])}
        />
        <TimePicker
          label="End"
          value={current[1]}
          onChange={(date) => {
            setCurrent([current[0], moment(date)]);
          }}
          minTime={Math.max(PARTY_START, current[0])}
          maxTime={PARTY_END}
        />
      </Box>
    </React.Fragment>
  );
});

export default TimeRangePicker;