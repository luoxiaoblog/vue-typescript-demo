<template>
  <div class="loupan-list">
    <section class="head-fixed">
      <header>
        <!--<a class="head-map" href="/"><i class="map-icon"></i></a>-->
        <div class="head-search">
          <span class="search-input">
            <i class="search-ico"></i>
            <input
              class="search-ipt"
              @focus="isFocusSearch = true;"
              @blur="isFocusSearch = false;"
              placeholder="请输入小区名称"
              value
              id="dicName"
              maxlength="50"
            >
          </span>
        </div>
        <div class="head-back" :style="searchCanelStyle">取消</div>
      </header>
      <div class="data-box clear">
        <ul class="select-box clear">
          <li class="dpdown-toggle caret">
            <span>区域</span>
          </li>
          <li class="dpdown-toggle caret">
            <span id="jgSpan" style="max-width: 1.7rem;">均价</span>
          </li>
          <li class="dpdown-toggle caret">
            <span>更多</span>
          </li>
          <li class="dpdown-toggle jjs_bd_log sort-block">
            <span id="orderSpan" style="max-width: 1.7rem;">排序</span>
            <i class="stor-icon"></i>
          </li>
        </ul>
        <div class="filter-content">
          <!-- 区域 -->
          <div class="filter-panel filter-panel0 clearfix" id="qyDiv" style="height: 6.8rem;">
            <div class="filter-panel-left" style="overflow: auto;">
              <ul id="cityChoose" class="panel-list panel-list-single"></ul>
            </div>
            <div class="filter-panel-middle scroll">
              <ul id="qyAdt" class="panel-list panel-list-single">
                <!-- <li class="">不限</li> -->
                <!-- <li class="jjs_bd_log">福田</li> -->
              </ul>
            </div>
            <div class="filter-panel-right scroll">
              <ul id="qysAdts" class="panel-list panel-list-single">
                <li>不限</li>
                <!-- <li class="jjs_bd_log">八卦岭</li> -->
              </ul>
            </div>
          </div>
          <!-- 均价 -->
          <div class="filter-panel filter-panel1" id="priceDiv">
            <div class="filter-panel-single scroll">
              <ul class="panel-list panel-list-single">
                <li class="dataLi on jgfw">
                  <span>不限</span>
                </li>
                <li class="dataLi jjs_bd_log jgfw" max-data="30000" min-data>30000元以下</li>
                <li class="dataLi jjs_bd_log jgfw" max-data="40000" min-data="30000">30000-40000</li>
                <li class="dataLi jjs_bd_log jgfw" max-data="50000" min-data="40000">40000-50000</li>
                <li class="dataLi jjs_bd_log jgfw" max-data="60000" min-data="50000">50000-60000</li>
                <li class="dataLi jjs_bd_log jgfw" max-data="80000" min-data="60000">60000-80000</li>
                <li class="dataLi jjs_bd_log jgfw" max-data="100000" min-data="80000">80000-100000</li>
                <li class="dataLi jjs_bd_log jgfw" max-data min-data="100000">100000以上</li>
              </ul>
            </div>
            <div class="filter-diy">
              <input
                class="fl filter-input priceInput"
                id="salePriceMin"
                type="number"
                maxlength="10"
                placeholder="最低均价"
                value
              >
              <span class="fl em">-</span>
              <input
                class="fl filter-input priceInput"
                id="salePriceMax"
                type="number"
                maxlength="10"
                placeholder="最高均价"
                value
              >
              <button class="fl filter-btn" id="diyPrice">确定</button>
            </div>
          </div>
          <!-- 更多 -->
          <div class="filter-panel filter-panel2">
            <div class="filter-panel-more scroll" id="moreDiv">
              <div class="filter-property">
                <div class="filter-dt">完善度</div>
                <div class="filter-dd clear">
                  <!--<a data-id="fitment" href="javascript:;">不限</a>-->
                  <a data-id="age" href="javascript:;" class="jjs_bd_log dgnx" data-value="1">已完善</a>
                  <a data-id="age" href="javascript:;" class="jjs_bd_log dgnx" data-value="0">未完善</a>
                </div>
              </div>
              <div class="filter-property">
                <div class="filter-dt">标签</div>
                <div class="filter-dd clear" id="tagDiv">
                  <!--<a data-id="tags" href="javascript:;">不限</a>-->
                  <a data-id="ts" class="jjs_bd_log" data-value="11">小区航拍</a>
                  <!-- <a data-id="ts" href="javascript:;" class="jjs_bd_log" data-value="12">地铁</a> -->
                </div>
              </div>
            </div>
            <div class="filter-btn-box iphoneXfixfoot">
              <a class="fl filter-prop-btn reset" id="more-reset">重置</a>
              <a class="fl filter-prop-btn confirm" id="more-confirm">确定</a>
            </div>
          </div>
          <!--排序-->
          <div class="filter-panel filter-panel3">
            <div class="filter-panel-single">
              <ul class="panel-list panel-list-single">
                <li data-id="sort" data-value="3" class="order">综合排序</li>
                <li data-id="sort" data-value="1" class="order">均价从高到低</li>
                <li data-id="sort" data-value="2" class="order">均价从低到高</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section class="wrapper-box" id="wrapper">
        <div class="scroll-wrapper">
          <ul class="house-list" id="houseList"></ul>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import API from '@/api/http';

@Component
export default class LoupanList extends Vue {
  @Provide() isFocusSearch: boolean = false;
  @Provide() loupanList: any[] = [];

  get searchCanelStyle(): any {
    return {
      display: this.isFocusSearch ? 'block' : 'none'
    };
  }

  async initLoupan() {
    let res = await API.get('/loupan');
    console.log(res);
    this.loupanList = res.data.loupanList;
  }

  mounted() {
    return this.initLoupan();
  }
}
</script>

<style lang="scss" scope>
.head-search {
  width: 100%;
}

.head-back {
  display: none;
  width: 15%;
  float: left;
  color: #cccccc;
}

.data-box ul.select-box .dpdown-toggle {
  width: 25%;
}
</style>
