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
      if (res.data.code == 4000) {
        setToken(res.data.data);
      }
      if (
        res.data.code === 4001 ||
        res.data.code === 4002 ||
        res.data.code === 4003
      ) {
        router.push("/valid");
      }
      return res.data;
    }
  },
  (error: any) => {
    let response = error.response;
    return response.data;
    // return Promise.reject(error);
  }
);

export default service;
