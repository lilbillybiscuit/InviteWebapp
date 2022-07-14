import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Zoom from "@mui/material/Zoom";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Snackbars from "./Snackbars";
import globals from "../globals";
import TimeRangePicker from "./TimeRangePicker";
import moment from "moment";
import useMediaQuery from '@mui/material/useMediaQuery';
//Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import Color from "./Color";
//Self made components
import PlusOneDataGrid from "./PlusOneDataGrid";
import { useTheme } from "@mui/material/styles";
import ArrivalTimeLineChart from "./ArrivalTimeLineChart";

const PARTY_START = moment(new Date("2022-07-31 16:00"));
const PARTY_END = moment(new Date("2022-07-31 22:00"));
const datacolumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
];

const testdata = [
  { id: 1, name: "John Doe" },
  { id: 1, name: "John Doe" },
  { id: 1, name: "John Doe" },
  { id: 1, name: "John Doe" },
  { id: 1, name: "John Doe" },
  { id: 1, name: "John Doe" },
  { id: 1, name: "John Doe" },
];
const ZoomTransition = React.forwardRef(function ZoomTransition(props, ref) {
  return (
    <Zoom
      ref={ref}
      {...props}
      easing="cubic-bezier(0.4, 0, 0.2, 1)"
      timeout={500}
    />
  );
});

class RSVPDialog extends Component {
  state = {
    pageSize: 10,

    arrivalData: {
      currentStart: PARTY_START,
      currentEnd: PARTY_END,
    },
    partyData: {
      rsvp: null,
      allowEmails: false,
      name: "",
      email: "",
      emailError: false,
      optionalComments: "",
    },
    successSnackbarOpen: false,
    errorSnackbarOpen: false,
  };

  constructor(props) {
    super(props);
    this.TimePickerRef = React.createRef();
  }

  setPageSize = (newPageSize) => {
    this.setState({ pageSize: newPageSize });
  };

  handleSubmit = () => {
    var hi=this.TimePickerRef.current.getCurrent();
    fetch(`${globals.api_domain}/api/success`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.status === 200) {
        this.setState({ successSnackbarOpen: true });
        this.props.handleClose();
      } else {
        this.setState({ errorSnackbarOpen: true });
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <Snackbars
          open={this.state.successSnackbarOpen}
          message="RSVP Successful"
          onClose={() => this.setState({ successSnackbarOpen: false })}
          severity="success"
        />
        <Dialog
          open={this.props.dialogOpen}
          onClose={this.props.handleClose}
          TransitionComponent={ZoomTransition}
          fullScreen={this.props.fullScreen}
        >
          <Snackbars
            open={this.state.errorSnackbarOpen}
            message="Something went wrong"
            onClose={() => this.setState({ errorSnackbarOpen: false })}
            severity="error"
          />
          <DialogTitle>RSVP</DialogTitle>
          <DialogContent>
            <FormControl>
              <FormLabel>RSVP</FormLabel>
              <RadioGroup
                row
                name="rsvp-radio"
                onChange={(event) => {
                  this.setState({
                    partyData: {
                      ...this.state.partyData,
                      rsvp: event.target.value,
                    },
                  });
                }}
              >
                <FormControlLabel
                  value="yes"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: Color.yesColor,
                        },
                      }}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  value="maybe"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: Color.maybeColor,
                        },
                      }}
                    />
                  }
                  label="Maybe"
                />
                <FormControlLabel
                  value="no"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: Color.noColor,
                        },
                      }}
                    />
                  }
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <Divider sx={{ mt: 2 }} />
            <FormControl
              sx={{
                mt: 1,
              }}
            >
              <FormLabel>Contact Information</FormLabel>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mt: 1,
                }}
              >
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  value={this.state.partyData.name}
                  onChange={(event) => {
                    this.setState({
                      partyData: {
                        ...this.state.partyData,
                        name: event.target.value,
                      },
                    });
                  }}
                  sx={{
                    width: "calc(50% - 8px)",
                  }}
                />
                <TextField
                  error={this.state.partyData.emailError}
                  helperText={
                    this.state.partyData.emailError ? "Invalid email" : "e"
                  }
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={this.state.partyData.email}
                  onChange={(event) => {
                    this.setState({
                      partyData: {
                        ...this.state.partyData,
                        email: event.target.value,
                      },
                    });
                  }}
                  sx={{
                    width: "calc(50% - 8px)",
                    ml: "16px",
                  }}
                />
              </Box>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  disabled
                  label="Use phone number instead of email"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Recieve event notifications"
                  checked={this.state.partyData.allowEmails}
                  onChange={(event) => {
                    this.setState({
                      partyData: {
                        ...this.state.partyData,
                        allowEmails: event.target.checked,
                      },
                    });
                  }}
                />
                <Typography>
                  By checking the box above, you agree to the legal
                  communications bs that you see on every other site
                </Typography>
              </FormGroup>
            </FormControl>
            <Divider sx={{ margin: "1rem 0" }} />
            <Typography
              variant="h6"
              component="h6"
              sx={{
                marginTop: "10px",
              }}
            >
              Arrival Time
            </Typography>
            <FormControl sx={{ marginTop: "0px", width: "100%" }}>
              <FormLabel>
                Doesn't have to be accurate, but please approximate your arrival
                time for balancing purposes. Thanks!
              </FormLabel>
              <Box
                sx={{
                  height: "200px",
                  mt: 2,
                  mb: 2,
                }}
              >
                <ParentSize>
                  {({ width, height }) => (
                    <ArrivalTimeLineChart width={width} height={height} />
                  )}
                </ParentSize>
              </Box>
              <TimeRangePicker
                PARTY_START={PARTY_START}
                PARTY_END={PARTY_END}
                ref={this.TimePickerRef}
              />
            </FormControl>
            <Divider sx={{ marginTop: "20px" }} />
            <Typography
              variant="h6"
              component="h6"
              sx={{
                marginTop: "10px",
              }}
            >
              +1's
            </Typography>
            <FormControl sx={{ marginTop: "0px", width: "100%" }}>
              <FormLabel>
                +1's are welcome, but please add them so I can plan accordingly.
                Thanks!
              </FormLabel>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ marginTop: "10px" }}
              >
                Add a "Plus One"
              </Button>
              <Box sx={{ marginTop: "20px", width: "100%" }}>
                {/* <DataGrid
                onPageSizeChange={(newPageSize) => this.setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                autoHeight
                pageSize={this.state.pageSize}
                columns={datacolumns}
                rows={testdata}
                checkboxSelection
              /> */}
                <PlusOneDataGrid />
              </Box>
            </FormControl>
            <Divider sx={{ marginTop: "20px" }} />
            <Typography
              variant="h6"
              component="h6"
              sx={{
                marginTop: "10px",
              }}
            >
              Optional Information
            </Typography>
            <FormControl sx={{ marginTop: "10px", width: "100%" }}>
              <TextField
                multiline
                minRows={4}
                maxRows={8}
                label="Public Comments"
                value={this.state.partyData.optionalComments}
                onChange={(event) => {
                  this.setState({
                    partyData: {
                      ...this.state.partyData,
                      optionalComments: event.target.value,
                    },
                  });
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default function RSVPDialogExport({ ...rest }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return <RSVPDialog {...rest} fullScreen={fullScreen} />;
}
