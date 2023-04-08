import axios from "axios";
import { Message, Loading } from "element-ui";
import store from "../store";
let isDev = process.env.NODE_ENV === "development";
isDev = false;
let baseURL;
// if (isDev) {
  baseURL = "http://localhost:3007";
//   baseURL = "http://huruqing.cn:3007";
// } else {
//   baseURL = "http://huruqing.cn:3007";
// }

const service = axios.create({
  baseURL, // api 的 VUE_APP_URL
  timeout: 30000, // 请求超时时间(因为需要调试后台,所以设置得比较大)
});

let loadObj;
// request拦截器
service.interceptors.request.use(
  (config) => {
    if (!loadObj) {
      loadObj = Loading.service({
        lock: true,
        target: "#loading",
        text: "努力加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    }

    // 请求头添加token
    config.headers["user-token"] = store.state.token;
    let roleType = store.state.userInfo.type * 1;
    if (config.method === "post" && roleType === 3) {
      return Promise.reject({
        message: "没有权限,请使用管理员账号登录",
      });
    } else {
      return config;
    }
  },
  (error) => {
    setTimeout(() => {
      loadObj.close();
    }, 300);
    return Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      loadObj.close();
    }, 300);
    const res = response.data;
    if (res.code == 666) {
      return res;
    } else {
      Message({
        message: res.msg,
        type: "error",
      });
      return Promise.reject(res.msg);
    }
  },
  (error) => {
    setTimeout(() => {
      loadObj.close();
    }, 300);
    Message({
      message: error.message,
      type: "error",
    });
    return Promise.reject(error.message);
  }
);

export default service;
