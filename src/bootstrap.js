import axios from "axios";
import Echo from "laravel-echo";
import Swal from "sweetalert2";

import consoleInfo from "./components/ConsoleInfo";
import { logout } from "./helpers";

if (
  localStorage.access_token_expired_at &&
  localStorage.access_token_expired_at < Date.now() / 1000
) {
  logout();
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
if (localStorage.token) {
  axios.defaults.headers.common.Authorization = localStorage.token;
}

axios.interceptors.request.use(
  (request) => {
    window.request = true;
    if (process.env.NODE_ENV === "development") {
      window.console.log("请求了：");
      window.console.log(request);
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      window.console.log("返回了：");
      window.console.log(response);
    }

    const errors = response.data.error;
    if (errors) {
      Object.values(errors).forEach((error) => {
        error.forEach((errorMessage) => {
          Swal.fire("提示️", errorMessage, "warning");
        });
      });
    }

    const newToken = response.headers.authorization;
    if (newToken) {
      localStorage.token = newToken;
    }

    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          const text = localStorage.getItem("userId")
            ? "登录状态过期"
            : "尚未登录账号";
          Swal.fire("提示️", text, "warning");
          localStorage.removeItem("token");
          break;
        }
      }
    }

    return Promise.reject(error.response);
  }
);

consoleInfo();

// 网页当前状态判断
let state;
let visibilityChange;
if (typeof document.hidden !== "undefined") {
  visibilityChange = "visibilitychange";
  state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
  visibilityChange = "mozvisibilitychange";
  state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
  visibilityChange = "msvisibilitychange";
  state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
  visibilityChange = "webkitvisibilitychange";
  state = "webkitVisibilityState";
}
// 添加监听器，在title里显示状态变化
document.addEventListener(
  visibilityChange,
  () => {
    document.title =
      document[state] === "hidden"
        ? `记得回来！- ${process.env.REACT_APP_NAME}`
        : `欢迎回来！- ${process.env.REACT_APP_NAME}`;
  },
  false
);

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

window.io = require("socket.io-client");

window.Echo = new Echo({
  broadcaster: "socket.io",
  host: window.location.hostname + ":6001",
  auth: {
    headers: {
      Authorization: localStorage.token,
    },
  },
});

((ns) => {
  /**
   * mbStrWidth
   * @param {string} str
   * @return {int}
   * @see http://php.net/manual/ja/function.mb-strwidth.php
   */
  const mbStrWidth = (str) => {
    const l = str.length;
    let c = "";
    let length = 0;
    for (let i = 0; i < l; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x0000 && c <= 0x0019) {
        length += 0;
      } else if (c >= 0x0020 && c <= 0x1fff) {
        length += 1;
      } else if (c >= 0x2000 && c <= 0xff60) {
        length += 2;
      } else if (c >= 0xff61 && c <= 0xff9f) {
        length += 1;
      } else if (c >= 0xffa0) {
        length += 2;
      }
    }
    return length;
  };

  /**
   * mbStrImWidth
   * @param {string} str
   * @param {int} start
   * @param {int}  width
   * @param {string} trimMarker
   * @return {string}
   * @see http://www.php.net/manual/ja/function.mb-strimwidth.php
   */
  const mbStrImWidth = (str, start, width, trimMarker = "") => {
    const trimMakerWidth = mbStrWidth(trimMarker);
    const l = str.length;
    let trimmedLength = 0;
    let trimmedStr = "";
    for (let i = start; i < l; i++) {
      // const charCode = str.charCodeAt(i);
      const c = str.charAt(i);
      const charWidth = mbStrWidth(c);
      const next = str.charAt(i + 1);
      const nextWidth = mbStrWidth(next);
      trimmedLength += charWidth;
      trimmedStr += c;
      if (trimmedLength + trimMakerWidth + nextWidth > width) {
        trimmedStr += trimMarker;
        break;
      }
    }
    return trimmedStr;
  };
  ns.mbStrWidth = mbStrWidth;
  ns.mbStrImWidth = mbStrImWidth;
})(window);
