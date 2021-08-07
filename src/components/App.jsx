import "dayjs/locale/zh-cn";

import DayjsUtils from "@date-io/dayjs";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import themeCustomization from "config/theme";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";

import ScrollToTop from "./ScrollToTop";

dayjs.locale("zh-cn");

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
      <ScrollToTop />
      <MuiPickersUtilsProvider utils={DayjsUtils} locale="zh-cn">
        <ThemeProvider theme={themeCustomization({ paletteMode })}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
};

App.propTypes = {
  paletteMode: PropTypes.oneOf(["dark", "light"]).isRequired,
};

export default App;
