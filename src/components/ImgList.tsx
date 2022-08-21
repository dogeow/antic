import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const tileData = [
  {
    img: "http://127.0.0.1:3000/logo80.png",
    title: "Image",
    author: "author",
  },
  {
    img: "http://127.0.0.1:3000/logo80.png",
    title: "Image",
    author: "author",
  },
  {
    img: "http://127.0.0.1:3000/logo80.png",
    title: "Image",
    author: "author",
  },
  {
    img: "http://127.0.0.1:3000/logo80.png",
    title: "Image",
    author: "author",
  },
  {
    img: "http://127.0.0.1:3000/logo80.png",
    title: "Image",
    author: "author",
  },
];

export default function SingleLineGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList className={classes.gridList} cols={2.5}>
        {tileData.map((tile) => (
          <ImageListItem key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <ImageListItemBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`} size="large">
                  <DeleteForeverIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
