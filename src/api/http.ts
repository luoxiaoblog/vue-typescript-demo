import axios from 'axios';
import qs from 'qs';
import config from '@/config';
import Vue from 'vue';
import { showFullScreenLoading, tryHideFullScreenLoading } from '../loading';

// const HOST = config.basicUrl;

// 创建实例
const service = axios.create({
  baseURL: config.basicUrl,
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 处理post请求变成options
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    if (Vue.$isShowLoading) {
      showFullScreenLoading();
    }
    // console.log(Vue.$isShowLoading);

    // 添加时间戳 阻止浏览器缓存
    // let url: any = config.url;
    // let timeStamp = 'timestamp=' + new Date().getTime().toString();
    // if (url.indexOf('?') === -1) {
    //   url = url + '?' + timeStamp;
    // } else {
    //   url = url + '&' + timeStamp;
    // }
    // config.url = url;
    // if (store.state.token !== null && store.state.token !== '') {
    //   config.headers['Authorization'] = store.state.token;
    // }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    // if (Vue.$isShowLoading) {
    //   tryHideFullScreenLoading();
    // }
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  response => {
    // Do something with response data
    if (Vue.$isShowLoading) {
      tryHideFullScreenLoading();
    }
    return response;
  },
  error => {
    console.log(error); // for debug
    // if (Vue.$isShowLoading) {
    //   tryHideFullScreenLoading();
    // }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
