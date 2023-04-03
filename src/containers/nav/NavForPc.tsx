import { Box, Grid, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";

import SubNav from "../../components/nav/SubNav";

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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: `calc(100% - ${theme.spacing(4)})`,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function NavForPc({ bookmarks }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={4} sm={3} md={2}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {Object.keys(bookmarks).map((category, index) => (
            <Tab key={index} label={category} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={8} sm={9} md={10}>
        {Object.keys(bookmarks).map((category, index) => {
          const subCategories = bookmarks[category];

          return (
            <TabPanel key={index} value={value} index={index}>
              <SubNav data={subCategories} />
            </TabPanel>
          );
        })}
      </Grid>
    </Grid>
  );
}
