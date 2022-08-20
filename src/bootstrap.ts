import pusher from "pusher-js";

import consoleInfo from "./components/ConsoleInfo";
import changeTitle from "./components/site/ChangeTitle";

/**
 * Sentry、增加 JavaScript 没有的函数（PHP 上的函数）、Chrome 控制台信息，LocalStorage 数据过期时的处理等
 */
export default function bootstrap() {
  if (import.meta.env.PROD) {
    import("@sentry/react").then((Sentry) => {
      Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN });
    });
  }

  // Chrome 控制台信息
  consoleInfo();

  changeTitle(`记得回来！- ${import.meta.env.VITE_NAME}`, `欢迎回来！- ${import.meta.env.VITE_NAME}`);

  /**
   * Echo exposes an expressive API for subscribing to channels and listening
   * for events that are broadcast by Laravel. Echo and event broadcasting
   * allows your team to easily build robust real-time web applications.
   */
  window.Pusher = pusher;

  /**
   * mbStrWidth
   * @param {string} str
   * @return {int}
   * @see http://php.net/manual/ja/function.mb-strwidth.php
   */
  // eslint-disable-next-line no-extend-native
  String.prototype.mbStrWidth = (str: string) => {
    const strLength = str.length;
    let strCOde = 0;
    let mbStrLength = 0;
    for (let i = 0; i < strLength; i++) {
      strCOde = str.charCodeAt(i);
      if (strCOde >= 0x0000 && strCOde <= 0x0019) {
        mbStrLength += 0;
      } else if (strCOde >= 0x0020 && strCOde <= 0x1fff) {
        mbStrLength += 1;
      } else if (strCOde >= 0x2000 && strCOde <= 0xff60) {
        mbStrLength += 2;
      } else if (strCOde >= 0xff61 && strCOde <= 0xff9f) {
        mbStrLength += 1;
      } else if (strCOde >= 0xffa0) {
        mbStrLength += 2;
      }
    }

    return mbStrLength;
  };

  /**
   * mbStrImWidth
   * @param {string} str
   * @param {number} start
   * @param {number}  width
   * @param {string} trimMarker
   * @return {string}
   * @see http://www.php.net/manual/ja/function.mb-strimwidth.php
   */
  // eslint-disable-next-line no-extend-native
  String.prototype.mbStrImWidth = (str: string, start: number, width: number, trimMarker: string = ""): string => {
    const trimMakerWidth = trimMarker.mbStrWidth;
    const l = str.length;
    let trimmedLength = 0;
    let trimmedStr = "";
    for (let i = start; i < l; i++) {
      const c = str.charAt(i);
      const charWidth = c.mbStrWidth;
      const next = str.charAt(i + 1);
      const nextWidth = next.mbStrWidth;
      trimmedLength += charWidth;
      trimmedStr += c;
      if (trimmedLength + trimMakerWidth + nextWidth > width) {
        trimmedStr += trimMarker;
        break;
      }
    }

    return trimmedStr;
  };

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
}
