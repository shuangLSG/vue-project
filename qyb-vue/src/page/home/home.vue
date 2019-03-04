<template>
 <div class="home-container">
   <!-- 顶部商品展示 -->
  <div class="top-swiper">
    <swiper  height="2.8rem" dots-class="ctm-swiper-indicator" dots-position="center">
     <swiper-item v-for="(swiper,i) in topHQData" :key="i" class="swiper-slide">
        <router-link :to="{path:'/market',query:{code:item.code}}" v-for="(item,index) in swiper" :key="index" class="swiper-item">
          <section :class="fontStyle(item.diff_rate)">
              <img v-if="item.diff_rate>0" class="arrow" src="../../../static/img/icon/zf.png">
              <img v-else class="arrow" src="../../../static/img/icon/df.png">
              <span>{{item.nowPrice}}</span>
          </section>
          <span :class="fontStyle(item.diff_rate)">{{item.diff_money}}  {{item.diff_rate}}%</span>
          <span>{{item.name}}</span>
        </router-link>
     </swiper-item>
    </swiper>
  </div>
  <div class="middle-swiper">
    <swiper :list="bannerData" height="2.4rem" dots-class="" dots-position="center"></swiper>
  </div>
  <!-- 热门交易品种 -->
  <div class="hot-goods">
    <group-title>热门交易品种</group-title>
    <grid :cols="3" :show-lr-borders="false">
      <grid-item v-for="(item,i) in hotHQData" :key="i" @on-item-click="goMarket(item.code)">
          <span>{{item.name}}</span>
          <span :class="fontStyle(item.diff_rate)">{{item.nowPrice}}</span>
          <span :class="fontStyle(item.diff_rate)">{{item.diff_money}}  {{item.diff_rate}}%</span>
      </grid-item>
    </grid>
  </div>
  <!-- 商品涨幅榜  -->
  <div class="zf-goods">
    <group label-width="5em">
      <group-title slot="title">商品涨幅榜 
        <router-link :to="'/incereseList'"><span class="link"></span></router-link>
      </group-title>
      <cell v-for="(item,i) in zfData" :key="i"  @click.native="goMarket(item.code)" title="default" primary="content">
        <div slot="title" class="flex-v">
          <span>{{item.name}}</span>
          <span class="font-gray">{{item.code}}</span>
        </div>
        <div class="ctm-ft-content">
          <span>{{item.nowPrice}}</span>
          <span :class="fontStyle(item.diff_rate)">{{item.diff_rate}}%</span>
        </div>
      </cell>
   </group>
  </div>
  <foot-guide></foot-guide>
 </div>
</template>

<script>
import { imgBaseUrl } from "../../config/env";
import {
  Swiper,
  SwiperItem,
  Grid,
  GridItem,
  GroupTitle,
  Group,
  Cell 
} from "vux";
import footGuide from "../../components/footer/footGuide";
import { hangqing, getBanner, getZF } from "../../service/getData.js";
import { clearInterval, setInterval } from "timers";

export default {
  name: "home",
  data() {
    return {
      topHQData: [],
      bannerData: [],
      hotHQData: [],
      zfData: [],
      timer:null,
      imgBaseUrl
    };
  },
  mounted() {
    this.initData();
    this.getBannerData();

    // this.$nextTick(function() {
    //   var _this = this;
    //   this.timer = setInterval(function() {
    //     _this.initData();
    //   }, 1000);
    // });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    footGuide,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    Group,
    Cell
  },
  computed: {
    fontStyle() {
      return function(diff_rate) {
        return diff_rate == 0
          ? ""
          : diff_rate > 0 ? "font-red" : "font-success";
      };
    }
  },
  methods: {
    async initData() {
      // 顶部商品
      let topHQ = await hangqing("SC0,RB0,J0,AU0,AG0,CU0");
      this.topHQData = this.fromatTopData(topHQ.d);

      // 热门商品
      let hotmsg = await hangqing("ZC0,I0,AP0,MA0,RU0,TA0");
      this.hotHQData = hotmsg.d;

      let zfmsg = await getZF(8);
      this.zfData = zfmsg.d;
    },
    async getBannerData(){
      let msg = await getBanner();
      this.bannerData = msg.d.list;
    },
    fromatTopData(data) {
      var result = [];
      for (let i = 0; i < data.length; i += 3) {
        result.push(data.slice(i, i + 3));
      }
      return result;
    },
    goMarket(code) {
      this.$router.push({ path: "/market", query: { code: code } });
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
.home-container {
  .cl();
  padding-top: 0.8rem;
  background: url(../../../static/img/background_@2x.png) no-repeat center;
  background-size: 100%;
  .top-swiper {
    .swiper-slide {
      display: flex;
      justify-content: space-around;

      .swiper-item {
        .sc(0.36rem,#fff);
        .text-center();
        section {
          padding: 0.1rem 0;
          span {
            .font-number(0.58rem,1);
          }
        }
        img {
          width: 0.3rem;
          height: auto;
          vertical-align: middle;
          margin-top: -0.14rem;
          margin-right: -0.1rem;
        }
        > span {
          display: block;
          .font-number(0.36rem,1.5);
        }
      }
    }
  }
  .top-swiper .vux-icon-dot {
    width: 0.3rem !important;
    height: 0.05rem !important;
  }
  .middle-swiper .vux-img {
    width: 86% !important;
    height: 86% !important;
    background-size: 100% !important;
    margin: auto;
  }
  .zf-goods,
  .hot-goods {
    width: 8.98rem;
    padding-bottom: 0.4rem;
    background-color: #fff;
    border-radius: 0.2rem;
    margin: 0.4rem auto;
    overflow: hidden;
  }
  .hot-goods {
    .weui-cells__title {
      font-size: 0.3rem;
      margin-bottom: 0.3rem;
    }
    .weui-grids:before {
      border: none;
    }
    .weui-grid {
      .text-center();
      text-decoration: none;
      &:nth-child(-n + 3) {
        padding-top: 0;
        padding-bottom: 0.4rem;
      }
      &:nth-of-type(4),
      &:nth-of-type(5),
      &:nth-of-type(6) {
        padding-bottom: 0;
        padding-top: 0.4rem;
        &:after {
          border: none;
        }
      }
      span {
        .sc(0.42rem,#000);
      }
      span:nth-of-type(2) {
        display: block;
        .font-number(0.58rem,1.4);
      }
      span:last-child {
        .font-number(0.3rem,1);
      }
    }
  }
  .zf-goods {
    .link {
      padding: 0.2rem;
      .right-arrow-box(-0.1rem,0);
      &:after {
        .right-arrow();
      }
    }
    .weui-cells:before {
      border: none;
    }
    .flex-v {
      span:first-child {
        .sc(0.36rem,#000);
      }
      span:last-child {
        .sc(0.3rem,@gray);
      }
    }
    .ctm-ft-content {
      color: #000;
      .font-number(0.56rem,1);
      .flex-content-h(flex-end);
      span {
        display: inline-block;
        width: 45% !important;
      }
    }
  }
}
</style>
