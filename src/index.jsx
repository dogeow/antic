import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/App";
import store from "./store";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

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
