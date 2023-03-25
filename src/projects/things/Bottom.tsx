import makeStyles from "@mui/styles/makeStyles";
import { TabBar } from "antd-mobile";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import tabs from "./tabs";

const useStyles = makeStyles(() => ({
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    borderTop: "solid 1px var(--adm-color-border)",
    backgroundColor: "white",
  },
}));

const Bottom = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    navigate(value);
  };

  return (
    <TabBar activeKey={pathname} className={classes.bottom} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default Bottom;
