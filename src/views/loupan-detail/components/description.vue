<template>
  <section class="fangyuan-feature section-title-wrapper border-top border-bottom">
    <div class="clear fangyuan-feature-title section-title-inner-wrapper border-bottom">
      <span class="fl title">小区简介</span>
    </div>
    <div class="feature-info">
      <p class="info-text clamp" id="introduction">{{introduction}}</p>
      <a class="info-more">全文</a>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from 'vue-property-decorator';

@Component
export default class LPDetailDescription extends Vue {
  @Prop()
  data: String = '';

  get introduction(): string {
    let c = this.data.replace(/\<br \/>/g, '\n');
    c = c.replace(/<br>/g, '\n');
    return c;
  }
}
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

