import "./styles/index.css";

import { ApolloProvider } from "@apollo/client";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import client from "./instance/graphQL";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

// Sentry、增加 JavaScript 没有的函数（PHP 上的函数）、Chrome 控制台信息，LocalStorage 数据过期时的处理等
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
