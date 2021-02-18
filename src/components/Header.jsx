import axios from "axios";
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
    axios.post("user/guest").then((response) => {
      const accessToken = response.data.access_token;
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      axios.post("user/profile").then(({ data }) => {
        const { id, name, email: userEmail } = data;
        logged(response.data, data);
        dispatch(loginAction(accessToken, id, name, userEmail));
      });
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
