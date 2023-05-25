import { Md5 } from "ts-md5";

import { GRAVATAR_CDN } from "../config/services";

export const isJson = (str: string) => {
  try {
    const obj = JSON.parse(str);
    return !!(typeof obj === "object" && obj);
  } catch (e) {
    return false;
  }
};

const getJsonItem = (key: string) => {
  const data = localStorage.getItem(key);
  if (data !== null && isJson(data)) {
    return JSON.parse(data);
  }
  return null;
};

export const getItem = (key: string) => {
  if (key.includes(".")) {
    const [parentKey, childKey] = key.split(".");
    const data = getJsonItem(parentKey);
    return data !== null ? data[childKey] : null;
  } else {
    return getJsonItem(key);
  }
};

export const setItem = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * 获取主机头（Host）和域名（Domain），如 https://www.example.com/ ，不包含路径（Path）
 *
 * @param {string} url
 * @return {string|boolean}
 */
export const getHost = (url: string) => {
  const reg = /^(http?:s:\/\/.*?)(\/|$)/;
  const result = reg.exec(url);

  if (result) {
    return result[0];
  }

  return false;
};

export const getGravatarAddress = (email: string, width: number, type = "monsterid") => {
  if (email) {
    return `${GRAVATAR_CDN}/${Md5.hashStr(email)}.jpg?d=${type}&s=${width}`;
  }

  return GRAVATAR_CDN;
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

export const replaceItemAtIndex = (arr: [], index: number, newValue: any) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const removeItemAtIndex = (arr: [], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
