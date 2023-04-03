import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import axios from "../../instance/axios";
import NavForMobile from "./NavForMobile";
import NavForMobile2 from "./NavForMobile2";
import NavForPc from "./NavForPc";

const Index = () => {
  const [checked, setChecked] = React.useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    axios.get("/bookmarks").then((res) => {
      setBookmarks(res.data);
    });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      {isMobile && (
        <>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
            label="树形显示"
          />
          {checked ? <NavForMobile2 bookmarks={bookmarks} /> : <NavForMobile bookmarks={bookmarks} />}
        </>
      )}
      {!isMobile && <NavForPc bookmarks={bookmarks} />}
    </>
  );
};

export default Index;
