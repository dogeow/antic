import "./styles/index.css";

import { ApolloProvider } from "@apollo/client";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { useRecoilSnapshot } from "recoil";

import bootstrap from "./bootstrap";
import App from "./components/App";
import client from "./instance/graphQL";
import reportWebVitals from "./reportWebVitals";

bootstrap();

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        {import.meta.env.DEV && <DebugObserver />}
        <App />
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
