require('es6-promise').polyfill() // 引入一次就行
import axios, {
  AxiosInstance,
  AxiosRequestConfig
} from "axios";

window.console.log(process.env);

var basrUrl = "";
switch (process.env.NODE_ENV) {
  case "development":
    basrUrl = "http://localhost:5000";
    break;
  case "production":
    basrUrl = "http://dlcoudhis.xikang.com:14090";
    break;
}

var opts = {
  baseURL: basrUrl,
  timeout: 1000 * 6
};

var service = axios.create(opts);
/**
 * 请求拦截
 */
service.interceptors.request.use(
  config => {
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImFkbWluIiwiUGFzc1dvcmQiOiIxMjM0NTYiLCJQS0VZIjoiYjc2ZjhmMzZiMjU1MjI1OWFmY2UwNWQ4OGY2NGEwOGMiLCJuYmYiOjE1Nzg1NDAwNTUsImV4cCI6MTU3ODU0MzY1NCwiaWF0IjoxNTc4NTQwMDU1LCJpc3MiOiJ4a2hpcyIsImF1ZCI6ImlkZW50aXR5In0.2SoUqa0vP3Lby9_9zGAfTIoSPddv2q_TzGKIe8mjpX8";
      config.headers.Authorization = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
/**
 * 响应处理
 */
service.interceptors.response.use(
  response => {
    if (response.data.success) {
      return Promise.resolve(response.data.result);
    } else {
      return Promise.reject(response.data.error);
    }
  },
  error => {
    error.data = {};
    error.message = "服务器异常，请联系管理员！";
    return Promise.reject(error);
  }
);

export default service;
