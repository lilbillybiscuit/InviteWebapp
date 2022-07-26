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
import useMediaQuery from "@mui/material/useMediaQuery";
import Slide from "@mui/material/Slide";
import validator from "validator";
//Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import Color from "./Color";
//Self made components
import PlusOneDataGrid from "./PlusOneDataGrid";
import { useTheme } from "@mui/material/styles";
import ArrivalTimeLineChart from "./ArrivalTimeLineChart";
import GuestsDataGrid from "./GuestsDataGrid";
import GuestCounter from "./GuestCounter";

const SlideTransition = React.forwardRef(function SlideTransition(props, ref) {
  return (
    <Slide
      ref={ref}
      {...props}
      easing="cubic-bezier(0.4, 0, 0, 1)"
      direction="up"
      timeout={500}
    />
  );
});

class RSVPDialog extends Component {
  state = {
    pageSize: 10,

    arrivalData: {
      currentStart: 0,
      currentEnd: moment(globals.PARTY_END).diff(
        globals.PARTY_START,
        "minutes"
      ),
    },
    partyData: {
      rsvp: null,
      allowEmails: false,
      waterfight: false,
      name: "",
      email: "",
      emailError: false,
      optionalComments: "",
      guestCount: 1,
    },
    successSnackbarOpen: false,
    errorSnackbarOpen: false,
    timeline: [],
  };

  constructor(props) {
    super(props);
    this.TimePickerRef = React.createRef();
    this.GuestCounterRef = React.createRef();
  }

  setPageSize = (newPageSize) => {
    this.setState({ pageSize: newPageSize });
  };

