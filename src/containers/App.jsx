import { connect } from "react-redux";

import App from "../components/App";

const mapStateToProps = (state) => ({
  paletteMode: state.lab.paletteMode,
});

export default connect(mapStateToProps)(App);
