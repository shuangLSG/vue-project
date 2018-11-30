<template>
 <div class="home-container">
  <swiper :list="topHQData" auto  height="2.2rem" dots-class="custom-bottom" dots-position="center">
     <swiper-item class="black">
       <section>
         <ul class="pull-right">
            <li class="font-red ">
                <img class="arrow" src="http://web.bfy100.com/web/public/images/wyb/icon/zf.png">
                <span>418.1</span>
            </li>
            <li class="font-red">0.9 0.22%</li>
            <li>原油</li>
        </ul>
       </section>
     </swiper-item>
  </swiper>
    
  <foot-guide></foot-guide>
 </div>
</template>

<script>
import { Swiper, SwiperItem } from "vux";
import footGuide from "@/components/footer/footGuide";
import { hangqing,getBanner } from "@/service/getData.js";

export default {
  name: "home",
  data() {
    return {
      topHQData: [],
      bannerData:[]
    };
  },
  mounted(){
    this.initData();
  },
  components: {
    footGuide,
    Swiper,
    SwiperItem
  },
  methods: {
    async initData() {
      // this.topHQData = await hangqing("SC0,RB0,J0,AU0,AG0,CU0");
      this.bannerData = await getBanner();
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
}
</style>
