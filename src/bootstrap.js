import "@sweetalert2/theme-material-ui/material-ui.scss";

import axios from "axios";
import Echo from "laravel-echo";
import Swal from "sweetalert2";

import ConsoleInfo from "./components/ConsoleInfo";

const accessToken = localStorage.access_token;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
if (accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

axios.interceptors.request.use(
  (request) => {
    window.request = true;
    if (process.env.NODE_ENV === "development") {
      /* eslint-disable no-console */
      console.log("请求了：");
      console.log(request);
      /* eslint-enable no-console */
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
      /* eslint-disable no-console */
      console.log("返回了：");
      console.log(response);
      /* eslint-enable no-console */
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
      Swal.fire("提示️", "有新的 token", "info");
      localStorage.token = newToken;
    }

    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log(error);
          Swal.fire("提示️", error.response.data.message, "error");
          break;
        case 401: {
          const text = localStorage.getItem("user_id")
            ? "登录状态过期"
            : "尚未登录账号";
          Swal.fire("提示️", text, "warning");
          localStorage.removeItem("access_token");
          break;
        }
        case 422:
          break;
        default:
          Swal.fire(
            "提示️",
            error.response.statusText || error.response.message,
            "error"
          );
      }
    }

    return Promise.reject(error.response);
  }
);

ConsoleInfo();

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

// window.io = require('socket.io-client');
//
// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: window.location.hostname + ':6001'
// });
//

window.Pusher = require("pusher-js");

window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  wsHost: window.location.hostname,
  wsPort: 443,
  disableStats: true,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  encrypted: true,
});

window.Echo.channel("push").listen("TestBroadcastingEvent", (e) => {
  console.log(e);
});

(function (ns) {
  /**
   * mb_strwidth
   * @param String
   * @return int
   * @see http://php.net/manual/ja/function.mb-strwidth.php
   */
  const mb_strwidth = function (str) {
    let i = 0;
    const l = str.length;
    let c = "";
    let length = 0;
    for (; i < l; i++) {
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
   * mb_strimwidth
   * @param String
   * @param int
   * @param int
   * @param String
   * @return String
   * @see http://www.php.net/manual/ja/function.mb-strimwidth.php
   */
  const mb_strimwidth = function (str, start, width, trimmarker) {
    if (typeof trimmarker === "undefined") trimmarker = "";
    const trimmakerWidth = mb_strwidth(trimmarker);
    let i = start;
    const l = str.length;
    let trimmedLength = 0;
    let trimmedStr = "";
    for (; i < l; i++) {
      // const charCode = str.charCodeAt(i);
      const c = str.charAt(i);
      const charWidth = mb_strwidth(c);
      const next = str.charAt(i + 1);
      const nextWidth = mb_strwidth(next);
      trimmedLength += charWidth;
      trimmedStr += c;
      if (trimmedLength + trimmakerWidth + nextWidth > width) {
        trimmedStr += trimmarker;
        break;
      }
    }
    return trimmedStr;
  };
  ns.mb_strwidth = mb_strwidth;
  ns.mb_strimwidth = mb_strimwidth;
})(window);
