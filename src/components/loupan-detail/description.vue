<template>
  <section class="fangyuan-feature section-title-wrapper border-top border-bottom">
    <div class="clear fangyuan-feature-title section-title-inner-wrapper border-bottom">
      <span class="fl title">小区简介</span>
    </div>
    <div class="feature-info">
      <p class="info-text clamp" id="introduction">
        【基本信息】：NEW发生发送分13，别称叫12313，坐落于龙岗布吉镇大芬油画村对面1,宗地面积12㎡,小区绿化率高。
        【栋阁户型】：小区总共有19栋、总共约有6204户，主要户型有：20平米的15室2厅、50平米的15室5厅、100平米的13室1厅、253平米的8室5厅。
        【周边配套】：附近五公里内购物中心有水径商业广场、赛格ECO中心、万昌商业广场；超市有华润万家便利超市、福伴生活超市(丽湖店)；菜市场有上水农批市场、上水径街市、三联菜市场；公交车站有丽湖花园、丽湖花园、丽湖花园总站、恒通工业区、上水花园、秀峰路口、秀峰路口、上水径、红晟市场、茵悦之生，购物和出行都很方便。
      </p>
      <a class="info-more">全文</a>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';

@Component
export default class LPDetailDescription extends Vue {}
</script>

<style lang="scss" scoped>
.feature-info p {
  font-size: 0.32rem;
  position: relative;
  color: #333;
  line-height: 0.52rem;
  margin-bottom: 0.32rem;
  padding-bottom: 0.32rem;
  word-break: break-all;
}

.feature-info p {
  position: static;
  padding-bottom: 0;
  margin-bottom: 0.1rem;
}

.feature-info p.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-align: justify;
}

.feature-info .info-more {
  font-size: 0.32rem;
  color: #4a90e2;
}
</style>

