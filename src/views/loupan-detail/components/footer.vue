<template>
  <div class="clear button-block">
    <button id="scxq" class="fl grap-btn" data-value="0">收藏小区</button>
    <button class="fl contact-agent" onclick="contact()">咨询小区专家</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Watch } from 'vue-property-decorator';

@Component
export default class LPDetailFooter extends Vue {}
</script>

<style lang="scss" scoped>
.button-block {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.96rem;
}

.button-block {
  display: flex;
  -webkit-box-orient: horizontal;
  flex-direction: row;
  height: 1.32rem;
  padding: 0.22rem 0 0.22rem 0;
  background-color: #fff;
  box-sizing: border-box;
}

.grap-btn {
  width: 35%;
  height: 100%;
  margin: 0 0.1rem;
  font-size: 0.3rem;
  color: #fff;
  background: #f5c545;
  border: none;
}

.grap-btn,
.contact-agent {
  width: 42.5%;
}

.button-block .yuyue-fang,
.button-block .grap-btn {
  width: 1.44rem;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.28rem;
  margin-left: 0.1rem;
  text-align: center;
  border-radius: 3px;
}

.button-block .grap-btn {
  width: calc(50% - 0.2rem);
}

.contact-agent {
  width: 35%;
  height: 100%;
  font-size: 0.3rem;
  color: #fff;
  background: #e03236;
  border: none;
}

.contact-agent,
.grap-btn {
  font-size: 0.28rem;
  width: 50%;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  margin: 0 0.1rem;
  border-radius: 3px;
}
</style>


