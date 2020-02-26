import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import './index.css'
import App from './containers/App';
import Wrap from './middleware/lifecycle'
import ErrorBoundary from "./enhancers/ErrorBoundary";
import * as serviceWorker from './serviceWorker';

// Material-UI pickers 日期，使用 moment
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment' // 导入一些 moment 实用工具
import moment from 'moment'
import 'moment/locale/zh-cn' // 导入简体中文

require('./bootstrap');
require('fundebug-revideo');

moment.locale("zh-cn"); // moment 使用简体中文

const WrapApp = Wrap(App);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment} locale={'zh-cn'}>
        <WrapApp/>
      </MuiPickersUtilsProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
