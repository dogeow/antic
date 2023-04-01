import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import React from "react";
import { isMobile } from "react-device-detect";

import NavForMobile from "./NavForMobile";
import NavForMobile2 from "./NavForMobile2";
import NavForPc from "./NavForPc";

const Index = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      {isMobile && (
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
          label="树形显示"
        />
      )}
      {isMobile ? checked ? <NavForMobile2 /> : <NavForMobile /> : <NavForPc />}
    </>
  );
};

export default Index;
