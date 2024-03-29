import { PaletteMode } from "@mui/material";
import { zhCN as coreZhCN } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import { zhCN } from "@mui/x-data-grid-pro";

export default (option: { paletteMode: PaletteMode }) =>
  createTheme(
    {
      palette: {
        mode: option.paletteMode,
      },
      typography: {
        fontFamily: "'JetBrains Mono', monospace",
      },
    },
    zhCN,
    coreZhCN
  );
