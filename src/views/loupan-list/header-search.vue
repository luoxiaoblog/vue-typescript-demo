<template>
  <section class="head-fixed">
    <header>
      <!--<a class="head-map" href="/"><i class="map-icon"></i></a>-->
      <div class="head-search" :class="searchWrapperClz">
        <span class="search-input">
          <i class="search-ico"></i>
          <input
            ref="searchIpt"
            class="search-ipt"
            @focus="onSearchFocus"
            @input="onSearchInput"
            placeholder="请输入小区名称"
            value
            id="dicName"
            maxlength="50"
          >
        </span>
      </div>
      <div class="head-back" :style="searchCanelStyle" @click="onCancelSearch">取消</div>
    </header>
    <div class="data-box clear">
      <ul class="select-box clear">
        <li
          class="dpdown-toggle caret"
          @click="onClickAreaTrigger"
          :class="{curr: selectedAreaFilter.name, active: showFilter === 'areaFilter'}"
        >
          <span>{{selectedAreaFilter.name || '区域'}}</span>
        </li>
        <li
          id="priceFilter"
          class="dpdown-toggle caret"
          :class="{curr: selectedPriceFilter.minPrice || selectedPriceFilter.maxPrice, active: showFilter === 'priceFilter'}"
          @click="showFilter = showFilter === 'priceFilter' ? '' : 'priceFilter'"
        >
          <span id="jgSpan">{{ priceFilterText }}</span>
        </li>
        <li
          id="otherFilter"
          class="dpdown-toggle caret"
          :class="{active: showFilter === 'otherFilter'}"
          @click="showFilter = showFilter === 'otherFilter' ? '' : 'otherFilter'"
        >
          <span>更多</span>
        </li>
        <li
          class="dpdown-toggle jjs_bd_log sort-block"
          :class="{active: showFilter === 'sortFilter', curr: selectedSortFilter.value}"
          @click="showFilter = showFilter === 'sortFilter' ? '' : 'sortFilter'"
        >
          <span id="orderSpan">{{selectedSortFilter.text || '排序'}}</span>
          <i class="stor-icon"></i>
        </li>
      </ul>
      <div class="filter-content">
        <!-- 区域 -->
        <div
          class="filter-panel filter-panel0 clearfix"
          id="qyDiv"
          style="height: 6.8rem;"
          v-show="showFilter === 'areaFilter'"
        >
          <div class="filter-panel-left" style="overflow: auto;">
            <ul id="cityChoose" class="panel-list panel-list-single">
              <li data-id="qy" class="on">区域</li>
            </ul>
          </div>
          <div class="filter-panel-middle scroll">
            <ul id="qyAdt" class="panel-list panel-list-single" @click="onSelectArea">
              <li data-id="cs" data-index="-1" :class="{on: selectedAreaCode === ''}" code>不限</li>
              <li
                v-for="(item, i) in areaList"
                :key="item.id"
                data-id="cs"
                :code="item.code"
                :data-index="i + 1"
                :class="{on: selectedAreaCode === item.code}"
              >{{item.name}}</li>
            </ul>
          </div>
          <div class="filter-panel-right scroll" v-show="isShowPlaceFilter">
            <ul id="qysAdts" class="panel-list panel-list-single" @click="onSelectPlace">
              <li :class="{on: selectedPlaceCode === ''}" :data-index="-1">不限</li>
              <li
                v-for="(place, i) in placeList"
                :key="place.id"
                :class="{on: selectedPlaceCode === place.code}"
                data-id="places"
                :data-index="i"
                :name="i"
              >{{place.name}}</li>
            </ul>
          </div>
        </div>
        <!-- 均价 -->
        <div class="filter-panel filter-panel1" id="priceDiv" v-show="showFilter === 'priceFilter'">
          <div class="filter-panel-single scroll">
            <ul class="panel-list panel-list-single" @click="onSelectPrice">
              <li
                class="dataLi"
                :class="{on: !selectedPriceFilter.maxPrice && !selectedPriceFilter.minPrice }"
              >
                <span>不限</span>
              </li>
              <li
                class="dataLi"
                :class="{on: selectedPriceFilter.maxPrice == '30000' && selectedPriceFilter.minPrice == ''}"
                data-max-price="30000"
                data-min-price
              >30000元以下</li>
              <li
                class="dataLi"
                :class="{on: selectedPriceFilter.maxPrice == '40000' && selectedPriceFilter.minPrice == '30000'}"
                data-max-price="40000"
                data-min-price="30000"
              >30000-40000</li>
              <li
                class="dataLi"
                :class="{on: selectedPriceFilter.maxPrice == '50000' && selectedPriceFilter.minPrice == '40000'}"
                data-max-price="50000"
                data-min-price="40000"
              >40000-50000</li>
              <li
                class="dataLi"
                :class="{on: selectedPriceFilter.maxPrice == '60000' && selectedPriceFilter.minPrice == '50000'}"
                data-max-price="60000"
                data-min-price="50000"
              >50000-60000</li>
              <li
                class="dataLi"
                :class="{on: selectedPriceFilter.maxPrice == '80000' && selectedPriceFilter.minPrice == '60000'}"
                data-max-price="80000"
                data-min-price="60000"
              >60000-80000</li>
              <li
                class="dataLi"
                :class="{on: selectedPriceFilter.maxPrice == '100000' && selectedPriceFilter.minPrice == '80000'}"
                data-max-price="100000"
                data-min-price="80000"
              >80000-100000</li>
              <li
                class="dataLi"
                :class="{on: selectedPriceFilter.maxPrice == '' && selectedPriceFilter.minPrice == '100000'}"
                data-max-price
                data-min-price="100000"
              >100000以上</li>
            </ul>
          </div>
          <div class="filter-diy">
            <input
              class="fl filter-input priceInput"
              id="salePriceMin"
              type="number"
              maxlength="10"
              placeholder="最低均价"
              :value="selectedPriceFilter.minPrice"
            >
            <span class="fl em">-</span>
            <input
              class="fl filter-input priceInput"
              id="salePriceMax"
              type="number"
              maxlength="10"
              placeholder="最高均价"
              :value="selectedPriceFilter.maxPrice"
            >
            <button class="fl filter-btn" id="diyPrice">确定</button>
          </div>
        </div>
        <!-- 更多 -->
        <div class="filter-panel filter-panel2" v-show="showFilter === 'otherFilter'">
          <div class="filter-panel-more scroll" id="moreDiv">
            <div class="filter-property">
              <div class="filter-dt">完善度</div>
              <div class="filter-dd clear">
                <!--<a data-id="fitment" href="javascript:;">不限</a>-->
                <a
                  data-id="age"
                  href="javascript:;"
                  class="jjs_bd_log dgnx"
                  :class="{on: selectedOtherFilter.perfectionDegree === '1'}"
                  data-value="1"
                  @click="selectedOtherFilter.perfectionDegree = '1'"
                >已完善</a>
                <a
                  data-id="age"
                  href="javascript:;"
                  class="jjs_bd_log dgnx"
                  :class="{on: selectedOtherFilter.perfectionDegree === '2'}"
                  data-value="0"
                  @click="selectedOtherFilter.perfectionDegree = '2'"
                >未完善</a>
              </div>
            </div>
            <div class="filter-property">
              <div class="filter-dt">标签</div>
              <div class="filter-dd clear" id="tagDiv">
                <!--<a data-id="tags" href="javascript:;">不限</a>-->
                <a
                  data-id="ts"
                  class="jjs_bd_log"
                  :class="{on: selectedOtherFilter.tags === '1'}"
                  data-value="11"
                  @click="selectedOtherFilter.tags = '1'"
                >小区航拍</a>
                <!-- <a data-id="ts" href="javascript:;" class="jjs_bd_log" data-value="12">地铁</a> -->
              </div>
            </div>
          </div>
          <div class="filter-btn-box iphoneXfixfoot">
            <a class="fl filter-prop-btn reset" id="more-reset" @click="onResetOtherFilter">重置</a>
            <a
              class="fl filter-prop-btn confirm"
              id="more-confirm"
              @click="onClickOtherFilterConfirm"
            >确定</a>
          </div>
        </div>
        <!--排序-->
        <div class="filter-panel filter-panel3" v-show="showFilter === 'sortFilter'">
          <div class="filter-panel-single">
            <ul class="panel-list panel-list-single" @click="onSelectSortType">
              <li
                data-id="sort"
                data-value="3"
                class="order"
                :class="{on: selectedSortFilter.value === '3'}"
              >综合排序</li>
              <li
                data-id="sort"
                data-value="1"
                class="order"
                :class="{on: selectedSortFilter.value === '1'}"
              >均价从高到低</li>
              <li
                data-id="sort"
                data-value="2"
                class="order"
                :class="{on: selectedSortFilter.value === '2'}"
              >均价从低到高</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showFilter"></div>
    <div class="jjs-cont search-box" v-show="isFocusSearch">
      <div class="search-result" id="search-result">
        <ul class="preByContext" id="preByContext">
          <li
            v-for="item in searchResLoupan"
            :key="item.id"
            :id="item.id"
            @click="onClickSearchRes(item.id, $event)"
          >
            <span class="search-name">{{item.name}}</span>
            <span>{{item.areaName}}</span>
            <span>{{item.placeName}}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import API from '@/api/http';

