import { ApolloProvider } from "@apollo/client";
import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/App";
import client from "./GraphQL";
import store from "./store";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
