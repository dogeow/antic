import "dayjs/locale/zh-cn";
import "../styles/App.scss";
import "../styles/App.css";

import DayjsUtils from "@date-io/dayjs";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "../routes";
import ScrollToTop from "./ScrollToTop";

require("../bootstrap");

dayjs.locale("zh-cn");

/**
 *
 * @param {object} props
 * @param {string} props.paletteMode
 * @return {JSX.Element}
 * @constructor
 */
const App = ({ paletteMode }) => {
  const theme = createMuiTheme({
    palette: {
      mode: paletteMode,
    },
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MuiPickersUtilsProvider utils={DayjsUtils} locale="zh-cn">
        <ThemeProvider theme={theme}>
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
