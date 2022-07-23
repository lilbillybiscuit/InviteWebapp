import React, { Component } from "react";
import globals from "../globals";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Card from "@mui/material/Card";
import Snackbars from "../components/Snackbars";

//Icons
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
class GuestWifiPage extends Component {
  state = {
    wifi_ssid: "",
    wifi_password: "",
    copySuccessOpen: false,
  };
  componentDidMount() {
    if (this.state.wifi_ssid) return;
    fetch(`${globals.api_domain}/api/wifi/get`, {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          console.log(res);
          this.setState({
            wifi_ssid: res.wifi.ssid,
            wifi_password: res.wifi.password,
          }); 
        });
      }
    });
  }
  render() {
    return (
      <Container maxWidth="md" sx={{}}>
        <Typography variant="h4" sx={{ mt: 2, mb: 2 }} gutterBottom>
          <strong>Guest Wifi</strong>
        </Typography>
        <Card elevation={3} sx={{ width: "100%" }}>
          {this.state.wifi_password === "--" ? (
            <Alert
              severity="warning"
              sx={{
                m: 2,
              }}
            >
              <AlertTitle>Wifi Access Denied</AlertTitle>
              Use a valid URL to access guest wifi
            </Alert>
          ) : (
            <Alert
              severity="success"
              sx={{
                m: 2,
              }}
            >
              <AlertTitle>Wifi Access Granted</AlertTitle>
              Wifi details are listed below:
            </Alert>
          )}
          <Box m={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WifiPasswordIcon sx={{ m: 1 }} />

              <Typography variant="body" sx={{ml: 1}}>
                <strong>{"Name (SSID): "}</strong>
              </Typography>
              <Typography variant="body" sx={{ ml: 1 }}>
                {this.state.wifi_ssid}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <KeyIcon sx={{ m: 1 }} />

              <Typography variant="body" sx={{ml: 1}}>
                <strong>{"Password: "}</strong>
              </Typography>
              <Typography variant="body" sx={{ ml: 1 }}>
                {this.state.wifi_password}
              </Typography>
              <IconButton
                aria-label="Copy password"
                onClick={() => {
                  navigator.clipboard.writeText(this.state.wifi_password);
                  this.setState({ copySuccessOpen: true });
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <Snackbars
              open={this.state.copySuccessOpen}
              message="Copied to clipboard!"
              severity="success"
              handleClose={() => {
                this.setState({ copySuccessOpen: false });
              }}
            />
          </Box>
        </Card>
      </Container>
    );
  }
}

export default GuestWifiPage;
