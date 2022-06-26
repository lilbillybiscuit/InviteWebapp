import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Colors from "./Color";
import { darken, lighten } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

//Required Props:
// Color: Profile color
// Status: yes, maybe, no
// Name: Name of the person
// Time ago: Time since last update
// Message

const getColor = (status) => {
  switch (status) {
    case "yes":
      return lighten(Colors.yesColor, 0.8);
    case "maybe":
      return lighten(Colors.maybeColor, 0.8);
    case "no":
      return lighten(Colors.noColor, 0.8);
    default:
      return "#FFFFFF";
  }
};

const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  const initials = names
    .map((n) => n[0])
    .join("")
    .substring(0, 2);
  return initials;
};

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 900, mt: 2, bgcolor: getColor(props.status) }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: props.color || red[500] }} aria-label="recipe">
            {getInitials(props.name)}
          </Avatar>
        }
        title={props.name}
        subheader={props.time}
      />
      <CardContent>
        {props.message ? (
          <Typography variant="body2" color="text.secondary">
            {props.message}
          </Typography>
        ) : (
          props.children
        )}
      </CardContent>
    </Card>
  );
}
