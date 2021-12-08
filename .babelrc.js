const plugins = [
  [
    '@babel/plugin-syntax-jsx'
  ],
  [
    'babel-plugin-direct-import',
    {modules: ['@mui/material', '@mui/icons-material']}
  ]
];

const presets = [
  [
    "@babel/preset-react"
  ]
];

module.exports = {plugins, presets};
