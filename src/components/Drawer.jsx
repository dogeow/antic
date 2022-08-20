import { Divider, Link, List, ListItemButton, ListItemText, SwipeableDrawer } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";

import appConfig from "../config";
import anticPic from "../resources/svg/antic";

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
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    props.onClick();
  };

  const sideList = () => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        {appConfig.menus.map((menu, index) => (
          <ListItemButton to={menu.url} component={RouteLink} key={index}>
            <ListItemText primary={menu.name} />
          </ListItemButton>
        ))}
        <Divider />
        {appConfig.externalMenus.map((menu) => (
          <ListItemButton
            component={Link}
            underline="none"
            style={{ cursor: "alias" }}
            href={menu.url}
            target="_blank"
            key={menu.url}
          >
            <ListItemText primary={menu.name} />
          </ListItemButton>
        ))}
        <Divider />
        <ListItemButton to="/about" component={RouteLink}>
          <img src={anticPic} alt="antic" style={{ height: 20, marginRight: 4 }} />
          <ListItemText primary="关于我" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer open={props.open} onClose={toggleDrawer} onOpen={toggleDrawer}>
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
