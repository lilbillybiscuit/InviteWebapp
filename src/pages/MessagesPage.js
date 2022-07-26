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
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import red from "@mui/material/colors/red";
import CardContent from "@mui/material/CardContent";
//Icons
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
class MessagesPage extends Component {
  state = {
    // wifi_ssid: "",
    // wifi_password: "",
    // copySuccessOpen: false,
    initialMessage: "",
  };
  componentDidMount() {
    if (this.state.wifi_ssid) return;
    fetch(`${globals.api_domain}/api/info/initialmessage`, {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          this.setState({
            initialMessage: res.message,
          });
        });
      }
    });
  }
  render() {
    return (
      <Container maxWidth="md" sx={{}}>
        <Typography variant="h4" sx={{ mt: 2, mb: 2 }} gutterBottom>
          <strong>Messages</strong>
        </Typography>
        {this.state.initialMessage ? (
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  JQ
                </Avatar>
              }
              title="Jiaxi Quan"
              subheader="July 24, 2022"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {this.state.initialMessage}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {"No messages (or access denied)"}
          </Typography>
        )}
      </Container>
    );
  }
}

export default MessagesPage;
