import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from "moment";
export default function TimeValidationTimePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
          renderInput={(params) => <TextField {...params} sx={{width: "140px"}}/>}
          value={moment(props.value)}
          label={props.label}
          onChange={props.onChange}
          minTime={moment(props.minTime)}
          maxTime={moment(props.maxTime)}
        />
    </LocalizationProvider>
  );
}
