import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import RSVPDialog from "../components/RSVPDialog";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import globals from "../globals";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import HouseIcon from "@mui/icons-material/House";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import Color from "../components/Color";
import Footer from "../components/Footer";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import PeopleIcon from "@mui/icons-material/People";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function getWindowAspectRatio() {
  const { width, height } = getWindowDimensions();
  return width / height;
}
class HomePage extends Component {
  state = {
    dialogOpen: false,
    rsvp: null,
    access: null,
    rsvped: false,
    partyInfo: null,
    title: "",
  };

  componentDidMount() {
    fetch(`${globals.api_domain}/api/session/getid`, {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          if ("fullAccess" in res) {
            if (res.fullAccess) {
              this.setState({ access: "full" });
            } else {
              this.setState({ access: "limited" });
            }
          } else {
            this.setState({ access: "none" });
          }
        });
      } else {
        this.setState({
          access: "none",
        });
      }
    });
    fetch(`${globals.api_domain}/api/info/get`, {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          this.setState({
            title: res.title,
            partyInfo: res.data,
            guestArrivingYes: res.guestInfo.yes,
            guestArrivingNo: res.guestInfo.no,
            guestArrivingMaybe: res.guestInfo.maybe,
          });
        });
      } else {
        res.json().then((res) => {
          this.setState({
            title: res.title,
          });
        });
      }
    });
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogOpenYes = () => {
    this.setState({
      dialogOpen: true,
      rsvp: "yes",
    });
  };
  handleDialogOpenMaybe = () => {
    this.setState({
      dialogOpen: true,
      rsvp: "maybe",
    });
  };

  handleDialogOpenNo = () => {
    this.setState({
      dialogOpen: true,
      rsvp: "no",
    });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  getRSVPText = (rsvpedstate) => {
    if (!rsvpedstate) {
      const theme = this.props.theme;
      return (
        <Stack
          spacing={this.props.fullScreenSm ? 2 : 5}
          justifyContent="center"
          direction={this.props.fullScreenSm ? "column" : "row"}
          sx={{ width: "100%" }}
        >
          <Button
            variant="outlined"
            onClick={this.handleDialogOpenYes}
            color="success"
            size="large"
            sx={{
              minWidth: "100px",
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={this.handleDialogOpenMaybe}
            color="warning"
            size="large"
            sx={{
              minWidth: "100px",
            }}
          
          >
            Maybe
          </Button>
          <Button
            variant="outlined"
            onClick={this.handleDialogOpenNo}
            color="error"
            size="large"
            sx={{
              minWidth: "100px",
            }}
          >
            No
          </Button>
        </Stack>
      );
    } else if (rsvpedstate === "yes") {
      return (
        <Box
          sx={{ display: "flex", alignItems: "center", color: Color.yesColor }}
        >
          <Avatar sx={{ bgcolor: Color.yesColor }}>
            <CheckIcon />
          </Avatar>
          <Typography variant="h6" sx={{ ml: 2 }}>
            You have RSVP'ed Yes
          </Typography>
          <Button onClick={this.handleDialogOpenYes} sx={{ ml: 2 }}>
            Change RSVP
          </Button>
        </Box>
      );
    } else if (rsvpedstate === "maybe") {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: Color.maybeColor,
          }}
        >
          <Avatar sx={{ bgcolor: Color.maybeColor }}>
            <RemoveIcon />
          </Avatar>
          <Typography variant="h6" sx={{ ml: 2 }}>
            You have RSVP'ed Maybe
          </Typography>
          <Button onClick={this.handleDialogOpenYes} sx={{ ml: 2 }}>
            Change RSVP
          </Button>
        </Box>
      );
    } else if (rsvpedstate === "no") {
      return (
        <Box
          sx={{ display: "flex", alignItems: "center", color: Color.noColor }}
        >
          <Avatar sx={{ bgcolor: Color.noColor }}>
            <RemoveIcon />
          </Avatar>
          <Typography variant="h6" sx={{ ml: 2 }}>
            You have RSVP'ed No
          </Typography>
          <Button onClick={this.handleDialogOpenYes} sx={{ ml: 2 }}>
            Change RSVP
          </Button>
        </Box>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <img src="/gradImage.jpg" style={{ width: "100%" }} />
        <Container maxWidth="md">
          <Typography variant="h3" align="center" gutterBottom sx={{ m: 2 }}>
            {this.state.title}
          </Typography>
          {this.state.access === "limited" ? (
            <Alert severity="warning" sx={{ mt: 3 }}>
              <AlertTitle>Limited Access</AlertTitle>
              You have limited access as your invite link has been used more
              than once. You can still RSVP, but you may not interact with the
              music or gallery pages.
            </Alert>
          ) : null}
          {this.state.access === "none" ? (
            <Alert severity="warning" sx={{ mt: 3 }}>
              <AlertTitle>No Access</AlertTitle>
              Key functions such as RSVPing are disabled. Please use a valid
              invite link, or enter an account ID to recover your session.
            </Alert>
          ) : null}
          {this.state.access === "none" ? null : (
            <>
              <Typography variant="h4">
                <strong>Details</strong>
              </Typography>
              {this.state.partyInfo ? (
                <Grid
                  container
                  spacing={2}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{ mt: 1 }}
                >
                  <Grid item xs={4}>
                    <Card sx={{ minHeight: "130px" }}>
                      <Box sx={{ m: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <HouseIcon />
                          <Typography variant="h5" sx={{ ml: 0.5 }}>
                            <strong>Where</strong>
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}></Box>
                        <Typography variant="body" sx={{ mt: 1 }}>
                          {this.state.partyInfo.address}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ minHeight: "130px" }}>
                      <Box sx={{ m: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ScheduleIcon />
                          <Typography variant="h5" sx={{ ml: 0.5 }}>
                            <strong>When</strong>
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}></Box>
                        <Typography variant="body" sx={{ mt: 1 }}>
                          {this.state.partyInfo.timeString}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ minHeight: "130px" }}>
                      <Box sx={{ m: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ContactPhoneIcon />
                          <Typography variant="h5" sx={{ ml: 0.5 }}>
                            <strong>Contact</strong>
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                          {this.state.partyInfo.phone}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ minHeight: "130px" }}>
                      <Box sx={{ m: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PersonIcon />
                          <Typography variant="h5" sx={{ ml: 0.5 }}>
                            <strong>Hosted by</strong>
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                          {this.state.partyInfo.host}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ minHeight: "130px" }}>
                      <Box sx={{ m: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PeopleIcon />
                          <Typography variant="h5" sx={{ ml: 0.5 }}>
                            <strong>Guests</strong>
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Box>
                              <Typography variant="subtitle2">Yes</Typography>
                              <Typography
                                variant="h5"
                                sx={{ mt: -0.5, color: Color.yesColor }}
                              >
                                {this.state.guestArrivingYes ?? "--"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box>
                              <Typography variant="subtitle2">Maybe</Typography>
                              <Typography
                                variant="h5"
                                sx={{ mt: -0.5, color: Color.maybeColor }}
                              >
                                {this.state.guestArrivingMaybe ?? "--"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box>
                              <Typography variant="subtitle2">No</Typography>
                              <Typography
                                variant="h5"
                                sx={{ mt: -0.5, color: Color.noColor }}
                              >
                                {this.state.guestArrivingNo ?? "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )}
              <Typography variant="h4" sx={{ mt: 2 }}>
                <strong>Will you attend?</strong>
              </Typography>
              <Paper
                elevation={3}
                sx={{ mt: 1, display: "flex", padding: "20px" }}
              >
                {this.getRSVPText(this.state.rsvpedstate)}
              </Paper>
              <Typography variant="h4" sx={{ mt: 2 }}>
                <strong>Message from host</strong>
              </Typography>
              <Paper elevation={3} sx={{ mt: 1, padding: "20px" }}>
                <Typography variant="body">
                  {this.state.partyInfo
                    ? this.state.partyInfo.initialMessage
                    : "No message"}
                </Typography>
              </Paper>
            </>
          )}

          <RSVPDialog
            dialogOpen={this.state.dialogOpen}
            handleClose={this.handleDialogClose}
            rsvp={this.state.rsvp}
            setStartRSVP={() => {
              this.setState({ rsvped: true });
            }}
            setRSVP={(rsvp) => {
              this.setState({ rsvpedstate: rsvp, rsvped: true });
            }}
          />
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default function HomePage2({ ...rest }) {
  var theme = useTheme();
  // theme=createTheme(theme, {
  //   palette: {
  //     yesButton: Color.yesColor,
  //     maybeButton: Color.maybeColor,
  //     noButton: Color.noColor,
  //   },
  // })
  const fullScreenSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ThemeProvider theme={theme}>
      <HomePage {...rest} fullScreenSm={fullScreenSm} />
    </ThemeProvider>
  );
}
