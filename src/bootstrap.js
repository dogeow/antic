import Echo from "laravel-echo";

import consoleInfo from "./components/ConsoleInfo";
import changeTitle from "./components/site/ChangeTitle";
import { logout } from "./helpers";

if (
  localStorage.access_token_expired_at &&
  localStorage.access_token_expired_at < Date.now() / 1000
) {
  logout();
}

consoleInfo();
changeTitle();

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

if (process.env.NODE_ENV === "production") {
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
}

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

// eslint-disable-next-line no-extend-native
String.prototype.colorHex = function () {
  let i;
  const that = this;
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(that)) {
    const aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    const aNum = that.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      let numHex = "#";
      for (i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  }
  return that;
};

// eslint-disable-next-line no-extend-native
String.prototype.colorRgb = function () {
  let sColor = this.toLowerCase();
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    let i;
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return "RGB(" + sColorChange.join(",") + ")";
  }
  return sColor;
};