  fetchData = async (initial = false) => {
    fetch(`${globals.api_domain}/api/rsvp/get`, {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          res = res.data;
          if (initial) {
            this.state.arrivalData = {
              currentStart: res.arrivalStart,
              currentEnd: res.arrivalEnd,
            };
            this.state.partyData = {
              rsvp: res.rsvp,
              allowEmails: res.allowEmails ?? false,
              waterfight: res.waterfight ?? false,
              name: res.name ?? "",
              email: res.email ?? "",
              optionalComments: res.optionalComments ?? "",
              guestCount: res.guestCount ?? 1,
            };
          } else {
            this.setState({
              arrivalData: {
                currentStart: res.arrivalStart,
                currentEnd: res.arrivalEnd,
              },
              partyData: {
                rsvp: res.rsvp,
                allowEmails: res.allowEmails ?? false,
                waterfight: res.waterfight ?? false,
                name: res.name ?? "",
                email: res.email ?? "",
                optionalComments: res.optionalComments ?? "",
                guestCount: res.guestCount ?? 1,
              },
            });
            this.props.setRSVP(res.rsvp);
          }
        });
      }
    });
  };
  fetchTimeline = async () => {
    fetch(`${globals.api_domain}/api/guests/get/timeline`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          var temp = [];
          data = data.timeline;
          for (let i = 0; i < data.length; i++) {
            temp.push({
              minutes: i,
              attendance: data[i],
            });
          }
          this.setState({ timeline: temp });
        });
      }
    });
  };
  componentDidMount() {
    this.fetchData();
    this.fetchTimeline();
  }
  handleSubmit = () => {
    //First validate all inputs
    let valid = true;
    var validateobj = {};
    if (!validator.isEmail(this.state.partyData.email)) {
      validateobj.emailError = true;
      valid = false;
    } else {
      validateobj.emailError = false;
    }
    if (
      validator.isEmpty(this.state.partyData.name) ||
      !/^[A-Za-z\s]+$/.test(this.state.partyData.name)
    ) {
      validateobj.nameError = true;
      valid = false;
    } else {
      validateobj.nameError = false;
    }
    this.setState({
      partyData: {
        ...this.state.partyData,
        ...validateobj,
      },
    });
    if (!valid) {
      return;
    }

    //Now actually submit everything
    var currentArrivalTime;
    if (this.TimePickerRef.current) {
      var currentArrivalTime1 = this.TimePickerRef.current.getCurrent();
      currentArrivalTime = [0, 0];
      currentArrivalTime[0] = moment(currentArrivalTime1[0]).diff(
        globals.PARTY_START,
        "minutes"
      );
      currentArrivalTime[1] = moment(currentArrivalTime1[1]).diff(
        globals.PARTY_START,
        "minutes"
      );
    } else {
      currentArrivalTime = [
        0,
        moment(globals.PARTY_END).diff(globals.PARTY_START, "minutes"),
      ];
    }
    this.setState({
      arrivalData: {
        currentStart: currentArrivalTime[0],
        currentEnd: currentArrivalTime[1],
      },
    });
    fetch(`${globals.api_domain}/api/rsvp/create`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rsvp: this.state.partyData.rsvp || this.props.rsvp,
        allowEmails: this.state.partyData.allowEmails,
        name: this.state.partyData.name,
        waterfight: this.state.partyData.waterfight,
        email: this.state.partyData.email,
        optionalComments: this.state.partyData.optionalComments,
        arrivalStart: currentArrivalTime[0],
        arrivalEnd: currentArrivalTime[1],
        guestCount: this.GuestCounterRef.current.getCount(),
      }),
    }).then((res) => {
      if (res.status === 200) {
        this.setState({ successSnackbarOpen: true });
        this.props.setRSVP(this.state.partyData.rsvp);
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
          TransitionComponent={SlideTransition}
          fullScreen={this.props.fullScreen}
          keepMounted
        >
          <Snackbars
            open={this.state.errorSnackbarOpen}
            message="Something went wrong"
            onClose={() => this.setState({ errorSnackbarOpen: false })}
            severity="error"
          />
          <DialogTitle>
            <Typography variant="h5">
              <strong>RSVP</strong>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <FormControl>
              <FormLabel>Will you come?</FormLabel>
              <RadioGroup
                row
                name="rsvp-radio"
                value={this.state.partyData.rsvp ?? this.props.rsvp}
                onChange={(event) => {
                  this.setState({
                    partyData: {
                      ...this.state.partyData,
                      rsvp: event.target.value,
                    },
                  });
                }}
                //defaultValue={this.state.partyData.rsvp}
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
                  helperText={
                    this.state.partyData.nameError ? "Invalid name" : ""
                  }
                  error={this.state.partyData.nameError ?? false}
                  sx={{
                    width: "calc(50% - 8px)",
                  }}
                />
                <TextField
                  error={this.state.partyData.emailError}
                  helperText={
                    this.state.partyData.emailError ? "Invalid email" : ""
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
              <FormLabel sx={{mt: 1}}>Number of Guests</FormLabel>
              <GuestCounter ref={this.GuestCounterRef} guestCount={this.state.partyData.guestCount ?? 1} onClick={(hi) => {
                this.setState({
                  partyData: {
                    ...this.state.partyData,
                    guestCount: hi,
                  },
                });
              }}/>
              </FormGroup>
              <FormGroup>
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
                <FormControlLabel
                  control={<Checkbox />}
                  label="Participate in water fight"
                  checked={this.state.partyData.waterfight}
                  onChange={(event) => {
                    this.setState({
                      partyData: {
                        ...this.state.partyData,
                        waterfight: event.target.checked,
                      },
                    });
                  }}
                />
                <Typography>
                  If you want to participate in a backyard water fight, check
                  the box above!
                </Typography>
              </FormGroup>
            </FormControl>
            {this.state.partyData.rsvp === "no" ? null : (
              <>
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
                    Doesn't have to be accurate, but please approximate your
                    arrival time for balancing purposes. Thanks!
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
                        <ArrivalTimeLineChart
                          width={width}
                          height={height}
                          times={this.state.timeline}
                        />
                      )}
                    </ParentSize>
                  </Box>
                  <TimeRangePicker
                    currentStart={this.state.arrivalData.currentStart ?? 0}
                    currentEnd={
                      this.state.arrivalData.currentEnd ??
                      moment(globals.PARTY_END).diff(
                        globals.PARTY_START,
                        "minutes"
                      )
                    }
                    ref={this.TimePickerRef}
                  />
                </FormControl>
                <Divider sx={{ marginTop: "20px" }} />
                <GuestsDataGrid />
              </>
            )}
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
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return <RSVPDialog {...rest} fullScreen={fullScreen} />;
}
