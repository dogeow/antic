import * as React from "react";
import { Link } from "react-router-dom";

import Heart from "../Heart";

const BuiltBy = () => (
  <>
    ⛏ Built By{" "}
    <Link
      to="/about"
      style={{
        textDecorationLine: "underline",
        textDecorationStyle: "wavy",
        textDecorationColor: "green",
      }}
    >
      小李世界
    </Link>
    {" with "}
    <Heart />
  </>
);

export default BuiltBy;
