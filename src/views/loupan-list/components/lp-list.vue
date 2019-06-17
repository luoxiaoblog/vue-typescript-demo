<template>
  <section class="wrapper-box xq-list-wrapper" id="wrapper">
    <div class="scroll-wrapper">
      <ul class="house-list" id="houseList">
        <li v-for="(item) in data.data" :key="item.id">
          <a class="clear" :href="`./dic-detail.html?comId=${item.id}&cityCode=${cityCode} `">
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
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    data: Object,
    cityCode: {
      type: String,
      default: '000002'
    }
  }
})
export default class LPlist extends Vue {}
</script>
