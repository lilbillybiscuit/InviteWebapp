import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import ActivityCard from "../components/ActivityCard";
import Container from "@mui/material/Container";

const sampledata = [
  {
    name: "John Doe",
    time: "2 hours ago",
    id: 23524958,
    replied: "Yes",
    for: "1 guest",
  },
  {
    name: "John Doe",
    time: "2 hours ago",
    id: 231351372,
    replied: "Yes",
    for: "1 guest",
  },
  {
    name: "John Doe",
    time: "2 hours ago",
    id: 235241345,
    replied: "Yes",
    for: "1 guest",
  },
];

class ActivityPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Activity
          </Typography>
          {sampledata.map((data) => (
            <ActivityCard key={data.name} data={data} />
          ))}
        </Container>
        <ActivityCard />
      </React.Fragment>
    );
  }
}

export default ActivityPage;
