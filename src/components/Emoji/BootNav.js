import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import scrollToElement from 'scroll-to-element'
import Swal from 'sweetalert2'

const BootNav = (props) => {
  const {currentPage, which_page, filterNum, pageLimit} = props;
  const handlePageSwitch = (action) => {
    if (action === "Previous") {
      if (currentPage <= 1) {
        Swal.fire({
          position: 'center',
          type: 'info',
          title: '最前了，没有上一页！',
          showConfirmButton: false,
          timer: 1000
        });
        return;
      }
      which_page(currentPage - 1);
    }
    if (action === "Next") {
      if (currentPage >= Math.ceil(filterNum / pageLimit)) {
        Swal.fire({
          position: 'center',
          type: 'info',
          title: '最后了，没有下一页！',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        which_page(currentPage + 1);
      }
    }
    scrollToElement('#emoji');
  };

  return (
    <BottomNavigation
      showLabels
      value={-1}
      style={{right: 0, left: 0, bottom: 0, position: 'fixed'}}>
      <BottomNavigationAction label="上页" icon={<FirstPage/>} onClick={() => handlePageSwitch("Previous")}/>
      <BottomNavigationAction label="下页" icon={<LastPage/>} onClick={() => handlePageSwitch("Next")}/>
    </BottomNavigation>
  );
};

export default BootNav;
