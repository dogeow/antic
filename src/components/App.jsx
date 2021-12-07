import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import themeCustomization from "config/theme";
import PropTypes from "prop-types";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";

import ScrollToTop from "./ScrollToTop";

/**
 *
 * @param {object} props
 * @param {string} props.paletteMode
 * @return {JSX.Element}
 * @constructor
 */
const App = ({ paletteMode }) => {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="zh-cn">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themeCustomization({ paletteMode })}>
            <ScrollToTop />
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
};

App.propTypes = {
  paletteMode: PropTypes.oneOf(["dark", "light"]).isRequired,
};

export default App;
