import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
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
          <IconButton aria-label="share">
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
