import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../App.css'

// Material-UI
import 'typeface-roboto'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import CssBaseline from '@material-ui/core/CssBaseline'

// 此 PC 版的登录界面不用 Header 和 Footer
import Login from '../containers/Login'

// Spa
import Spa from '../routes/Spa'
import Dashboard from '../routes/Dashboard'

import ScrollToTop from "../components/ScrollToTop"

const App = ({themePaletteType}) => {
  const theme = createMuiTheme({
    palette: {
      type: themePaletteType
    },
  });

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Switch>
          <Route path="/Login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="*" component={Spa}/>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
