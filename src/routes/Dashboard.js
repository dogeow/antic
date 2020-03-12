import React from 'react'
import { Route, Switch } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CssBaseline from '@material-ui/core/CssBaseline'

// page
import Home from '../containers/dashboard/Home'
import Site from '../containers/dashboard/Site'
import Application from '../containers/dashboard/Application'

// layouts
import Header from '../containers/dashboard/Header'
import NoMatch from '../containers/NoMatch'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

const Dashboard = ({match}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Header/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Switch>
          <Route exact path="/dashboard" component={Home}/>
          <Route path="/dashboard/site" component={Site}/>
          <Route path="/dashboard/application" component={Application}/>
          <Route component={NoMatch}/>
        </Switch>
      </main>
    </div>
  )
};

export default Dashboard;
