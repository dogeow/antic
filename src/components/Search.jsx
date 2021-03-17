import "../styles/Search.css";

import React from "react";

import { Autocomplete } from "./SearchByAutocomplete";

export default function App(props) {
  return (
    props.searching && (
      <div
        className="container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 900,
          height: "-webkit-fill-available",
          backgroundColor: "white",
        }}
      >
        <Autocomplete
          placeholder="Search"
          openOnFocus={true}
          debug={true}
          autoFocus={true}
          closeSearch={props.closeSearch}
        />
      </div>
    )
  );
}
