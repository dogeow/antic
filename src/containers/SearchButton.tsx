import SearchIcon from "@mui/icons-material/Search";
import { Hidden, IconButton, InputBase, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useCallback, useState } from "react";
import { useEvent } from "react-use";
import { useRecoilState } from "recoil";

import { isSearchOpenState } from "../states";

const SearchButton = () => {
  const [searching, setSearching] = useRecoilState(isSearchOpenState);
  const [metaKey, setMetaKey] = useState(false);

  const handleSearch = () => {
    setSearching(true);
  };

  const onKeyDown = useCallback(
    ({ key }) => {
      // 不在搜索时才记录 Meta
      if (!searching) {
        if (key === "k" && metaKey) {
          handleSearch();
          setMetaKey(false);
        } else if (key === "Meta") {
          setMetaKey(true);
        } else {
          setMetaKey(false);
        }
      } else {
        if (key === "Escape") {
          setSearching(false);
          setMetaKey(false);
        }
      }
    },
    [searching, metaKey]
  );

  const onKeyUp = useCallback(({ key }) => {
    if (key === "Meta") {
      setMetaKey(false);
    }
  }, []);

  useEvent("keyup", onKeyUp);
  useEvent("keydown", onKeyDown);

  return (
    <>
      <Hidden lgDown>
        <div
          sx={(theme) => ({
            display: "flex",
            padding: 4,
            alignItems: "center",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            "&:hover": {
              backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
          })}
          onFocus={handleSearch}
        >
          <InputBase
            placeholder="⌘ + k"
            sx={{
              width: "8ch",
              color: "white",
              textAlign: "center",
              padding: "unset",
              fontSize: "1.5rem",
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <div sx={{ paddingRight: 4 }} onClick={handleSearch}>
            <SearchIcon />
          </div>
        </div>
      </Hidden>
      <Hidden mdUp>
        <Tooltip title="搜索" aria-label="搜索" onClick={handleSearch}>
          <IconButton color="inherit" size="large">
            <SearchIcon />
          </IconButton>
        </Tooltip>{" "}
      </Hidden>
    </>
  );
};

export default SearchButton;
