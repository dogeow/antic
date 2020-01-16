import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import './index.css'
import App from './App';
import Wrap from './middleware/lifecycle'
import * as serviceWorker from './serviceWorker';

// 日期
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment' // 导入一些 moment 实用工具
import 'moment/locale/zh-cn' // 导入简体中文
import moment from 'moment'

moment.locale("zh-cn"); // 使用简体中文

const WrapApp = Wrap(App);

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment} locale={'zh-cn'}>
      <WrapApp/>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
