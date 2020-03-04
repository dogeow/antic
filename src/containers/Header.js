import { connect } from 'react-redux'
import { toggleDrawer, toggleTheme } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  toggle_drawer: state.lab.toggle_drawer,
  themePaletteType: state.lab.themePaletteType,
  lab: state.lab
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickDrawer: () => dispatch(toggleDrawer(ownProps.toggle_drawer)),
  onThemeClick: () => dispatch(toggleTheme())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)
