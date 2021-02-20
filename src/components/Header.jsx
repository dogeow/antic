import { connect } from "react-redux";

import {
  loginAction,
  logoutAction,
  snackToggleAction,
  toggleDrawer,
  toggleTheme,
} from "../actions";
import Header from "../containers/Header";
import { logged, logout } from "../helpers";
import axios from "../helpers/api";

const mapStateToProps = (state) => ({
  toggleDrawer: state.lab.toggleDrawer,
  paletteMode: state.lab.paletteMode,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch) => ({
  snackClose: (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(snackToggleAction());
  },
  onLogout: () => {
    logout();
    axios.post("user/logout").then(() => {
      dispatch(logoutAction());
    });
  },
  onClickDrawer: () => dispatch(toggleDrawer()),
  onThemeClick: () => dispatch(toggleTheme()),
  onTestLogin: () => {
    axios.post("user/guest").then(({ data }) => {
      dispatch(loginAction(data));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
