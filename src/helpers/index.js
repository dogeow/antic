import dayjs from "dayjs";

import axios from "../instance/axios";

/**
 * 判断是否登录过期
 * @return {boolean}
 */
export const expired = () => {
  const expiredAt = localStorage.access_token_expired_at;
  return !(expiredAt && dayjs().isBefore(dayjs.unix(expiredAt)));
};

/**
 * 登录
 * @param {object} data
 */
export const logged = (data) => {
  localStorage.token = `Bearer ${data.token}`;
  localStorage.access_token_expired_at = dayjs().unix() + data.expiresIn;
  localStorage.userId = data.userId;
  localStorage.userName = data.userName;
  localStorage.userEmail = data.userEmail;
  axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
};

/**
 * 注销
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("access_token_expired_at");
};

/**
 * 获取主机头（Host）和域名（Domain），如 https://www.example.com/ ，不包含路径（Path）
 * @param {string} url
 * @return {string|boolean}
 */
export const getHost = (url) => {
  const reg = /^(http(?:s):\/\/.*?)(\/|$)/;
  const result = reg.exec(url);

  if (result) {
    return result[0];
  }

  return false;
};

/**
 * 温度转换
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
 * @param {string} fahrenheit
 * @return {number}
 */
export function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * 转华氏度
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
