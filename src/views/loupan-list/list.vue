<template>
  <section class="wrapper-box xq-list-wrapper" id="wrapper">
    <div class="scroll-wrapper">
      <ul class="house-list" id="houseList">
        <li v-for="(item) in data.data" :key="item.id">
          <a class="clear" :href="`/shenzhen/xq/detail/${item.id}.html`">
            <div class="fl housing-img">
              <img
                class="lazy-load"
                :alt="item.name"
                :src="item.photoPath"
                onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                style="display: block;"
              >
              <div class="icons"></div>
            </div>
            <div class="housing-info">
              <p class="detail-title xq-title">{{item.name}}</p>
              <div class="flex-row">
                <div class="flex-1">
                  <p class="clear xq-years">
                    {{item.completionYear}}年建成
                    {{!item.bdStruct ? '' : item.bdStruct.split(',')[0]}}
                  </p>
                  <p class="clear xq-addr">{{item.placeName}}</p>
                </div>
                <div class="xq-price">
                  <em>{{item.saleAvgPrice}}</em>元/m²
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';

@Component
export default class LPlist extends Vue {
  @Prop() data: any;

  // @Provide() loupanData: any = this.data;

  mounted() {
    console.log(this.data);
  }
}
</script>
