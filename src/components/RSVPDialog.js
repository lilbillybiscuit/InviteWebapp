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
//Icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import Color from "./Color";
//Self made components
import PlusOneDataGrid from "./PlusOneDataGrid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ArrivalTimeLineChart from "./ArrivalTimeLineChart";
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
function valueToTime(value) {
  return `${value} min`;
}
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
//const theme = useTheme();

class RSVPDialog extends Component {
  state = {
    pageSize: 10,
    arrivalData: {
      sliderValue: [0,360]
    }
  };

  fullScreen = false; //useMediaQuery(theme.breakpoints.down('md'));
  handleArrivalSliderChange = (event, newValue) => {
    this.setState({
      arrivalData: {
        sliderValue: newValue
      }
    });
  }

  setPageSize = (newPageSize) => {
    this.setState({ pageSize: newPageSize });
  };
  render() {
    return (
      <Dialog
        open={this.props.dialogOpen}
        onClose={this.props.handleClose}
        TransitionComponent={ZoomTransition}
        fullScreen={this.fullScreen}
      >
        <DialogTitle>RSVP</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>RSVP</FormLabel>
            <RadioGroup row name="rsvp-radio">
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
          <FormControl>
            <FormLabel>Contact Information</FormLabel>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
            >
              <TextField id="name" label="Name" variant="outlined" />
              <TextField id="email" label="Email" variant="outlined" />
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
              />
              <Typography>
                By checking the box above, you agree to the legal communications
                bs that you see on every other site
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
                mb: 2
              }}
            >
              <ParentSize>
                {({ width, height }) => (
                  <ArrivalTimeLineChart width={width} height={height} />
                )}
              </ParentSize>
            </Box>

            <Slider
        getAriaLabel={() => 'Time range'}
        value={this.state.arrivalData.sliderValue}
        onChange={this.handleArrivalSliderChange}
        valueLabelDisplay="auto"
        getAriaValueText={valueToTime}
        min={0}
        max={360}
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
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default RSVPDialog;
