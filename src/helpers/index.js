import axios from "axios";
import moment from "moment";

// 判断是否登录过期
export const isExpired = () => {
  const accessTokenExpiredAt = localStorage.access_token_expired_at;
  return !(
    accessTokenExpiredAt && moment().isBefore(moment.unix(accessTokenExpiredAt))
  );
};

export const logged = (token, user) => {
  localStorage.access_token = token.access_token;
  localStorage.access_token_expired_at = moment().unix() + token.expires_in;
  localStorage.user_id = user.id;
  localStorage.user_name = user.name;
  localStorage.user_email = user.email;
  axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");
  localStorage.removeItem("access_token_expired_at");
};

// 获取主机头（Host）和域名（Domain），如 https://www.example.com/ ，不包含路径（Path）
export const getHost = (url) => {
  const reg = /^(http(?:s):\/\/.*?)(\/|$)/;
  const result = reg.exec(url);

  if (result) {
    return result[0];
  }

  return false;
};

// 温度转换
export function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

export function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
