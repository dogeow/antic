import { adaptV4Theme, createTheme } from "@mui/material/styles";

export default (option) =>
  createTheme(
    adaptV4Theme({
      palette: {
        mode: option.paletteMode,
      },
      typography: {
        fontFamily: "'JetBrains Mono', monospace",
      },
    })
  );
