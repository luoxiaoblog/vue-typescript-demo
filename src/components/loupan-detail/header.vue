<template>
  <div class="lpdetail-header">
    <div class="swiper-container photo-wrap">
      <ul class="swiper-wrapper" id="houseImages">
        <li v-for="item in data.albumList" :key="item.id" class="swiper-slide swiper-img">
          <img
            :src="item.imgVistPath + '?imageView2/2/w/400/h/300'"
            onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
          >
        </li>
      </ul>
      <span class="photo-no">{{imgCurrIndex}}/26</span>
      <span class="photo-edit" onclick="goPhotoEdit()">编辑</span>
    </div>
    <div class="clear title-wrap">
      <div class="esf-title" id="name" onclick="goDicEdit()">{{data.dic.name}}</div>
      <p id="addr">地址：{{data.dic.areaName}}-{{data.dic.placeName}}-{{data.dic.addr}}</p>
      <input class="infoField" type="hidden" id="comId">
    </div>
    <div class="fangyuan-info-detail">
      <div class="area-price border-top border-bottom">
        <ul>
          <li>
            <p class="content" style="font-size:0.3rem;">
              <b class="num" id="saleAvgPrice">{{saleAvgPrice}}</b>
            </p>
            <p class="title">小区在售均价</p>
          </li>
          <li>
            <p class="content">
              <b class="num" id="saleCount">{{saleCount}}</b>
            </p>
            <p class="title">在售房源</p>
          </li>
          <li>
            <p class="content">
              <b class="num" id="rentCount">{{rentCount}}</b>
            </p>
            <p class="title">在租房源</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Watch } from 'vue-property-decorator';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

@Component
export default class LPDetailHeader extends Vue {
  @Prop({
    default: () => {
      return {
        dic: {},
        info: {},
        albumList: Array
      };
    }
  })
  data: any;

  @Provide() imgCurrIndex: number = 1;

  get saleAvgPrice(): string {
    return this.valTool(this.data.info.saleAvgPrice, '元/m²');
  }

  get saleCount(): string {
    return this.valTool(this.data.info.saleCount, '', '--');
  }

  get rentCount(): string {
    return this.valTool(this.data.info.rentCount, '', '--');
  }

  @Watch('data')
  dataChange(val: any) {
    this.$nextTick(() => {
      const vm = this;
      const swiper = new Swiper('.swiper-container', {
        on: {
          slideChange: function() {
            vm.imgCurrIndex = swiper.activeIndex + 1;
          }
        }
      });
    });
  }

  valTool(val: string, unitStr: string = '', emptyStr: string = ''): string {
    return !val ? emptyStr : val + unitStr;
  }
}
</script>

<style lang="scss" scoped>
.photo-wrap {
  position: relative;
  height: 5.62rem;
  overflow: hidden;
}

.photo-wrap ul li {
  width: 100%;
  height: 5.62rem;
  position: relative;
}

.photo-wrap ul img {
  width: 100%;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.swiper-container img {
  text-indent: -999999px;
}

.photo-wrap .photo-no {
  position: absolute;
  right: 0.3rem;
  bottom: 0.3rem;
  width: 0.8rem;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.24rem;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0.4rem;
  z-index: 1100;
}

.photo-wrap .photo-edit {
  position: absolute;
  left: 0.3rem;
  bottom: 0.3rem;
  width: 1rem;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.24rem;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0.4rem;
  z-index: 1100;
}

.title-wrap {
  padding: 0.26rem 0.3rem 0;
  border-bottom: none;
  background: #fff;
}

.title-wrap .esf-title {
  position: relative;
  display: block;
  padding-right: 1rem;
  padding-bottom: 0;
  margin: 0;
  font-size: 0.44rem;
  font-weight: bold;
  line-height: 0.56rem;
  color: #515151;
}

.title-wrap p {
  font-size: 0.28rem;
  line-height: 0.4rem;
  color: #9b9b9b;
  padding-top: 0.16rem;
  padding-bottom: 0.28rem;
}

.fangyuan-info-detail {
  position: relative;
  padding: 0 0.3rem 0.4rem;
  margin: 0;
  border-top: none;
  background: #fff;
}

.fangyuan-info-detail .area-price {
  position: relative;
}

.fangyuan-info-detail .area-price ul {
  margin: 0 -0.3rem;
  padding: 0.4rem 0;
  overflow: hidden;
}

.area-price ul li {
  float: left;
  width: 33.3333333%;
  text-align: center;
  border-right: 1px solid #e7e7e7;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.area-price ul li {
  width: 30%;
}

.area-price ul li:first-child {
  padding-left: 0;
}

.area-price ul li:first-child {
  width: 40%;
}

.area-price ul li .content {
  font-size: 0.32rem;
  font-weight: bold;
  line-height: 0.56rem;
  color: #e03236;
}

.area-price ul li .content .num {
  font-size: 0.4rem;
}

.area-price ul li .title {
  font-size: 0.3rem;
  color: #999;
}
</style>


