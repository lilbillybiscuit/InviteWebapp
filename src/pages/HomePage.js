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
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <img src="/gradImage.jpg" style={{ width: "100%" }} />
        <Container maxWidth="md">
          <Alert severity="warning" sx={{mt: 3}}>
            <AlertTitle>Warning</AlertTitle>
            You have limited access as your invite link has been used more than once. You can still RSVP, but you may not interact with the music or gallery pages.
          </Alert>
          <Alert severity="warning" sx={{mt: 3}}>
            <AlertTitle>Warning</AlertTitle>
            Key functions such as RSVPing are disabled. Please use a valid invite link, or enter your email to recover your session.
            </Alert>
          <Paper elevation={3} sx={{ mt: 3, display: "flex", padding: "20px" }}>
            <Typography variant="h5">Will you attend?</Typography>
            <ButtonGroup variant="text" size="large">
              <Button>Yes</Button>
              <Button>Maybe</Button>
              <Button>No</Button>
            </ButtonGroup>
          </Paper>
          <Button onClick={this.handleDialogOpen}>Hi</Button>
          <RSVPDialog
            dialogOpen={this.state.dialogOpen}
            handleClose={this.handleDialogClose}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default HomePage;
