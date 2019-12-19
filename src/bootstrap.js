import axios from 'axios'
import Swal from 'sweetalert2'

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

    return Promise.reject(error)
  }
);
