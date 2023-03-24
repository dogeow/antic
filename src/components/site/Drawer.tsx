import { Divider, Link, List, ListItemButton, ListItemText, SwipeableDrawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";

import appConfig from "../../config/index.json";
import anticPic from "../../resources/svg/antic";

const useStyles = makeStyles(() => ({
  list: {
    width: 250,
  },
}));

interface TemporaryDrawerProps {
  open: boolean;
  onClick: () => void;
}

/**
 * 抽屉柜
 * @param {TemporaryDrawerProps} props
 * @return {JSX.Element}
 */
const TemporaryDrawer: React.FC<TemporaryDrawerProps> = (props) => {
  const classes = useStyles();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
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
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
};

export default TemporaryDrawer;
