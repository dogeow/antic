import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import PropTypes from "prop-types";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";

import appConfig from "../config/app";
import anticPic from "../resources/antic";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

/**
 * 抽屉柜
 * @param {object} props
 * @param {function} props.onClick
 * @return {JSX.Element}
 * @constructor
 */

const TemporaryDrawer = (props) => {
  const classes = useStyles();
  const anchor = "left";

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
        {appConfig.menus.map((menu, index) => (
          <ListItem button to={menu.url} component={RouteLink} key={index}>
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
        <Divider />
        {appConfig.externalMenus.map((menu) => (
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
            src={anticPic}
            alt="antic"
            style={{ height: 20, marginRight: 4 }}
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
        {sideList(anchor)}
      </SwipeableDrawer>
    </div>
  );
};

TemporaryDrawer.propTypes = {
  onClick: PropTypes.func,
  open: PropTypes.bool,
};

export default TemporaryDrawer;
