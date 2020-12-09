import "moment/locale/zh-cn";
import "../styles/App.scss";
import "../styles/App.css";

import MomentUtils from "@date-io/moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "../routes";
import ScrollToTop from "./ScrollToTop";

require("../bootstrap");

moment.locale("zh-cn");

/**
 *
 * @param {object} props
 * @param {string} props.themePaletteType
 * @return {JSX.Element}
 * @constructor
 */
const App = ({ themePaletteType }) => {
  const theme = createMuiTheme({
    palette: {
      type: themePaletteType,
    },
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        libInstance={moment}
        locale="zh-cn"
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
};

App.propTypes = {
  themePaletteType: PropTypes.oneOf(["dark", "light"]).isRequired,
};

export default App;
