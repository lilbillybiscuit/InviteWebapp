import React, { Component } from "react";
import { Menu, MenuItem } from "@mui/material";
import { ListItemIcon, ListItemText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbars from "./Snackbars";
import ChangeAccountIDDialog from "./ChangeAccountIDDialog";
import globals from "../globals";
class GlobalUserSettingsMenu extends Component {
  state = {
    checkboxA: {
      checked: false,
      disabled: true,
      updating: false,
    },
    checkboxB: {
      checked: false,
      disabled: true,
      updating: false,
    },
    checkboxC: {
      checked: false,
      disabled: true,
      updating: false,
    },
    snackbars: {
      errorOpen: false,
      successOpen: false,
    },
    changeAccountIDDialogOpen: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open && this.props.open) {
      fetch(`${globals.api_domain}/api/usersettings`, {
        credentials: "include",
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            this.setState({
              checkboxA: {
                checked: res.settings.notifyActivityInvolvingMe,
                disabled: false,
              },
              checkboxB: {
                checked: res.settings.notifyEventActivity,
                disabled: false,
              },
              checkboxC: {
                checked: res.settings.notifyRSVPActivity,
                disabled: false,
              },
            });
          });
        }
      });
      // this.setState({
      //   checkboxA: {
      //     disabled: false,
      //   },
      //   checkboxB: {
      //     disabled: false,
      //   },
      //   checkboxC: {
      //     disabled: false,
      //   },
      // });
    } else if (prevProps.open !== this.props.open && !this.props.open) {
      this.state.checkboxA.disabled = true;
      this.state.checkboxB.disabled = true;
      this.state.checkboxC.disabled = true;
    }
  }

  handleChangeA = (event) => {
    if (this.state.checkboxA.updating) {
      return;
    }
    this.state.checkboxA.updating = true;
    var newState = !this.state.checkboxA.checked ?? false;
    fetch(`${globals.api_domain}/api/usersettings/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notifyActivityInvolvingMe: newState }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          this.setState({
            checkboxA: {
              checked: res.settings.notifyActivityInvolvingMe ?? false,
              disabled: false,
            },
            snackbars: {
              successOpen: true,
            },
          });
        });
      } else {
        this.setState({
          checkboxA: {
            checked: this.state.checkboxA.checked,
            disabled: false,
          },
          snackbars: {
            errorOpen: true,
          },
        });
      }

      this.state.checkboxA.updating = false;
    });
  };

  handleChangeB = (event) => {
    if (this.state.checkboxB.updating) {
      return;
    }
    this.state.checkboxB.updating = true;
    var newState = !this.state.checkboxB.checked ?? false;
    fetch(`${globals.api_domain}/api/usersettings/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notifyEventActivity: newState }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          this.setState({
            checkboxB: {
              checked: res.settings.notifyEventActivity ?? false,
              disabled: false,
            },
            snackbars: {
              successOpen: true,
            },
          });
        });
      } else {
        this.setState({
          checkboxB: {
            checked: this.state.checkboxB.checked,
            disabled: false,
          },
          snackbars: {
            errorOpen: true,
          },
        });
      }

      this.state.checkboxB.updating = false;
    });
  };

  handleChangeC = (event) => {
    if (this.state.checkboxC.updating) {
      return;
    }
    this.state.checkboxC.updating = true;
    var newState = !this.state.checkboxC.checked ?? false;
    fetch(`${globals.api_domain}/api/usersettings/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notifyGuestRSVP: newState }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          this.setState({
            checkboxC: {
              checked: res.settings.notifyGuestRSVP ?? false,
              disabled: false,
            },
            snackbars: {
              successOpen: true,
            },
          });
        });
      } else {
        this.setState({
          checkboxC: {
            checked: this.state.checkboxC.checked,
            disabled: false,
          },
          snackbars: {
            errorOpen: true,
          },
        });
      }

      this.state.checkboxC.updating = false;
    });
  };

  handleErrorSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackbars: {
        errorOpen: false,
      },
    });
  };

  handleSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackbars: {
        successOpen: false,
      },
    });
  };

  render() {
    return (
      <Menu
        id="quick-settings-menu"
        anchorEl={this.props.anchorEl}
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <MenuItem onClick={this.handleChangeA}>
          <ListItemIcon>
            <Checkbox
              checked={this.state.checkboxA.checked}
              disabled={this.state.checkboxA.disabled}
              size="small"
            />
          </ListItemIcon>
          <ListItemText>
            Notify me when I'm involved in an activity
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={this.handleChangeB}>
          <ListItemIcon>
            <Checkbox
              checked={this.state.checkboxB.checked}
              disabled={this.state.checkboxB.disabled}
              size="small"
            />
          </ListItemIcon>
          <ListItemText>Notify me on event updates</ListItemText>
        </MenuItem>
        <MenuItem onClick={this.handleChangeC}>
          <ListItemIcon>
            <Checkbox
              checked={this.state.checkboxC.checked}
              disabled={this.state.checkboxC.disabled}
              size="small"
            />
          </ListItemIcon>
          <ListItemText>Notify me on new RSVP </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => this.setState({ changeAccountIDDialogOpen: true })}
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText>Change Accounts</ListItemText>
        </MenuItem>
        <MenuItem onClick={this.props.handleMenuOpen}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Open Menu</ListItemText>
        </MenuItem>

        <Snackbars
          open={this.state.snackbars.errorOpen}
          message="Couldn't update settings. Check your network connection."
          severity="error"
          onClose={this.handleErrorSnackbarClose}
        />
        <Snackbars
          open={this.state.snackbars.successOpen}
          message="Settings updated successfully."
          severity="success"
          onClose={this.handleSuccessSnackbarClose}
        />
        <ChangeAccountIDDialog
          open={this.state.changeAccountIDDialogOpen}
          onClose={() => this.setState({ changeAccountIDDialogOpen: false })}
        />
      </Menu>
    );
  }
}

export default GlobalUserSettingsMenu;
