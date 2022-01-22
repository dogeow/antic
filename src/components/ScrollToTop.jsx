import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 路由跳转后，窗口滚动到顶部
 * @return {null}
 * @constructor
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
