<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
    <md-activity-indicator ref="loading" v-show="false" :size="20" :text-size="16">加载中...</md-activity-indicator>
  </div>
</template>
<script>
import { ActivityIndicator } from 'mand-mobile';
import Vue from 'vue';

export default {
  components: {
    [ActivityIndicator.name]: ActivityIndicator
  },

  mounted() {
    Vue.$loading = this.$refs.loading;
  }
};
</script>

<style lang="scss">
@import './assets/styles/wap-common';
@import './assets/styles/fangyuan';
@import './assets/styles/xq';
</style>
