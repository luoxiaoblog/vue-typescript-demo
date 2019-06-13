<template>
  <section class="summary">
    <div class="fangyuan-info-detail border-bottom">
      <div class="fangyuan-feature section-title-wrapper border-bottom">
        <div
          class="clear fangyuan-feature-title section-title-inner-wrapper"
          style="padding: 0.24rem 0;"
        >
          <span class="fl title">小区信息</span>
        </div>
      </div>
      <div class="feature-info">
        <ul class="floor-orientation clear">
          <li class="ditie">
            <span class="title">建筑类型：</span>
            <span class="content" id="buildingStructureStr">{{data.dic.buildingStructureStr}}</span>
          </li>
          <li class="ditie">
            <span class="title">建筑年代：</span>
            <span class="content" id="completionYear">{{data.dic.minCompleteDateStr}}</span>
          </li>
          <li class="ditie">
            <span class="title">
              <em>建筑面积</em>：
            </span>
            <span class="content" id="buildingArea">{{buildingArea}}</span>
          </li>
          <li>
            <span class="title">
              <em>绿化率</em>：
            </span>
            <span class="content" id="greenRate">{{greenRate}}</span>
          </li>
          <li>
            <span class="title">
              <em>容积率</em>：
            </span>
            <span class="content" id="cubageRate">{{data.info.cubageRate}}</span>
          </li>

          <li>
            <span class="title">规划户数：</span>
            <span class="content" id="totalHouse">{{totalHouse}}</span>
          </li>
          <li>
            <span class="title">
              <em>停车位</em>：
            </span>
            <span class="content" id="parkingCount">{{parkingCount}}</span>
          </li>
          <li class="ditie">
            <span class="title">
              <em>物业费</em>：
            </span>
            <span class="content" id="managerFee">{{manageFee}}</span>
          </li>
          <!--<li class="ditie">
							<span class="title">产权性质：</span>
							<span class="content" id="rightTypeStr"></span>
          </li>-->
          <li class="ditie" id="developer">
            <span class="title">
              <em>开发商</em>：
            </span>
            <div class="fl">
              <p v-for="(item, i) in developer" :key="i">{{item}}</p>
            </div>
          </li>
          <li class="ditie">
            <span class="title">物业公司：</span>
            <span class="content" id="managerCompanyName">{{data.info.managerCompany}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix strategy-box">
      <a class="strategy-btn jjs_bd_log" onclick="goDicEdit()" href="javascript:void(0);">更多小区信息(编辑)</a>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from 'vue-property-decorator';
import ValTool from '@/minxins/val-tool.minxin.vue';

@Component({
  mixins: [ValTool]
})
export default class LPDetailSummaryInfo extends Vue {
  @Prop({
    default: () => {
      return {
        dic: {},
        info: {}
      };
    }
  })
  data: any;

  get buildingArea(): string {
    return this.valEmptyTool(this.data.info.buildingArea, 'm²', '');
  }
  get greenRate(): string {
    return this.valEmptyTool(this.data.info.greenRate, '%', '');
  }

  get totalHouse(): string {
    return this.valEmptyTool(this.data.info.totalHouse, '户', '');
  }

  get parkingCount(): string {
    return this.valEmptyTool(this.data.info.parkingCount, '个', '');
  }

  get manageFee(): string {
    if ('元/㎡' === this.data.dic.managerFee) {
      return '';
    } else {
      return this.data.dic.managerFee;
    }
  }

  get developer(): string[] {
    const developer = this.data.info.developer;
    if (developer) return developer.split(',');
    return [''];
  }
}
</script>

<style lang="scss" scoped>
.fangyuan-info-detail {
  position: relative;
  padding: 0 0.3rem 0.4rem;
  margin: 0;
  border-top: none;
  background: #fff;
}

.fangyuan-info-detail ul.floor-orientation {
  padding: 0.16rem 0 0;
}

ul.floor-orientation li.ditie {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: flex;
  height: auto;
}

.fangyuan-info-detail ul.floor-orientation li .title {
  margin-left: 0;
}

ul.floor-orientation li .title {
  float: left;
  color: #999;
  font-size: 0.28rem;
}

ul.floor-orientation li.ditie .content {
  white-space: normal;
}
ul.floor-orientation li.ditie .content {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

ul.floor-orientation li {
  font-size: 0.3rem;
  float: left;
  width: 50%;
  height: 0.36rem;
  line-height: 0.36rem;
  color: #333;
  padding-top: 0.3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

ul.floor-orientation li.ditie {
  width: 100%;
}

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

.strategy-box {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  background: #ffffff;
}

.strategy-btn {
  font-size: 0.3rem;
  display: block;
  height: 0.88rem;
  line-height: 0.88rem;
  margin: 0 0.3rem;
  color: #7a90b6;
  text-align: center;
  border-radius: 0.04rem;
  background: rgba(122, 144, 182, 0.08);
}
</style>

