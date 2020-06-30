import { connect } from "react-redux";
import App from "../components/App";

const mapStateToProps = (state) => ({
  themePaletteType: state.lab.themePaletteType,
});

export default connect(mapStateToProps)(App);
