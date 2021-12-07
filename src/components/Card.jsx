import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
    backgroundSize: "contain",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({
  title,
  subHeader,
  img,
  link,
  intro,
  feeling,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader title={title} subheader={subHeader} />
      <CardMedia
        className={classes.media}
        image={`${process.env.REACT_APP_CDN_URL}/like/${img}!/compress/true/fw/800`}
        title="Paella dish"
      />
      <CardContent style={{ minHeight: "11em" }}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      </CardContent>
      <CardActions disableSpacing>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="share" size="large">
            <ShareIcon />
          </IconButton>
        </a>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="large"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{feeling}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
