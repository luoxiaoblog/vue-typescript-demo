<template>
  <section
    class="fangyuan-feature fangyuan-group section-title-wrapper border-top border-bottom"
    id="villageDiv"
    onclick="goVillage()"
  >
    <div class="clear fangyuan-feature-title section-title-inner-wrapper">
      <span class="fl title">
        小区宝典
        <br>
        <span class="title-tip">小区专家为您量身定做小区攻略报告</span>
        <a>了解详情</a>
      </span>
      <img class="group-img" src="image/group.png" alt>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';

@Component
export default class LPDetailBaodian extends Vue {}
</script>

<style lang="scss" scoped>
.fangyuan-group .title-tip {
  color: #999;
  font-size: 0.24rem;
  line-height: 0.4rem;
  font-weight: 100;
}

.fangyuan-group a {
  color: #e03236;
  font-size: 0.24rem;
}

.group-img {
  height: 1.1rem;
  width: auto;
  position: absolute;
  right: 0.4rem;
  top: 0.2rem;
}
</style>

