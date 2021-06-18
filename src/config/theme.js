import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default (option) =>
  createMuiTheme({
    palette: {
      type: option.paletteMode,
    },
    typography: {
      fontFamily: "'JetBrains Mono', monospace",
    },
  });
