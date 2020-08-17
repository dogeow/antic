import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/browser";
import store from "./store";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
