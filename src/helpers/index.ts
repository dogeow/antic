import { Md5 } from "ts-md5";

import { gravatarCdn } from "../config/services";
import axios from "../instance/axios";

/**
 * 登录
 *
 * @param {object} data
 */
// eslint-disable-next-line camelcase
export const logged = (data: { access_token: string; id: number; name: string; email: string }) => {
  const token = `Bearer ${data.access_token}`;
  localStorage.token = token;
  localStorage.userId = data.id;
  localStorage.userName = data.name;
  localStorage.userEmail = data.email;
  axios.defaults.headers.common.Authorization = token;
};

/**
 * 注销
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
};

/**
 * 获取主机头（Host）和域名（Domain），如 https://www.example.com/ ，不包含路径（Path）
 *
 * @param {string} url
 * @return {string|boolean}
 */
export const getHost = (url: string) => {
  const reg = /^(http(?:s):\/\/.*?)(\/|$)/;
  const result = reg.exec(url);

  if (result) {
    return result[0];
  }

  return false;
};

export const getGravatarAddress = (email: string, width: number, type = "monsterid") => {
  if (email) {
    return `${gravatarCdn}/${Md5.hashStr(email)}.jpg?d=${type}&s=${width}`;
  }

  return gravatarCdn;
};

/**
 * 温度转换
 *
 * @param {string} temperature
 * @param {function} convert
 * @return {string}
 */
export function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

/**
 * 转摄氏度
 *
 * @param {string} fahrenheit
 * @return {number}
 */
export function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * 转华氏度
 *
 * @param {string} celsius
 * @return {number}
 */
export function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function toParams(query) {
  const q = query.replace(/^\??\//, "");

  return q.split("&").reduce((values, param) => {
    const [key, value] = param.split("=");

    values[key] = value;

    return values;
  }, {});
}

export function toQuery(params, delimiter = "&") {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, "");
}

/**
 * mbStrWidth
 *
 * @param {string} str
 * @return {int}
 * @see http://php.net/manual/ja/function.mb-strwidth.php
 */
export const mbStrWidth = (str: string) => {
  const strLength = str.length;
  let strCode = 0;
  let mbStrLength = 0;
  for (let i = 0; i < strLength; i++) {
    strCode = str.charCodeAt(i);
    if (strCode >= 0x0000 && strCode <= 0x0019) {
      mbStrLength += 0;
    } else if (strCode >= 0x0020 && strCode <= 0x1fff) {
      mbStrLength += 1;
    } else if (strCode >= 0x2000 && strCode <= 0xff60) {
      mbStrLength += 2;
    } else if (strCode >= 0xff61 && strCode <= 0xff9f) {
      mbStrLength += 1;
    } else if (strCode >= 0xffa0) {
      mbStrLength += 2;
    }
  }

  return mbStrLength;
};

/**
 * mbStrImWidth
 *
 * @param {string} str
 * @param {number} start
 * @param {number}  width
 * @param {string} trimMarker
 * @return {string}
 * @see http://www.php.net/manual/ja/function.mb-strimwidth.php
 */
export const mbStrImWidth = (str: string, start: number, width: number, trimMarker = ""): string => {
  const trimMakerWidth = mbStrWidth(trimMarker);
  const l = str.length;
  let trimmedLength = 0;
  let trimmedStr = "";
  for (let i = start; i < l; i++) {
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

export const colorHex = function (str: string) {
  let i: number;
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(str)) {
    const aColor = str.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = str;
    }
    return strHex;
  } else if (reg.test(str)) {
    const aNum = str.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return str;
    } else if (aNum.length === 3) {
      let numHex = "#";
      for (i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  }
  return str;
};

/**
 * 将颜色值转换为 RGB 颜色表示
 *
 * @param {string} str
 * @return {string}
 */
export const colorRgb = function (str: string) {
  let sColor = str.toLowerCase();
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
