import React from "react";
import { isMobile } from "react-device-detect";

import NavForMobile from "./NavForMobile";
import NavForPc from "./NavForPc";

const Index = () => {
  if (isMobile) {
    return <NavForMobile />;
  } else {
    return <NavForPc />;
  }
};

export default Index;
