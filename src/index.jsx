import "./index.css";

import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/App";
import store from "./store";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
