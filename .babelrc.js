const plugins = [
  [
    'recharts',
    'babel-plugin-direct-import',
    {
      modules: ['@mui/material', '@mui/icons-material']
    }
  ],
  [
    '@babel/plugin-syntax-jsx'
  ],
];

const presets = [
  [
    "@babel/preset-react"
  ]
];

module.exports = {plugins, presets};
