import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { getHost } from "helpers";
import * as React from "react";

const useStyles = makeStyles(() => ({
  card: {
    minHeight: 152,
  },
  intro: {
    overflow: "hidden",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
  },
}));

const Menu = ({ url, name }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="body1"
              component="h3"
              className={classes.intro}
            >
              {name}
            </Typography>
            <Typography color="textSecondary" className={classes.intro}>
              {getHost(url)}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Grid>
  );
};

export default Menu;
