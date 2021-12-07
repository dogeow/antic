// TODO 部分改为 CSS in JS
import "./styles/index.css";

import { ApolloProvider } from "@apollo/client";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/App";
import client from "./instance/graphQL";
import store from "./store";

// Sentry
if (process.env.NODE_ENV === "production") {
  import("@sentry/react").then((Sentry) => {
    Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
  });
}

// 增加 JavaScript 没有的函数（PHP 上的）、Chrome 控制台信息，LocalStorage 数据过期时的处理
require("./bootstrap");

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.querySelector("#root")
);
