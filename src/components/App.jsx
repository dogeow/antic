import React from "react";
import { BrowserRouter } from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment"; // 导入一些 moment 实用工具
import moment from "moment";
import { ThemeProvider } from "@material-ui/core/styles";
import ScrollToTop from "./ScrollToTop";
import Routes from "../routes";
import "moment/locale/zh-cn";
import "typeface-roboto";
import "../App.scss";
import "../App.css";

require("../bootstrap");

moment.locale("zh-cn");

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

export default App;
