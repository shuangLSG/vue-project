<template>
 <div class="home-container">
  <swiper  height="2.2rem" dots-class="custom-bottom" dots-position="center">
     <swiper-item v-for="(swiper,i) in topHQData" :key="i" class="swiper-slide">
        <section v-for="(item,index) in swiper" :key="index" class="swiper-item" @click="goOrder(item.code)">
          <section :class="item.diff_rate<0?'font_red':'font_success'">
              <img class="arrow" src="http://web.bfy100.com/web/public/images/wyb/icon/zf.png">
              <span>{{item.nowPrice}}</span>
          </section>
          <span :class="item.diff_rate<0?'font_red':'font_success'">{{item.diff_money}} {{item.diff_rate}}%</span>
          <span>{{item.name}}</span>
        </section>
     </swiper-item>
  </swiper>
    
  <foot-guide></foot-guide>
 </div>
</template>

<script>
import { Swiper, SwiperItem } from "vux";
import footGuide from "@/components/footer/footGuide";
import { hangqing, getBanner } from "@/service/getData.js";

export default {
  name: "home",
  data() {
    return {
      topHQData: [],
      bannerData: []
    };
  },
  mounted() {
    this.initData();
  },
  components: {
    footGuide,
    Swiper,
    SwiperItem
  },
  methods: {
    async initData() {
      var topHQ = await hangqing("SC0,RB0,J0,AU0,AG0,CU0");
      this.topHQData = this.fromatTopData(topHQ);
      this.bannerData = await getBanner();
    },
    fromatTopData(data) {
      var result = [];
      for (let i = 0; i < data.length; i += 3) {
        result.push(data.slice(i, i + 3));
      }
      return result;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin";
.home-container {
  .cl();
  background: url(../../assets/background_@2x.png) no-repeat center;
  background-size: 100%;
  .swiper-slide {
    display: flex;
    justify-content: space-around;
    .swiper-item {
      [class^="font_"] span{
        display: inline-block;
        .font(0.58rem,1);
        
      }
      .sc(0.36rem,#fff);
      text-align: center;
      span {
        display: block;
      }
    }
  }
}
</style>
