import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

/**
 * 抽屉柜
 * @param {object} props
 * @param {boolean} drawerOpen
 * @param {function} onDrawerClick
 * @return {JSX.Element}
 * @constructor
 */
export default function TemporaryDrawer({ drawerOpen, onDrawerClick }) {
  const classes = useStyles();
  const anchor = "left";

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={onDrawerClick}
      onKeyDown={onDrawerClick}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer anchor={anchor} open={drawerOpen} onClose={onDrawerClick}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

TemporaryDrawer.propTypes = {
  drawerOpen: PropTypes.bool,
  onDrawerClick: PropTypes.func,
};
