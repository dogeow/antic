import Typography from "@mui/material/Typography";
import * as React from "react";

const type = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "button",
  "caption",
  "overline",
];

type.reverse();

const Font = () => (
  <div style={{ overflow: "scroll" }}>
    {type.map((item) => (
      <Typography variant={item} component="h2" key={item}>
        <span role="img" aria-label="火箭飞离地球">
          🌍🚀
        </span>
        马斯克，0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ。
      </Typography>
    ))}
  </div>
);

export default Font;
