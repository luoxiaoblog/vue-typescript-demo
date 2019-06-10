<template>
  <div class="loupan-list">
    <section class="head-fixed">
      <header>
        <!--<a class="head-map" href="/"><i class="map-icon"></i></a>-->
        <div class="head-search">
          <span class="search-input" :class="searchWrapperClz">
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
          <li
            class="dpdown-toggle caret"
            @click="onClickAreaTrigger"
            :class="{curr: selectedAreaFilter.name, active: showFliter === 'areaFilter'}"
          >
            <span>{{selectedAreaFilter.name || '区域'}}</span>
          </li>
          <li
            id="priceFilter"
            class="dpdown-toggle caret"
            :class="{curr: selectedPriceFilter.minPrice || selectedPriceFilter.maxPrice, active: showFliter === 'priceFilter'}"
            @click="showFliter = showFliter === 'priceFilter' ? '' : 'priceFilter'"
          >
            <span id="jgSpan">{{ priceFilterText }}</span>
          </li>
          <li
            id="otherFilter"
            class="dpdown-toggle caret"
            :class="{active: showFliter === 'otherFilter'}"
            @click="showFliter = showFliter === 'otherFilter' ? '' : 'otherFilter'"
          >
            <span>更多</span>
          </li>
          <li
            class="dpdown-toggle jjs_bd_log sort-block"
            :class="{active: showFliter === 'sortFilter', curr: selectedSortFilter.value}"
            @click="showFliter = showFliter === 'sortFilter' ? '' : 'sortFilter'"
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
            :style="{ display: showFliter === 'areaFilter' ? 'block' : 'none' }"
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
            <div
              class="filter-panel-right scroll"
              :style="{ display: isShowPlaceFilter ? 'block' : 'none' }"
            >
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
          <div
            class="filter-panel filter-panel1"
            id="priceDiv"
            :style="{display: showFliter === 'priceFilter' ? 'block' : 'none' }"
          >
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
          <div
            class="filter-panel filter-panel2"
            :style="{display: showFliter === 'otherFilter' ? 'block' : 'none' }"
          >
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
          <div
            class="filter-panel filter-panel3"
            :style="{display: showFliter === 'sortFilter' ? 'block' : 'none' }"
          >
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
    </section>
    <section class="wrapper-box" id="wrapper">
      <div class="scroll-wrapper">
        <ul class="house-list" id="houseList">
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=2">
            <a class="clear" href="/shenzhen/xq/detail/2.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="佳兆业可园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2019-01/04/e72c72dc-d4ce-46d3-99b3-c49254a5abee.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2019-01/04/e72c72dc-d4ce-46d3-99b3-c49254a5abee.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">佳兆业可园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2004年建成
                      塔板结合
                    </p>
                    <p class="clear xq-addr">龙岗百鸽笼</p>
                  </div>
                  <div class="xq-price">
                    <em>56226</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=306">
            <a class="clear" href="/shenzhen/xq/detail/306.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="振业峦山谷花园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2019-01/14/1264bf79-b7bc-427d-acb8-697138c5a739.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2019-01/14/1264bf79-b7bc-427d-acb8-697138c5a739.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">振业峦山谷花园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2009年建成
                      板楼
                    </p>
                    <p class="clear xq-addr">龙岗宝荷</p>
                  </div>
                  <div class="xq-price">
                    <em>35850</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=222">
            <a class="clear" href="/shenzhen/xq/detail/222.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="春华四季园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-07/02/41c9305c-83e4-4f6b-9331-a61ebe082616.jpg?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-07/02/41c9305c-83e4-4f6b-9331-a61ebe082616.jpg?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">春华四季园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2006年建成
                      塔板结合
                    </p>
                    <p class="clear xq-addr">龙华民治</p>
                  </div>
                  <div class="xq-price">
                    <em>60295</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=18">
            <a class="clear" href="/shenzhen/xq/detail/18.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="中海西岸华府"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-06/25/5e278be7-b9fa-4637-bb9d-49480bb662a6.jpg?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-06/25/5e278be7-b9fa-4637-bb9d-49480bb662a6.jpg?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">中海西岸华府</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2007年建成
                      板楼
                    </p>
                    <p class="clear xq-addr">宝安松岗</p>
                  </div>
                  <div class="xq-price">
                    <em>39113</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=15248">
            <a class="clear" href="/shenzhen/xq/detail/15248.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="远洋新干线"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-10/13/8019afdb-7c64-4970-b0ce-d177703242ef.jpg?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-10/13/8019afdb-7c64-4970-b0ce-d177703242ef.jpg?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">远洋新干线</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2014年建成
                      塔板结合
                    </p>
                    <p class="clear xq-addr">龙岗龙岗中心城</p>
                  </div>
                  <div class="xq-price">
                    <em>35483</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=9575">
            <a class="clear" href="/shenzhen/xq/detail/9575.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="中海康城花园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-11/05/df466a47-ced0-45f4-b44c-a72310c5a372.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-11/05/df466a47-ced0-45f4-b44c-a72310c5a372.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">中海康城花园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2009年建成
                      塔楼
                    </p>
                    <p class="clear xq-addr">龙岗大运</p>
                  </div>
                  <div class="xq-price">
                    <em>44078</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=54">
            <a class="clear" href="/shenzhen/xq/detail/54.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="万象天成"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-10/13/80ce75e6-9000-4d6a-96e6-b32b119fa467.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-10/13/80ce75e6-9000-4d6a-96e6-b32b119fa467.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">万象天成</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2010年建成
                      板楼
                    </p>
                    <p class="clear xq-addr">龙岗龙岗中心城</p>
                  </div>
                  <div class="xq-price">
                    <em>32903</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=285">
            <a class="clear" href="/shenzhen/xq/detail/285.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="御峰园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2019-01/18/8a27b61e-bc52-4d24-8c65-bfac0ef0c567.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2019-01/18/8a27b61e-bc52-4d24-8c65-bfac0ef0c567.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">御峰园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2009年建成
                      塔板结合
                    </p>
                    <p class="clear xq-addr">龙岗平湖</p>
                  </div>
                  <div class="xq-price">
                    <em>42559</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="jjs_bd_log" log-evk="W36954368" log-evv="cityCode=000002,comId=9442">
            <a class="clear" href="/shenzhen/xq/detail/9442.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="中粮一品澜山花园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-10/31/07139953-dd27-4666-a66b-e5070e810cda.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-10/31/07139953-dd27-4666-a66b-e5070e810cda.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
                <div class="icons"></div>
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">中粮一品澜山花园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2013年建成
                      塔楼
                    </p>
                    <p class="clear xq-addr">坪山坑梓</p>
                  </div>
                  <div class="xq-price">
                    <em>29482</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/16.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="丽湖花园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-08/28/9a3ac7a4-1242-43ed-94a9-c24c6dff4559.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-08/28/9a3ac7a4-1242-43ed-94a9-c24c6dff4559.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">丽湖花园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      1993年建成
                      板楼
                    </p>
                    <p class="clear xq-addr">龙岗布吉</p>
                  </div>
                  <div class="xq-price">
                    <em>37945</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/8150.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="信义御城豪园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-08/29/7aed6197-4e3d-498d-866c-f0e6fefb5636.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-08/29/7aed6197-4e3d-498d-866c-f0e6fefb5636.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">信义御城豪园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2013年建成
                      塔板结合
                    </p>
                    <p class="clear xq-addr">龙岗横岗</p>
                  </div>
                  <div class="xq-price">
                    <em>45738</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/12.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="龙珠花园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-08/15/088e6964-9ae3-44f9-b56b-86910aab6780.JPG?imageView2/2/w/210/h/160"
                  src="https://fang-community.leyoujia.com//pic/hsl/2018-08/15/088e6964-9ae3-44f9-b56b-86910aab6780.JPG?imageView2/2/w/210/h/160"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                  style="display: block;"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">龙珠花园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      1996年建成
                      板楼
                    </p>
                    <p class="clear xq-addr">龙岗布吉</p>
                  </div>
                  <div class="xq-price">
                    <em>37050</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/155602.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="金洪观荟一期"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-08/16/b15e853a-2852-4fdb-ab36-3e5055ebd851.JPG?imageView2/2/w/210/h/160"
                  src="https://alicdn.leyoujia.com/wap/images/house_default.png"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">金洪观荟一期</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2015年建成
                      板楼
                    </p>
                    <p class="clear xq-addr">龙华观澜</p>
                  </div>
                  <div class="xq-price">
                    <em>39665</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/786.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="缤纷世纪公寓"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-07/27/8b20487f-35a6-4feb-8008-f03e30b7e940.jpg?imageView2/2/w/210/h/160"
                  src="https://alicdn.leyoujia.com/wap/images/house_default.png"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">缤纷世纪公寓</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2012年建成
                      塔楼
                    </p>
                    <p class="clear xq-addr">龙岗龙岗中心城</p>
                  </div>
                  <div class="xq-price">
                    <em>31860</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/17.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="国展苑"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-08/16/2508dfd7-f431-439b-9fc5-3bf99db60965.JPG?imageView2/2/w/210/h/160"
                  src="https://alicdn.leyoujia.com/wap/images/house_default.png"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">国展苑</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      1997年建成
                      板楼
                    </p>
                    <p class="clear xq-addr">龙岗布吉</p>
                  </div>
                  <div class="xq-price">
                    <em>36765</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/15567.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="润创兴时代公寓"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-08/18/0c10b074-0308-4126-b8f0-c3fb71c94fd2.JPG?imageView2/2/w/210/h/160"
                  src="https://alicdn.leyoujia.com/wap/images/house_default.png"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">润创兴时代公寓</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2014年建成
                      塔楼
                    </p>
                    <p class="clear xq-addr">龙岗坂田</p>
                  </div>
                  <div class="xq-price">
                    <em>44427</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/40911.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="金地龙城中央"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2019-01/14/76d483de-4273-4cdf-9c29-cdfe0cb5cda0.JPG?imageView2/2/w/210/h/160"
                  src="https://alicdn.leyoujia.com/wap/images/house_default.png"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">金地龙城中央</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2014年建成
                      塔板结合
                    </p>
                    <p class="clear xq-addr">龙岗龙岗中心城</p>
                  </div>
                  <div class="xq-price">
                    <em>37350</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class>
            <a class="clear" href="/shenzhen/xq/detail/183.html">
              <div class="fl housing-img">
                <img
                  class="lazy-load"
                  alt="潜龙鑫茂花园"
                  data-original="https://fang-community.leyoujia.com//pic/hsl/2018-08/18/c9ab1222-59ff-4e19-8139-04acafa00101.jpg?imageView2/2/w/210/h/160"
                  src="https://alicdn.leyoujia.com/wap/images/house_default.png"
                  onerror="this.src='https://alicdn.leyoujia.com/wap/images/house_default.png'"
                >
              </div>
              <div class="housing-info">
                <p class="detail-title xq-title">潜龙鑫茂花园</p>
                <div class="flex-row">
                  <div class="flex-1">
                    <p class="clear xq-years">
                      2006年建成
                      板楼
                    </p>
                    <p class="clear xq-addr">龙华梅林关</p>
                  </div>
                  <div class="xq-price">
                    <em>56051</em>元/m²
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
    <div class="mask" :style="{ display: showFliter ? 'block' : 'none' }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import API from '@/api/http';

