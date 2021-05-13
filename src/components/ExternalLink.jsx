import React from "react";

export default function (props) {
  return (
    <a href={props.url} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}
