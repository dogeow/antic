import { connect } from 'react-redux'
import { toggleSnackbar, toggleDrawer, toggleTheme } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  toggle_snackbar: state.lab.toggle_snackbar,
  toggle_drawer: state.lab.toggle_drawer,
  themePaletteType: state.lab.themePaletteType,
  is_expired: state.lab.is_expired,
  user_name: state.lab.user_name,
  lab: state.lab
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickSnackbar: () => dispatch(toggleSnackbar(ownProps.toggle_snackbar)),
  onClickDrawer: () => dispatch(toggleDrawer(ownProps.toggle_drawer)),
  onThemeClick: () => {
    dispatch(toggleTheme())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