@Component
export default class HeaderSearch extends Vue {
  @Provide() pageNo: number = 1;
  @Provide() isFocusSearch: boolean = false;
  @Provide() searchResLoupan: any[] = [];
  @Provide() loupanList: any[] = [];
  @Provide() cityCode: string = '000002';
  @Provide() areaList: any[] = [];
  @Provide() placeList: any[] = [];
  @Provide() isShowPlaceFilter: boolean = false;
  @Provide() selectedAreaCode: string = '';
  @Provide() selectedPlaceCode: string = '';
  @Provide() selectedAreaFilter: any = {};
  @Provide() selectedPriceFilter: any = {
    minPrice: '',
    maxPrice: ''
  };
  @Provide() selectedOtherFilter: any = {
    perfectionDegree: '',
    tags: ''
  };
  @Provide() selectedSortFilter: any = {
    value: '',
    text: ''
  };
  @Provide() showFilter: string = '';

  @Watch('showFilter')
  onIsShowAreaFilterChange(val: string) {
    this.toggleDocScroll(!!val);
    if (!val) {
      this.$emit('searchLoupan', this.filterObject);
    }
  }

  @Watch('isFocusSearch')
  onIsFocusSearchChange(val: boolean) {
    this.toggleDocScroll(val);
  }

  get filterObject(): any {
    return {
      pageNo: this.pageNo,
      pageSize: 10,
      searchCity: this.cityCode,
      searchArea: this.selectedAreaCode,
      searchPlace: this.selectedPlaceCode,
      salePriceMin: this.selectedPriceFilter.minPrice,
      salePriceMax: this.selectedPriceFilter.maxPrice,
      infoWsd: this.selectedOtherFilter.perfectionDegree,
      hp: this.selectedOtherFilter.tags,
      salePriceOrderType: this.selectedSortFilter.value
    };
  }

