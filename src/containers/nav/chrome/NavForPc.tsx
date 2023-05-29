import { Box, Grid, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

import SubNav from "../../../components/nav/SubNav";
import chromeBookmarks from "../../../resources/Bookmarks.json";

const bookmarks = chromeBookmarks.roots.bookmark_bar.children;

// const other = chromeBookmarks['roots']['other']['children'];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function NavForPc() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      sx={{
        height: `calc(100% - ${(theme) => theme.spacing(4)})`,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Grid item xs={4} sm={3} md={2}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          {bookmarks.map(
            (project, index) =>
              project.type === "folder" && <Tab key={index} label={project.name} {...a11yProps(index)} />
          )}
        </Tabs>
      </Grid>
      <Grid item xs={8} sm={9} md={10}>
        {bookmarks.map(
          (project, index) =>
            project.type === "folder" && (
              <TabPanel key={index} value={value} index={index}>
                <SubNav data={project.children} />
              </TabPanel>
            )
        )}
      </Grid>
    </Grid>
  );
}
