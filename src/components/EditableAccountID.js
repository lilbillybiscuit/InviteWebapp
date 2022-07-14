import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
class EditableAccountID extends Component {
  state = {
    editUsername: false,
    username: "",
  };
  render() {
    return (
      <div>
        {this.state.editUsername ? (
          <TextField size="small" variant="standard"></TextField>
        ) : (
          <Box>
            <Typography variant="body2">
              Account ID: {this.state.username}
            </Typography>
          </Box>
        )}
      </div>
    );
  }
}

export default EditableAccountID;
