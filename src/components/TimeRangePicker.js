import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import moment from "moment";
import TimePicker2 from "./TimePicker";
import { forwardRef, useImperativeHandle, useRef } from "react";
import globals from "../globals";
const PARTY_DURATION = moment(globals.PARTY_END).diff(
  globals.PARTY_START,
  "minutes"
);
const TimeRangePicker = forwardRef((props, ref) => {
  const [current, setCurrent] = React.useState([
    moment(globals.PARTY_START).add(props.currentStart, "m"),
    moment(globals.PARTY_START).add(props.currentEnd, "m"),
  ]);
  const handleArrivalSliderChange = (event, newValue) => {
    setCurrent([
      moment(globals.PARTY_START).add(newValue[0], "m"),
      moment(globals.PARTY_START).add(newValue[1], "m"),
    ]);
  };
  useImperativeHandle(ref, () => ({
    getCurrent: () => {
      return current;
    },
    setCurrent(newCurrent) {
      setCurrent(newCurrent);
    },
  }));
  React.useEffect(() => {
    setCurrent([
      moment(globals.PARTY_START).add(props.currentStart, "m"),
      moment(globals.PARTY_START).add(props.currentEnd, "m"),
    ]);
  }, [props]);
  return (
    <React.Fragment>
      <Slider
        value={[
          moment(current[0]).diff(globals.PARTY_START, "minutes"),
          moment(current[1]).diff(globals.PARTY_START, "minutes"),
        ]}
        onChange={handleArrivalSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => {
          return moment(globals.PARTY_START).add(value, "m").format("h:mm a");
        }}
        min={0}
        max={PARTY_DURATION}
      />
      <Box
        sx={{
          display: "flex",
          mt: 1,
          justifyContent: "space-between",
        }}
      >
        <TimePicker2
          label="Start"
          value={current[0]}
          onChange={(date) => {
            setCurrent([moment(date), current[1]]);
          }}
          minTime={globals.PARTY_START}
          maxTime={Math.min(globals.PARTY_END, current[1])}
        />
        <TimePicker2
          label="End"
          value={current[1]}
          onChange={(date) => {
            setCurrent([current[0], moment(date)]);
          }}
          minTime={Math.max(globals.PARTY_START, current[0])}
          maxTime={globals.PARTY_END}
        />
      </Box>
    </React.Fragment>
  );
});

export default TimeRangePicker;
