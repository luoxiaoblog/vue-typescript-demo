import axios from 'axios';
import config from '@/config';

const HOST = config.basicUrl;

// 创建实例
const service = axios.create({
  baseURL: HOST,
  timeout: 5000, // 请求超时时间
  withCredentials: true
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 添加时间戳 阻止浏览器缓存
    let url: any = config.url;
    let timeStamp = 'timestamp=' + new Date().getTime().toString();
    if (url.indexOf('?') === -1) {
      url = url + '?' + timeStamp;
    } else {
      url = url + '&' + timeStamp;
    }
    config.url = url;
    // if (store.state.token !== null && store.state.token !== '') {
    //   config.headers['Authorization'] = store.state.token;
    // }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
