import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../App.css'

// Material-UI
import 'typeface-roboto'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import CssBaseline from '@material-ui/core/CssBaseline'

import Routes from '../routes'
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
        <Routes/>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
