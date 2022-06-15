import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
class ActivityCard extends Component {
  // List of things needed:
  // 1. Profile Picture
  // 2. Name
  // 3. Time ago
  // 4. Message
  state = {};
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Hi
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ActivityCard;
