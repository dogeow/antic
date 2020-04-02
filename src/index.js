import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Wrap from './middleware/lifecycle';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';

const WrapApp = Wrap(App);
ReactDOM.render(
  <Provider store={store}>
    <WrapApp/>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
