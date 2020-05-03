import { connect } from "react-redux";
import App from "../components/App";

const mapStateToProps = (state, ownProps) => ({
  themePaletteType: state.lab.themePaletteType,
});

export default connect(mapStateToProps)(App);
