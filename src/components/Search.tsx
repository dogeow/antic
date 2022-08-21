import "@algolia/autocomplete-theme-classic";

import React from "react";

import Autocomplete from "./SearchByAutocomplete";

export default function App(props) {
  return (
    props.searching && (
      <div
        className="container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 900,
          height: "-webkit-fill-available",
          backgroundColor: "white",
          overflow: "scroll",
        }}
      >
        <Autocomplete
          placeholder="Search"
          openOnFocus={true}
          debug={true}
          autoFocus={true}
          closeSearch={props.closeSearch}
        />
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 20,
          }}
        >
          <img
            src="https://upyun.dogeow.com/search-by-algolia-light-background.svg"
            alt="algolia"
          />
        </div>
      </div>
    )
  );
}
