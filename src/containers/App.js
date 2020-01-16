import { connect } from 'react-redux'
import { toggleTheme } from '../actions'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => ({
  themePaletteType: state.lab.themePaletteType
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(toggleTheme(ownProps.themePaletteType))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
