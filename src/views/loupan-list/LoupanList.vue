<template>
  <div class="loupan-list">
    <header-search @searchLoupan="onSearchLoupan"></header-search>
    <lp-list ref="list" :data="loupanData" :cityCode="cityCode"></lp-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import ListComponents from './components';
import api from '@/api';

@Component({
  components: { ...ListComponents }
})
export default class LoupanList extends Vue {
  @Provide() isLoading: boolean = true;
  @Provide() loupanData: any = {
    data: [],
    pageNo: 1,
    pageSize: 10,
    total: 0
  };
  @Provide() cityCode: string = '000002';

  async initLoupan() {
    this.getLoupanList({
      pageNo: 1,
      pageSize: 10,
      searchCity: this.cityCode
    });
  }

  onSearchLoupan(params: any, e: any) {
    this.getLoupanList(params);
  }

  async getLoupanList(params: any) {
    Vue.$isShowLoading = true;
    const res = await api.loupanlistApi.queryDicList(params);
    this.loupanData = res.data.data;
  }

  mounted() {
    this.initLoupan();
  }
}
</script>

<style lang="scss" scope>
</style>
