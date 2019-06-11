import Vue from 'vue';
const debounce = require('lodash.debounce');

let needLoadingRequestCount = 0;

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    Vue.$loading.$el.style = 'display: block';
    console.log('loading');
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    debounce(tryCloseLoading, 300)();
  }
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    Vue.$loading.$el.style = 'display: none';
    console.log('unloading');
    Vue.$isShowLoading = false;
  }
};
