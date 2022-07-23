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

  render() {
    return (
      <React.Fragment>
        <img src="/gradImage.png" style={{ width: "100%" }} />
        <Container maxWidth="md">
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
              invite link, or enter your email to recover your session.
            </Alert>
          ) : null}
          {this.state.access === "none" ? null : (
            <>
              <Paper elevation={3} sx={{ mt: 3, padding: 2 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Details
                </Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ mt: 3, display: "flex", padding: "20px" }}
              >
                <Typography variant="h5">Will you attend?</Typography>
                <ButtonGroup variant="text" size="large">
                  <Button onClick={this.handleDialogOpenYes}>Yes</Button>
                  <Button onClick={this.handleDialogOpenMaybe}>Maybe</Button>
                  <Button onClick={this.handleDialogOpenNo}>No</Button>
                </ButtonGroup>
              </Paper>
            </>
          )}
          <RSVPDialog
            dialogOpen={this.state.dialogOpen}
            handleClose={this.handleDialogClose}
            rsvp={this.state.rsvp}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default HomePage;
