<template>
    <div class="pull-screen">
        <div class="top-wrapper">
            <div class="title-box">
                <span class="name">{{curHQData.name}}</span>
                <p class="state">{{curHQData.isholiday == 0 ? '交易中':'休市中'}}{{curHQData.timeStamp}}</p>
            </div>

            <div class="price" :class="curHQData.diff_rate>0?'font-red':'font-success'">
                <span>{{curHQData.nowPrice}}</span>
                <img v-if="curHQData.diff_money>0" src="../../../static/img/icon/trader_up.png" alt=""/>
                <img v-else src="../../../static/img/icon/trader_down.png" alt=""/>
                <span> {{curHQData.diff_money}}&nbsp;&nbsp;{{curHQData.diff_rate}}% </span>
            </div>
            <span class="produce">商品介绍</span>
        </div>
        <div class="details">
            <ul class="clearfix">
                <li>最高<span>{{curHQData.todayMax}}</span></li>
                <li>最低<span>{{curHQData.todayMin}}</span></li>
                <li>昨收<span>{{curHQData.yestodayClosePrice}}</span></li>
                <li>今开<span>{{curHQData.openPrice}}</span></li>
                <li>持仓量<span>{{curHQData.holdNum}}</span></li>
                <li>成交量<span>{{curHQData.tradeNum}}</span></li>
                <li>振幅<span>{{curHQData.amplitude}}%</span></li>
                <li id="avg_data">均价<span>0</span></li>
            </ul>  
        </div>
        <div class="action-box flex-h">
            <x-button type="warn" @click.native="toOrder('buy')">策略买入</x-button>
            <x-button type="primary" @click.native="toOrder('sell')">策略卖出</x-button>
        </div>

          <div class="time-tabs bg-gray font-light-gray flex-h">
              <span v-for="(item,i) in echartsTab" :key="i" :class="{active:curIndex==i}" @click="changeEcharts(i)">{{item}}</span>
          </div>
          <div style="width: 97%;height: 40%;text-align: center;">

          </div>
          <div class="time-line font-light-gray flex-h">
              <span id="starttime">9:00</span>
              <span id="endtime">15:00</span>
          </div>
                       
          <div class="list-box flex-h">
              <section class="flex-1 flex-h">
                  <span>买一</span>
                  <span :class="curHQData.diff_rate>0?'font-red':'font-success'">{{curHQData.buy1_m}}</span>
                  <span class="font-gray">{{curHQData.buy1_n}}</span>
              </section>
              <section class="flex-1 flex-h">
                  <span>卖一</span>
                  <span :class="curHQData.diff_rate>0?'font-red':'font-success'">{{curHQData.sell1_m}}</span>
                  <span class="font-gray">{{curHQData.sell1_n}}</span>
              </section>
          </div>
    </div>
</template>


<script>
import { dateFormat, XButton } from "vux";
import { mapState } from "vuex";
import { hangqing } from "../../service/getData.js";
import { setInterval } from "timers";

export default {
  data() {
    return {
      code: null,
      curHQData: [],
      timer:null,
      curIndex: 0, // 当前echart显示索引
      echartsTab:['分时','60分','日k','周k','月k']
    };
  },
  beforeMount() {
    if (this.$route.query.code) {
      this.code = this.$route.query.code;
    }
  },
  mounted() {
    this.initData();
    this.$nextTick(function() {
      var _this = this;
      this.timer = setInterval(function() {
        _this.initData();
      }, 1000);
    });
  },
  // 退出该页面后清除定时器
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    ...mapState(["userInfo"])
  },
  filters: {
    dateFormat
  },
  components: {
    XButton
  },
  methods: {
    async initData() {
      let hqmsg = await hangqing(this.code);
      this.curHQData = hqmsg.d[0];
    },
    toOrder(type) {
      // 用户登录后判断当前是否为休市，交易中才能建仓
      if (this.userInfo) {
        if (!this.curHQData.isholiday) {
          this.$vux.toast.text("休市中...");
          return;
        }
        this.$router.push({
          path: "/order",
          query: { code: this.code, type: type }
        });
      } else {
        this.$router.push({ path: "/login", query: { page: "market" } });
      }
    },
    changeEcharts(index){
      this.curIndex = index;
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
@import "./index";
</style>



