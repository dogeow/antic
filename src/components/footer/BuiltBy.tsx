import * as React from "react";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

import Heart from "../display/Heart";

const linkStyle: CSSProperties = {
  textDecorationLine: "underline",
  textDecorationStyle: "wavy",
  textDecorationColor: "green",
};

const BuiltBy = () => {
  return (
    <div>
      <span>Built By {"🔨👷‍♂ "}️</span>
      <Link to="/about" style={linkStyle}>
        小李世界
      </Link>
      <span> with </span>
      <Heart />
    </div>
  );
};

export default BuiltBy;
