import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SubNav from './Nav/SubNav';
import chromeBookmarks from '../resources/Bookmarks';

const bookmarks = chromeBookmarks['roots']['bookmark_bar']['children'];

// const other = chromeBookmarks['roots']['other']['children'];

function TabPanel(props) {
  const {children, value, index, ...other} = props;

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: `calc(100% - ${theme.spacing(4)})`,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Nav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
          {bookmarks.map((project, index) => (
            project.type === 'folder' &&
            <Tab key={index} label={project.name} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={8} sm={9} md={10}>
        {bookmarks.map((project, index) => (
          project.type === 'folder' && (
            <TabPanel key={index} value={value} index={index}>
              <SubNav data={project.children}/>
            </TabPanel>
          )
        ))}
      </Grid>
    </Grid>
  );
}
