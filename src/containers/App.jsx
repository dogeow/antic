import App from "components/App";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  paletteMode: state.lab.paletteMode,
});

export default connect(mapStateToProps)(App);
