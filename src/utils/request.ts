import axios from "axios";
import { getToken, setToken } from "./token";
import router from "./routes";

axios.defaults.baseURL = "http://10.101.5.53:8000";

const service = axios.create({
  url: "", // url = base url + request url
  data: {},
  params: {},
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 3000, // request timeout
});

service.interceptors.request.use(
  (config: any) => {
    if (getToken()) config.headers["token"] = getToken();
    return config;
  },
  (error: any) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (res: any) => {
    if (res.status === 200) {
      if (res.data.token && res.data.token != "") {
        setToken(res.data.token);
      }
      if (res.data.code === 2003 || res.data.code === 2004) {
        router.push("/valid");
      }
      return res.data.data;
    }
  },
  (error: any) => {
    let msg;
    let code;
    let response = error.response;
    if (response) {
      let data = response.data || {};
      let data_msg = data.msg;
      code = data.code || -1;
      msg = data_msg || "未知错误";
    }
    if (msg) {
      if (response.status === 401) router.push("/valid");
      return {
        error: true,
        msg: msg,
        code: code,
      };
    }
    return Promise.reject(error);
  }
);

export default service;
