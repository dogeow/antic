import { ApolloProvider } from "@apollo/client";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/App";
import client from "./instance/graphQL";
import store from "./store";

if (process.env.NODE_ENV === "production") {
  import("@sentry/react").then((Sentry) => {
    Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
  });
}

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
