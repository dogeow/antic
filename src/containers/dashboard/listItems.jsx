import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";

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
      <ListSubheader inset>服务器</ListSubheader>
      <Link to="/dashboard/site">
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="站点" />
        </ListItem>
      </Link>
    </div>
  );
};
