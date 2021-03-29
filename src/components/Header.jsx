import { connect } from "react-redux";

import {
  loginAction,
  logoutAction,
  snackToggleAction,
  toggleDrawer,
  toggleTheme,
} from "../actions";
import Header from "../containers/Header";
import { logout } from "../helpers";
import axios from "../instance/axios";

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
    const requests = [];
    if (localStorage.users) {
      JSON.parse(localStorage.users).map((user) => {
        requests.push(
          axios.post(
            "/user/logout",
            {},
            {
              headers: {
                Authorization: user.token,
              },
            }
          )
        );
        Promise.all(requests).then(function ([acct, perms]) {
          dispatch(logoutAction());
          localStorage.removeItem("users");
        });
      });
    }
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
