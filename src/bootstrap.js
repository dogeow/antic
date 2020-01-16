import axios from 'axios'
import Swal from 'sweetalert2'
import Echo from 'laravel-echo'

import ConsoleInfo from './components/ConsoleInfo'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = `http://127.0.0.1:8000/api/`;

const access_token = localStorage["access_token"];
if (access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}

axios.interceptors.request.use(
  request => {
    console.log('请求了：');
    console.log(request);

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log('返回了：');
    console.log(response);

    let errors = response.data.error;
    if (errors) {
      Object.values(errors).forEach(
        error => {
          error.forEach(errorMessage => {
            Swal.fire('提示️', errorMessage, 'warning');
          })
        }
      );
    }

    let newToken = response.headers.authorization;
    if (newToken) {
      Swal.fire('提示️', '有新的 token', 'info');
      localStorage.token = newToken;
    }

    return response;
  },
  error => {
    if(error.response){
      switch (error.response.status) {
        case 401: // 清除 token 信息并跳转到登录页面
          Swal.fire('提示️', '登录状态过期', 'warning');
          localStorage.removeItem('access_token');
          // todo 跳到登录页面
          break;
        case 400:
          // todo
          break;
        default:
          Swal.fire('提示️', error.response.statusText, 'error');
      }
    }

    return Promise.reject(error)
  }
);

ConsoleInfo();

//网页当前状态判断
let state, visibilityChange;
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
document.addEventListener(visibilityChange, function () {
  document.title = document[state] === 'hidden' ? '记得回来！- 滑稽实验室' : '欢迎回来！- 滑稽实验室';
}, false);

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

window.io = require('socket.io-client');

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':6001'
});

window.Echo.channel('push')
  .listen('TestBroadcastingEvent', (e) => {
    console.log(e);
  });


// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
