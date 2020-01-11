require('es6-promise').polyfill() // 引入一次就行
import axios from "axios";
import store from "@/store";

var basrUrl = "";
switch (process.env.NODE_ENV) {
  case "development":
    basrUrl = "http://localhost:5000";
    break;
  case "production":
    basrUrl = "http://dlcloudhis.xikang.com/GenerateReport";
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
    config.headers.Authorization = "Bearer " + store.getters.token;
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
    if (response.data.success || response.data.Success) {
      return Promise.resolve(response.data.result || response.data.Result);
    } else {
      var data = {
        code: 500,
        message: (response.data.error && response.data.error.message) || (response.data.Error && response.data.Error.Message),
        data: response.data.error || response.data.Error
      };
      return Promise.reject(data);
    }
  },
  error => {
    var data = {
      code: 500,
      message: "系统请求失败，请稍后重试",
      data: error
    };
    return Promise.reject(data);
  }
);

export default service;
