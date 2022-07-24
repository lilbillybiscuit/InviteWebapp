import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import {grey} from "@mui/material/colors";

//Icons
import SchoolIcon from "@mui/icons-material/School";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WifiIcon from '@mui/icons-material/Wifi';

import GlobalAppDrawer from "./GlobalAppDrawer";
import GlobalUserSettingsMenu from "./GlobalUserSettingsMenu";
import globals from "../globals";
const toolbarColor = "#FFFFFF";

const pages = [
//  { name: "Activity", url: "/activity", icon: <NotificationsIcon /> },
  { name: "Messages", url: "/messages", icon: <MailIcon /> },
  { name: "Guests", url: "/guests", icon: <PeopleIcon /> },
];
const globalStuff = [
  { name: "Music Control", url: "/music", icon: <MusicNoteIcon /> },
  { name: "Guest Wifi", url: "/wifi", icon: <WifiIcon /> },
];
const settings = [
  { name: "Profile", url: "/profile", icon: <AccountCircleIcon /> },
  { name: "Logout", url: "/logout", icon: <LogoutIcon /> },
];

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
class ResponsiveAppBar extends Component {
  state = {
    anchorElNav: null,
    anchorElDropdown: null,
    drawerOpen: false,
    menuOpen: false,
    dropdownOpen: false,
    name: "",
  };

  toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    var newstate;
    if (open) {
      newstate = { drawerOpen: open, dropdownOpen: false };
    } else {
      newstate = { drawerOpen: open };
    }
    this.setState(newstate);
  };

  handleDropdownOpen = (event) => {
    this.setState({ anchorElDropdown: event.currentTarget, dropdownOpen: true });
  }
  handleDropdownClose = () => {
    this.setState({ anchorElDropdown: null, dropdownOpen: false });
  }

  handleMenuOpen = (event) => {
    this.setState({ anchorElNav: event.currentTarget });
  };

  componentDidMount = () => {
    fetch(`${globals.api_domain}/api/session/getname`, {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          if (res.name) {
            this.setState({ name: res.name });
          } else if (res.username) {
            this.setState({ name: res.username });
          } else {
            this.setState({ name: "Guest" });
          }
        });
      } else {
        this.setState({ name: "Guest" });
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <HideOnScroll>
          <AppBar
            color="transparent"
            sx={{
              backgroundColor: "rgba(37, 37, 37, 0.8)",
              backdropFilter: "blur(5px)",
            }}
          >
            <Container maxWidth="xl">
              <Toolbar disableGutters sx={{ height: "70px" }}>
                <GlobalAppDrawer
                  drawerOpen={this.state.drawerOpen}
                  toggleDrawer={this.toggleDrawer}
                  pages={pages}
                  settings={settings}
                  globalStuff={globalStuff}
                />
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.toggleDrawer(true)}
                  sx={{
                    mr: 1,
                    display: { xs: "none", md: "flex" },
                    color: toolbarColor,
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <SchoolIcon
                  sx={{
                    display: { xs: "none", md: "flex" },
                    mr: 1,
                    color: toolbarColor,
                  }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: toolbarColor,
                    textDecoration: "none",
                  }}
                >
                  2022
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.toggleDrawer(true)}
                    sx={{
                      color: toolbarColor,
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                <SchoolIcon
                  sx={{
                    display: { xs: "flex", md: "none" },
                    mr: 1,
                    color: toolbarColor,
                  }}
                />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: toolbarColor,
                    textDecoration: "none",
                  }}
                >
                  2022
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((obj) => (
                    <Button
                      key={obj.name}
                      href={obj.url}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <strong>{obj.name}</strong>
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <Button
                      onClick={this.handleDropdownOpen}
                      sx={{
                        color: "white",
                      }}
                    >
                      {this.state.name || "Guest"}
                    </Button>
                  </Tooltip>
                </Box>
              </Toolbar>
              <GlobalUserSettingsMenu
                handleMenuOpen={this.toggleDrawer(true)}
                open={this.state.dropdownOpen}
                anchorEl={this.state.anchorElDropdown}
                onClose={this.handleDropdownClose}
              />
            </Container>
          </AppBar>
        </HideOnScroll>
        <Box sx={{ height: "70px" }} />{" "}
        {/*I swear this is not intentional AppBar is just designed weirdly */}
      </React.Fragment>
    );
  }
}

export default ResponsiveAppBar;
