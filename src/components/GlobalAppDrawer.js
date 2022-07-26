import React, { Component } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

class GlobalAppDrawer extends Component {
  state = {};

  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={this.props.toggleDrawer(false)}
      onKeyDown={this.props.toggleDrawer(false)}
    >
      <Typography variant="h5" sx={{ml: 2, mr: 2, mt: 2}}><strong>Bill's Grad Party</strong></Typography>
      <List>
        <ListItem key={"home"}>
          <ListItemButton href={"/"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader
            sx={{
              fontWeight: "bold",
            }}
            component="div"
            id="nested-pages-list-subheader"
          >
            Pages
          </ListSubheader>
        }
      >
        {this.props.pages.map((page) => (
          <ListItem key={page.name}>
            <ListItemButton href={page.url}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader
            sx={{
              fontWeight: "bold",
            }}
            component="div"
            id="nested-pages-list-subheader"
          >
            Global Options
          </ListSubheader>
        }
      >
        {this.props.globalStuff.map((page) => (
          <ListItem key={page.name}>
            <ListItemButton href={page.url}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {
        // <List
        //   subheader={
        //     <ListSubheader
        //       sx={{
        //         fontWeight: "bold",
        //       }}
        //       component="div"
        //       id="nested-settings-list-subheader"
        //     >
        //       Settings
        //     </ListSubheader>
        //   }
        // >
        //   {this.props.settings.map((setting) => (
        //     <ListItem key={setting.name}>
        //       <ListItemButton href={setting.url}>
        //         <ListItemIcon>{setting.icon}</ListItemIcon>
        //         <ListItemText primary={setting.name} />
        //       </ListItemButton>
        //     </ListItem>
        //   ))}
        // </List>
      }
    </Box>
  );

  render() {
    return (
      <SwipeableDrawer
        anchor="left"
        open={this.props.drawerOpen}
        onClose={this.props.toggleDrawer(false)}
        onOpen={this.props.toggleDrawer(true)}
      >
        {this.list()}
      </SwipeableDrawer>
    );
  }
}

export default GlobalAppDrawer;
