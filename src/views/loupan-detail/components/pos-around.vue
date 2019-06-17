<template>
  <section class="position-environ pos-around section-title-wrapper border-top border-bottom">
    <div class="clear position-environ-title section-title-inner-wrapper">
      <a class="clear" href="javascript:void(0);" onclick>
        <span class="fl title">位置及周边</span>
        <span class="fr more">
          <i></i>
        </span>
      </a>
    </div>
    <baidu-map
      class="bm-view"
      ak="rCLqzeOiDUi7jA9ddqaejk65"
      :center="data.center"
      :zoom="data.zoom"
      @ready="handler"
    ></baidu-map>
    <div class="position-info" id="subwayDiv" v-if="data.subwayList && data.subwayList.length > 0">
      <div class="info-detail">
        <span class="title">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;铁：</span>
        <span class="content" id="subway">
          <span v-for="(subway, i) in data.subwayList" :key="i">
            {{ subway.lineName + subway.name}}站
            <em>(距离约{{subway.distance}}米)</em>
          </span>
        </span>
      </div>
    </div>
    <ul class="floor-orientation clear" v-if="data.schoolList && data.schoolList.length > 0">
      <li class="jiaoyu border-top">
        <span class="title">教育配套：</span>
        <span class="content" id="school">
          <span
            v-for="(school, i) in data.schoolList"
            :key="i"
          >{{school.schoolName + ' ' + school.schoolNatureType}}</span>
        </span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from 'vue-property-decorator';
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';

@Component({
  components: {
    BaiduMap
  }
})
export default class LPDetailPositionAround extends Vue {
  @Prop({
    default: () => {
      return {
        center: {
          lng: 0,
          lat: 0
        },
        zoom: 15,
        subwayList: [],
        schoolList: []
      };
    }
  })
  data: any;

  handler({ BMap, map }: { BMap: any; map: any }) {
    const that = this;
    const point = new BMap.Point(this.data.center);
    map.disableDragging();
    map.disableScrollWheelZoom();
    map.disableDoubleClickZoom();
    map.disablePinchToZoom();
    // 添加自定义覆盖物
    const myIcon = new BMap.Icon('image/mapRed@2x.png', new BMap.Size(24, 32), {
      anchor: new BMap.Size(10, 35)
    });

    const local = new BMap.LocalSearch(map, {
      renderOptions: {
        map: map,
        autoViewport: false,
        selectFirstResult: false
      }
    });
    map.addOverlay(
      new BMap.Marker(point, {
        icon: myIcon
      })
    );
    // 查看地图大图
    map.addEventListener('click', function() {
      window.location.href =
        'map.html?lat=' + that.data.center.lng + '&lng=' + that.data.center.lat;
    });
  }
}
</script>

<style lang="scss" scoped>
.bm-view {
  width: 100%;
  height: 300px;
}

.position-environ .position-info {
  padding: 0.3rem;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
}

.position-environ .position-info {
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.position-info .info-detail {
  width: 100%;
  margin-bottom: 0.16rem;
  display: box;
  display: -moz-box;
  display: -webkit-box;
  flex-direction: column;
}

.position-info .info-detail:last-child {
  margin-bottom: 0;
}
.section-title-wrapper .title {
  font-size: 0.32rem;
  line-height: 0.48rem;
  font-weight: bold;
  color: #515151;
}
.position-info .info-detail .title {
  font-size: 0.28rem;
  color: #999;
}

.position-info .content {
  display: block;
  font-size: 0.3rem;
  color: #333;
  -webkit-box-flex: 1;
  box-flex: 1;
}

.position-info .info-detail .content {
  display: block;
  font-size: 0.28rem;
  color: #333;
  -webkit-flex: 1;
  flex: 1;
  width: 6rem;
}

.position-info .info-detail .content {
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
  padding-top: 0.24rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

ul.floor-orientation li {
  padding-top: 0.3rem;
}

ul.floor-orientation li.danjia,
ul.floor-orientation li.ditie,
ul.floor-orientation li.jiaoyu {
  width: 100%;
}

ul.floor-orientation li.jiaoyu {
  position: relative;
  margin: 0.24rem 0 0.09rem;
}

ul.floor-orientation li.ditie,
ul.floor-orientation li.jiaoyu {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: flex;
  height: auto;
}

ul.floor-orientation li.jiaoyu {
  margin: 0.24rem 0 0.4rem;
}

ul.floor-orientation li .title {
  float: left;
  color: #999;
}

ul.floor-orientation li .title {
  font-size: 0.28rem;
  margin-left: 0.3rem;
}

ul.floor-orientation li.ditie .content,
ul.floor-orientation li.jiaoyu .content {
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

ul.floor-orientation li.jiaoyu .content {
  white-space: normal;
}

ul.floor-orientation li.ditie .content span,
ul.floor-orientation li.jiaoyu .content span {
  margin-bottom: 0.24rem;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  width: 5.9rem;
}
</style>
