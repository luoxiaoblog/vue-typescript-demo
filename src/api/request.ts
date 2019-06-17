import axios from 'axios';
import qs from 'qs';
import config from './baseUrl.config';
import Vue from 'vue';
import { showFullScreenLoading, tryHideFullScreenLoading } from '../loading';
import router from '../router';
// import store from '../store';

// const HOST = config.basicUrl;

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg: string) => {
  // Toast({
  //   message: msg,
  //   duration: 1000,
  //   forbidClick: true
  // });
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: any) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};

// 创建实例
let service: any;
const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

// request拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 处理post请求变成options
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    if (Vue.$isShowLoading) {
      showFullScreenLoading();
    }
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
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
axiosInstance.interceptors.response.use(
  response => {
    // Do something with response data

    if (Vue.$isShowLoading) {
      tryHideFullScreenLoading();
    }
    return response;
  },
  error => {
    console.log(error); // for debug
    if (Vue.$isShowLoading) {
      tryHideFullScreenLoading();
    }

    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

if (process.env.NODE_ENV === 'development') {
  service = axiosInstance;
} else {
  service = {};
}

export default service;
