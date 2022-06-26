import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import ActivityCard from "../components/ActivityCard";
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
      <Container maxWidth="md" sx={{
        
      }}>
        <Typography variant="h4" sx={{ marginTop: "20px" }} gutterBottom>
          Activity
        </Typography>
        <ActivityCard 
          name="Test One"
          status="yes"
          color="#8f23b9"
          time="2 hours ago"
          message="Replied Yes"
          />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                opacity: 0.8,
                mr: 5,
              }}
            >
              2 hours ago
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Disabled Accordion</Typography>
          </AccordionSummary>
        </Accordion> */}
      </Container>
    );
  }
}

export default ActivityPage;
