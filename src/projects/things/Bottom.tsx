import { Box } from "@mui/system";
import { TabBar } from "antd-mobile";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import tabs from "./tabs";

const Bottom: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  return (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        position: "fixed",
        borderTop: "solid 1px var(--adm-color-border)",
        backgroundColor: "white",
      }}
    >
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </Box>
  );
};

export default Bottom;
