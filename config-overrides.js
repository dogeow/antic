/* eslint-disable react-hooks/rules-of-hooks */
const {
  override,
  useBabelRc,
  overrideDevServer,
  addWebpackPlugin,
} = require("customize-cra");
const CopyPlugin = require("copy-webpack-plugin");
const multipleEntry = require("react-app-rewire-multiple-entry")([
  {
    entry: "src/index.js",
    template: "public/popup.html",
    outPath: "/popup.html",
  },
  {
    entry: "src/index.js",
    template: "public/index.html",
    outPath: "/index.html",
  },
]);

const devServerConfig = () => (config) => {
  return {
    ...config,
    writeToDisk: true,
  };
};

const copyPlugin = new CopyPlugin({
  patterns: [
    { from: "public/manifest_chrome.json", to: "manifest.json" },
    { from: "public", to: "" },
    { from: "src/background.js", to: "" },
  ],
});

module.exports = {
  webpack: override(
    useBabelRc(),
    addWebpackPlugin(copyPlugin),
    multipleEntry.addMultiEntry
  ),
  devServer: overrideDevServer(devServerConfig()),
};
