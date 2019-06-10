import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import FastClick from 'fastclick';

import './responsive';
import 'normalize.css';

// 兼容毒瘤ios的300ms延迟问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    (FastClick as any).attach(document.body);
  });
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
