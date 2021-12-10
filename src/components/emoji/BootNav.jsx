import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import * as React from "react";
import scrollToElement from "scroll-to-element";
import Swal from "sweetalert2";

const BootNav = (props) => {
  const { currentPage, whichPage, filterNum, pageLimit } = props;
  const handlePageSwitch = (action) => {
    if (action === "Previous") {
      if (currentPage <= 1) {
        Swal.fire({
          position: "center",
          type: "info",
          title: "最前了，没有上一页！",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      whichPage(currentPage - 1);
    }
    if (action === "Next") {
      if (currentPage >= Math.ceil(filterNum / pageLimit)) {
        Swal.fire({
          position: "center",
          type: "info",
          title: "最后了，没有下一页！",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        whichPage(currentPage + 1);
      }
    }
    scrollToElement("#emoji");
  };

  return (
    <BottomNavigation
      showLabels
      value={-1}
      style={{ right: 0, left: 0, bottom: 0, position: "fixed" }}
    >
      <BottomNavigationAction
        label="上页"
        icon={<FirstPage />}
        onClick={() => handlePageSwitch("Previous")}
      />
      <BottomNavigationAction
        label="下页"
        icon={<LastPage />}
        onClick={() => handlePageSwitch("Next")}
      />
    </BottomNavigation>
  );
};

export default BootNav;
