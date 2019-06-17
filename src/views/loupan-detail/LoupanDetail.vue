<template>
  <div id="loupanDetail" style="padding-bottom: 1.16rem;">
    <lpdetail-header :data="detail"></lpdetail-header>
    <lpdetail-summary-info :data="detail"></lpdetail-summary-info>
    <lpdetail-baodian></lpdetail-baodian>
    <lpdetail-description :data="detail.info.introduction"></lpdetail-description>
    <lpdetail-price-info :data="detail.chartDatavo"></lpdetail-price-info>
    <lpdetail-pos-and-around :data="posData"></lpdetail-pos-and-around>
    <lpdetail-footer></lpdetail-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import LPDetailComponents from './components';
import api from '@/api';

@Component({
  components: {
    ...LPDetailComponents
  }
})
export default class LoupanDetail extends Vue {
  @Provide() id: string = '2';
  @Provide() detail: any = {
    dic: {},
    info: { introduction: '' },
    albumList: Array,
    chartDatavo: ''
  };

  get posData(): any {
    return {
      center: { lat: this.detail.info.lat, lng: this.detail.info.lng },
      zoom: 16,
      subwayList: this.detail.subwayList,
      schoolList: this.detail.schoolList
    };
  }

  async getDetail() {
    const res = await api.loupanDetailApi.getDicDetail({
      comId: this.id,
      source: 'dic-detail'
    });
    this.detail = res.data.data;
    console.log(this.detail);
  }
  mounted() {
    this.getDetail();
  }
}
</script>

<style lang="scss" scoped>
.recommend .recommend-title .more i {
  // background: url(image/arrow_more.png) no-repeat;
}
</style>

