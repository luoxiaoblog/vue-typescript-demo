<template>
  <section
    class="fangyuan-feature recommend section-title-wrapper border-top"
    id="priceChart"
    v-if="data"
  >
    <div
      class="clear fangyuan-feature-title recommend-title section-title-inner-wrapper border-bottom"
    >
      <span class="fl title">价格走势</span>
      <span class="fr more">
        <i></i>
      </span>
    </div>
    <div class="feature-info">
      <div
        id="myChart"
        style="position: relative; overflow: hidden; width: 345px; height: 400px; padding: 0px; margin: 0px; border-width: 0px;"
      ></div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Watch } from 'vue-property-decorator';

// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/bar');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/line');

@Component
export default class LPDetailPriceInfo extends Vue {
  @Prop({
    type: [String, Object],
    default: ''
  })
  data: any;

  @Watch('data')
  dataChange(val: any) {
    const that = this;
    this.$nextTick(() => {
      if (this.data && this.data.lpCjPrice && this.data.lpCjPrice.length) {
        const lpCjPriceList = this.data.lpCjPrice;
        const newLpCjPriceList: number[] = [];
        lpCjPriceList.forEach((item: any) => {
          if (item) {
            newLpCjPriceList.push(that.priceTool(item));
          }
        });
        const xData = this.data.monthStr.filter((item: any) => {
          return !!item;
        });
        this.myChartInit(xData, newLpCjPriceList);
      }
    });
  }

  myChartInit(xData: string[], data: number[]) {
    const option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '15',
        top: '30',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisTick: false,
          data: xData
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '价格(万)',
          minInterval: '1',
          nameTextStyle: {
            color: 'black'
          },
          axisTick: {
            show: false,
            length: 30
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#B1B1B1'
            }
          },
          axisLabel: {
            fontSize: '12',
            color: '#999',
            // align: 'left',
            formatter: '{value} 万'
          }
        }
      ],
      series: [
        {
          name: '成交价',
          type: 'line',
          stack: '次数',
          lineStyle: {
            color: '#E03236',
            width: '1'
          },
          areaStyle: {
            normal: {
              color: '#E03236',
              opacity: '0.08'
            }
          },
          data: data
        }
      ]
    };
    const myChart = echarts.init(document.getElementById('myChart'));
    myChart.setOption(option, true);
  }

  priceTool(val: number): number {
    return val / 10000;
  }
}
</script>

