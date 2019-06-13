<template>
  <div id="loupanDetail">
    <lpdetail-header :data="detail"></lpdetail-header>
    <lpdetail-summary-info :data="detail"></lpdetail-summary-info>
    <lpdetail-baodian></lpdetail-baodian>
    <lpdetail-description :data="detail.info.introduction"></lpdetail-description>
    <lpdetail-price-info :data="detail.chartDatavo"></lpdetail-price-info>
    <lpdetail-pos-and-around></lpdetail-pos-and-around>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import LPDetailComponents from '@/components/loupan-detail';
import API from '@/api';

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

  async getDetail() {
    const res = await API.post('/jjrplus/community/getDicDetail', {
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

