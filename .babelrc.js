const plugins = [
  [
    'babel-plugin-direct-import',
    {modules: ['@mui/material', '@mui/icons-material']}
  ],
  [
    '@babel/plugin-syntax-jsx'
  ],
  [
    "file-loader",
    {
      "name": "[hash].[ext]",
      "extensions": ["png", "jpg", "jpeg", "gif", "svg", "ico", "json"],
      "publicPath": "/public",
      "outputPath": "/public",
      "context": "",
      "limit": 0
    }
  ]
];

const presets = [
  [
    "@babel/preset-react"
  ]
];

module.exports = {plugins, presets};
