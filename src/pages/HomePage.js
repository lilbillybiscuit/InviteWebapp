import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import RSVPDialog from "../components/RSVPDialog";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";

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
        <Button onClick={this.handleDialogOpen}>Hi</Button>
        <RSVPDialog
          dialogOpen={this.state.dialogOpen}
          handleClose={this.handleDialogClose}
        />
      </React.Fragment>
    );
  }
}

export default HomePage;
