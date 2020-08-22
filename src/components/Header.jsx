import axios from "axios";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { loginAction, toggleDrawer } from "../actions";
import Header from "../containers/Header";
import { logged, logout } from "../helpers";

const mapStateToProps = (state) => ({
  toggle_drawer: state.lab.toggle_drawer,
  themePaletteType: state.lab.themePaletteType,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogout: () => {
    logout();
    dispatch({ type: "LOGOUT" });
    axios.post("user/logout").then(() => {
      Swal.fire("登出成功！");
    });
  },
  onClickDrawer: () => dispatch(toggleDrawer(ownProps.toggle_drawer)),
  onThemeClick: () => dispatch({ type: "TOGGLE_THEME" }),
  onTestLogin: () => {
    axios
      .post("user/login", {
        email: "test@test.com",
        password: "test@test.com",
        remember_me: true,
      })
      .then((response) => {
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
