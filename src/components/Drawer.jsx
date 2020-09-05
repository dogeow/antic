import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import React from "react";
import { Link as RouteLink } from "react-router-dom";

import menus from "../config/menus";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const externalMenus = [
  { name: "🗂️学习笔记", url: "https://wiki.kunyan.li" },
  { name: "🖌️Canvas 学习", url: "http://canvas.kunyan.li" },
];

const TemporaryDrawer = (props) => {
  const classes = useStyles();

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.onClick();
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {menus.map((menu, index) => (
          <ListItem button to={menu.url} component={RouteLink} key={index}>
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
        <Divider />
        {externalMenus.map((menu) => (
          <ListItem
            button
            component={Link}
            underline="none"
            style={{ cursor: "alias" }}
            href={menu.url}
            target="_blank"
            key={menu.url}
          >
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button to="/about" component={RouteLink}>
          <img
            src="/favicon.ico"
            alt="antic"
            style={{ height: 19, marginRight: 4 }}
          />
          <ListItemText primary="关于我" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        open={props.open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
};

export default TemporaryDrawer;
