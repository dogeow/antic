import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import scrollToElement from "scroll-to-element";
import Swal from "sweetalert2";

import { currentPageState, faceIsLoadingState, filteredEmojiListState, pageLimitState } from "../../states";

const PREVIOUS = "Previous";
const NEXT = "Next";

const showWarningMessage = (title: string) => {
  Swal.fire({
    position: "center",
    type: "info",
    title: title,
    showConfirmButton: false,
    timer: 1000,
  });
};

const BootNav = () => {
  const filteredFaces = useRecoilValue(filteredEmojiListState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [pageLimit] = useRecoilState(pageLimitState);
  const [, setFaceIsLoading] = useRecoilState(faceIsLoadingState);

  const handlePageSwitch = (action: typeof PREVIOUS | typeof NEXT) => {
    let pageChangeSuccessful = false;

    if (action === PREVIOUS) {
      if (currentPage <= 1) {
        showWarningMessage("最前了，没有上一页！");
      } else {
        setFaceIsLoading(true);
        setCurrentPage(currentPage - 1);
        pageChangeSuccessful = true;
      }
    }

    if (action === NEXT) {
      if (currentPage >= Math.ceil(filteredFaces.length / pageLimit)) {
        showWarningMessage("最后了，没有下一页！");
      } else {
        setFaceIsLoading(true);
        setCurrentPage(currentPage + 1);
        pageChangeSuccessful = true;
      }
    }

    if (pageChangeSuccessful) {
      scrollToElement("#emoji");
    }
  };

  return (
    <BottomNavigation showLabels value={-1} style={{ right: 0, left: 0, bottom: 0, position: "fixed" }}>
      <BottomNavigationAction label="上页" icon={<FirstPage />} onClick={() => handlePageSwitch(PREVIOUS)} />
      <BottomNavigationAction label="下页" icon={<LastPage />} onClick={() => handlePageSwitch(NEXT)} />
    </BottomNavigation>
  );
};

export default BootNav;
