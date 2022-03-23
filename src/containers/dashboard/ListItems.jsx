import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
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
