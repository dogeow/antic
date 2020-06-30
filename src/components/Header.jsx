import { connect } from "react-redux";
import { toggleDrawer } from "../actions";
import Header from "../containers/Header";

const mapStateToProps = (state, ownProps) => ({
  toggle_drawer: state.lab.toggle_drawer,
  themePaletteType: state.lab.themePaletteType,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickDrawer: () => dispatch(toggleDrawer(ownProps.toggle_drawer)),
  onThemeClick: () => dispatch({ type: "TOGGLE_THEME" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
