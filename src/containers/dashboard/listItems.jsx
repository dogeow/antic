import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import * as React from "react";
import { Link } from "react-router-dom";

export const MainListItems = (props) => {
  return (
    <div onClick={props.onClick}>
      <Link to="/dashboard/application">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="应用" />
        </ListItem>
      </Link>
    </div>
  );
};

export const SecondaryListItems = (props) => {
  return (
    <div onClick={props.onClick}>
      <Link to="/dashboard/site">
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="站点" />
        </ListItem>
      </Link>
      <Link to="/dashboard/pics">
        <ListItem button>
          <ListItemIcon>
            <PermMediaIcon />
          </ListItemIcon>
          <ListItemText primary="图片" />
        </ListItem>
      </Link>
    </div>
  );
};
