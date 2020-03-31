import {connect} from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => ({
  themePaletteType: state.lab.themePaletteType,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch({type: 'TOGGLE_THEME', value: ownProps.themePaletteType});
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
