import React, { Component } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Alert, AlertTitle} from "@mui/material";
import MusicCard from "../components/music/MusicCard";
class MusicControl extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Container maxWidth="md">
          
          <Alert severity="warning" sx={{
            marginTop: "20px"
          }}>
            <AlertTitle>Warning</AlertTitle>
            Music Control will be available soon
          </Alert>
          <Typography variant="h4" sx={{
            marginTop: "20px",
            marginBottom: "20px"
          }}>
            Music Control
          </Typography>
          <MusicCard/>
        </Container>
      </React.Fragment>
    );
  }
}

export default MusicControl;