@Component
export default class LoupanList extends Vue {
  @Provide() isFocusSearch: boolean = false;
  @Provide() loupanList: any[] = [];
  @Provide() cityCode: string = '000002';
  @Provide() areaList: any[] = [];
  @Provide() placeList: any[] = [];
  @Provide() isShowPlaceFilter: boolean = false;
  @Provide() selectedAreaCode: string = '';
  @Provide() selectedPlaceCode: string = '';
  @Provide() selectedAreaFilter: any = {};
  @Provide() selectedPriceFilter: any = {};
  @Provide() selectedOtherFilter: any = {
    perfectionDegree: '',
    tags: ''
  };
  @Provide() selectedSortFilter: any = {
    value: '',
    text: ''
  };
  @Provide() showFliter: string = '';

  @Watch('showFliter')
  onIsShowAreaFilterChange(val: string) {
    this.toggleDocScroll(!!val);
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

  async initLoupan() {
    const res = await API.post('/jjrplus/community/queryDicList', {
      data: { pageNo: 1, pageSize: 10, searchCity: this.cityCode }
    });
    this.loupanList = res.data.loupanList;
  }

  async initArea() {
    const res = await API.post('/jjrplus/city/queryCityList', {
      data: { cityCode: this.cityCode }
    });
    this.areaList = res.data.areaList;
  }

  async getArearLevel3(code: string) {
    const res = await API.get('common/querySubPlace?areaCode=' + code);
    this.placeList = res.data.placeList;
  }

  toggleDocScroll(isScroll: boolean) {
    document.documentElement.classList.toggle('noscroll', isScroll);
  }

  onClickAreaTrigger() {
    this.showFliter = this.showFliter === 'areaFilter' ? '' : 'areaFilter';
    // this.isShowAreaFilter = !this.isShowAreaFilter;
    this.isShowPlaceFilter = this.selectedPlaceCode === '' ? false : true;
  }

  onSelectArea(e: any) {
    const code = e.target.getAttribute('code');
    if (code === '') {
      this.isShowPlaceFilter = false;
      this.showFliter = '';
      this.selectedAreaCode = this.selectedPlaceCode = '';
      this.selectedAreaFilter = {};
      return;
    }
    this.getArearLevel3(code);
    this.selectedAreaCode = code;
    this.isShowPlaceFilter = true;
  }

  onSelectPlace(e: any) {
    const index = e.target.getAttribute('data-index');
    this.showFliter = '';
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
    this.showFliter = '';
  }

  onResetOtherFilter() {
    this.selectedOtherFilter = {
      perfectionDegree: '',
      tags: ''
    };
  }

  onClickOtherFilterConfirm() {
    this.showFliter = '';
  }

  onSelectSortType(e: any) {
    this.selectedSortFilter.value = e.target.getAttribute('data-value');
    this.selectedSortFilter.text = e.target.textContent;
    this.showFliter = '';
  }

  mounted() {
    this.initArea();
    this.initLoupan();
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