  get searchCanelStyle(): any {
    return {
      display: this.isFocusSearch ? 'block' : 'none'
    };
  }

  get searchWrapperClz(): any {
    return {
      focus: this.isFocusSearch
    };
  }

  get priceFilterText(): string {
    if (
      !this.selectedPriceFilter.minPrice &&
      !this.selectedPriceFilter.maxPrice
    ) {
      return '均价';
    }
    return `价格${this.selectedPriceFilter.minPrice}-${
      this.selectedPriceFilter.maxPrice
    }`;
  }

  async initArea() {
    const res = await API({
      method: 'post',
      url: '/jjrplus/city/queryByParentCode',
      data: {
        parentCode: this.cityCode,
        deeps: 3,
        cityCode: this.cityCode
      }
    });
    this.areaList = res.data.data;
  }

  async getPlaceList(code: string) {
    const res = await API.post('/jjrplus/city/queryByParentCode', {
      parentCode: code,
      deeps: 4,
      cityCode: this.cityCode
    });
    this.placeList = res.data.data;
  }

  async initDefaultLoupan() {
    const res = await this.getSearchResLoupan({
      pageSize: 10,
      searchCity: this.cityCode
    });
    this.searchResLoupan = res.data.datas;
  }

  getSearchResLoupan(params: any) {
    return API.post('/jjrplus/community/cascadeSearchCom', params);
  }

