import axios from "axios";

export const logged = (access_token: string) => {
  localStorage.access_token = access_token;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
};

export const logout = () => {
  localStorage.removeItem('access_token');
};

// 获取主机头（Host）和域名（Domain），如 https://www.example.com/ ，不包含路径（Path）
export const getHost = (url: string) => {
  let reg = /^(http(?:s):\/\/.*?)(\/|$)/;
  let result = reg.exec(url);

  if (result) {
    return result[0];
  }

  return false;
};

// 温度转换
export function tryConvert(temperature: string, convert: Function) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export function toCelsius(fahrenheit: number) {
  return (fahrenheit - 32) * 5 / 9;
}

export function toFahrenheit(celsius: number) {
  return (celsius * 9 / 5) + 32;
}


