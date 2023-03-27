import "@algolia/autocomplete-theme-classic";

import * as React from "react";
import { useRecoilState } from "recoil";

import { isSearchOpenState } from "../states";
import Autocomplete from "./SearchByAutocomplete";

export default function App() {
  const [searching, setSearching] = useRecoilState(isSearchOpenState);

  return searching ? (
    <></>
  ) : (
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
        closeSearch={() => {
          setSearching(false);
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 20,
        }}
      >
        <img src="https://upyun.dogeow.com/search-by-algolia-light-background.svg" alt="algolia" />
      </div>
    </div>
  );
}