  toggleDocScroll(isNoScroll: boolean) {
    document.documentElement.classList.toggle('noscroll', isNoScroll);
  }

  onSearchFocus() {
    this.initDefaultLoupan();
    this.isFocusSearch = true;
  }

  async onSearchInput(e: any) {
    const res = await this.getSearchResLoupan({
      pageSize: 10,
      searchCity: this.cityCode,
      keyword: e.target.value
    });
    this.searchResLoupan = res.data.datas;
  }

  onClickSearchRes(id: string, e: any) {
    this.$emit('searchLoupan', { ...this.filterObject, searchCom: id });
    this.isFocusSearch = false;
  }

  onCancelSearch() {
    this.isFocusSearch = false;
    (this.$refs.searchIpt as any).value = '';
    this.$emit('searchLoupan', this.filterObject);
  }

  onClickAreaTrigger() {
    this.showFilter = this.showFilter === 'areaFilter' ? '' : 'areaFilter';
    this.isShowPlaceFilter = this.selectedPlaceCode === '' ? false : true;
  }

  onSelectArea(e: any) {
    const code = e.target.getAttribute('code');
    if (code === '') {
      this.isShowPlaceFilter = false;
      this.showFilter = '';
      this.selectedAreaCode = this.selectedPlaceCode = '';
      this.selectedAreaFilter = {};
      return;
    }
    this.getPlaceList(code);
    this.selectedAreaCode = code;
    this.isShowPlaceFilter = true;
  }

  onSelectPlace(e: any) {
    const index = e.target.getAttribute('data-index');
    this.showFilter = '';
    if (index === '-1') {
      this.selectedPlaceCode = '';
      this.isShowPlaceFilter = false;
      this.areaList.forEach((item, i) => {
        if (item.code === this.selectedAreaCode) {
          this.selectedAreaFilter = item;
        }
      });
    } else {
      this.selectedPlaceCode = this.placeList[index].code;
      this.selectedAreaFilter = this.placeList[index];
    }
  }

  onSelectPrice(e: any) {
    const minPrice = e.target.getAttribute('data-min-price');
    const maxPrice = e.target.getAttribute('data-max-price');
    this.selectedPriceFilter = {
      minPrice,
      maxPrice
    };
    this.showFilter = '';
  }

  onResetOtherFilter() {
    this.selectedOtherFilter = {
      perfectionDegree: '',
      tags: ''
    };
  }

  onClickOtherFilterConfirm() {
    this.showFilter = '';
  }

  onSelectSortType(e: any) {
    this.selectedSortFilter.value = e.target.getAttribute('data-value');
    this.selectedSortFilter.text = e.target.textContent;
    this.showFilter = '';
  }

  mounted() {
    this.initArea();
  }
}
</script>

<style lang="scss" scope>
.head-search {
  width: 100%;
}

.head-search.focus {
  width: 85%;
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

.search-box .search-result {
  position: fixed;
  z-index: 999;
}
</style>
