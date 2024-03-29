import "./styles/index.css";

import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import { AxiosRequestConfig } from "axios";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot, Snapshot } from "recoil";
import { useRecoilSnapshot } from "recoil";
import { SWRConfig } from "swr";

import bootstrap from "./bootstrap";
import App from "./components/App";
import axios from "./instance/axios";
import client from "./instance/graphQL";
import reportWebVitals from "./reportWebVitals";

bootstrap();

const container = document.querySelector("#root") as HTMLElement;
const root = createRoot(container);

function DebugObserver() {
  const snapshot: Snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

const swrFetcher = async (resource: string, init?: AxiosRequestConfig) => {
  const { data } = await axios.get(resource, init);
  return data;
};

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SWRConfig value={{ fetcher: swrFetcher }}>
        <RecoilRoot>
          {import.meta.env.DEV && <DebugObserver />}
          <ConfigProvider locale={zhCN}>
            <App />
          </ConfigProvider>
        </RecoilRoot>
      </SWRConfig>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
