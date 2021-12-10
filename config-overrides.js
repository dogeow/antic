/* eslint-disable react-hooks/rules-of-hooks */
const { override, useBabelRc, overrideDevServer } = require("customize-cra");

const devServerConfig = () => (config) => {
  return {
    ...config,
    writeToDisk: true,
  };
};

module.exports = {
  webpack: override(useBabelRc()),
  devServer: overrideDevServer(devServerConfig()),
};
