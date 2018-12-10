<template>
    <div class="trade-container full-screen ">
        <div class="top-box">
            <section v-if="login&&tradeList.length" class="havetrade top-content">
                <div class="money"><span class="font-red">{{totalPriceSxf}}</span></div>
                <p class="font-white">持仓盈亏总额</p>
            </section>
            <section v-else-if="login&&!tradeList.length" class="notrade top-content">
                <p class="font-white">当前暂无持仓</p>
            </section>
            <section v-else class="nologin top-content">
                <p class="font-white"><router-link to="/login" class="font-blue">立即登录</router-link>查看持仓 </p>
            </section>
        </div>


        
        <group title="持仓明细" class="position-wrapper bg-white">
            <!-- 有持仓数据 -->
            <ol v-if="login&&tradeList.length" class="lists-container">
                <li v-for="(item,index) in tradeList" :key="index" id="trade_1">
                    <div class="clearfix">
                        <div class="fl">
                            <badge :text="item.tradeType == 1 ? '买入' : '卖出'" :class="item.tradeType == 1 ? 'bg-success' : 'bg-red'"></badge>
                            <span> {{item.goodsName}} [<span>{{item.createStock}}手</span>]</span>
                            <p class="font-gray">{{item.tradeType == 1 ? '买入' : '卖出'}}时间：{{item.createTime}}</p>
                        </div>
                        <x-button mini :pain="item.status!=1" type="primary" class="fr" data-trade=" 原油1000桶,2手,策略买入,0" data-status="0">{{status(item)}}</x-button>
                    </div>
                    <div class="flex-h">
                        <div class="position-bd-item-box">
                            <div class="flex-h">
                                <div class="position-bd-item priceYk-hook">
                                    <p id="priceYk" :class="priceYKStyle(item)"><span>{{priceYk(item)}}</span>
                                    </p>
                                    <p class="font-gray">浮动盈亏</p>
                                </div>
                                <div class="position-bd-item">
                                    <p><span>{{createPrice(item)}}</span></p>
                                    <p class="font-gray">成本价</p>
                                </div>
                                <div class="position-bd-item">
                                    <p><span>{{item.totalPriceDg}}</span></p>
                                    <p class="font-gray">策略本金</p>
                                </div>
                            </div>
                        </div>
                        <div class="position-bd-item-box flex-1">
                            <div class="flex-h">
                                <div class="position-bd-right">
                                    <p class="font-gray">
                                        止盈  <span class="toprate">{{topRate(item)}}</span>
                                    </p>
                                    <p class="font-gray">
                                        止损  <span class="lowrate">--</span>
                                    </p>
                                </div>
                                <div class="position-bd-item position-icon" data-update="1,J0">
                                    <img src="../../../static/img/icon/setting.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
            <!-- 暂无持仓数据 -->
            <section v-else-if="login&&!tradeList.length" class="empty-box" style="">
                <img src="../../../static/img/empty.png" alt="">
                <p class="font-gray">当前暂无持仓</p>
            </section>
            <section v-else class="empty-box" style="">
                <img src="../../../static/img/empty.png" alt="">
                <p class="font-gray">当前尚未登录，立即
                    <router-link to="/login" class="font-blue">登录</router-link>
                </p>
            </section>
        </group>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import { Group, Badge, XButton } from "vux"
import { getTradeList } from "../../service/getData.js"
import footGuide from "../../components/footer/footGuide"
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
      tradeList: [
        {
          id: 1,
          status: 0,
          priceYk: 0,
          createPrice: 0,
          lowRate: 0.1,
          topRate: 0.2,

          znCount: 0,
          payType: 1,
          maxLowRate: 0.9,
          tradeType: 0,
          maxTopRate: 2,
          catalogId: 0,
          priceFdyk: 0,
          znPriceDay: 100,
          totalPriceSxf: 1200,
          znPriceTotal: 0,
          totalPriceDg: 12000,
          priceFdykMul: 10,
          catalogCode: "J0",
          validityType: 2,
          createStock: 2,
          catalogName: "焦炭",
          createTime: 1534319773517,
          userId: 16,
          goodsId: 273,
          agentId: 0,

          endPrice: 0,
          endType: 0,
          goodsName: " 原油1000桶",
          totalPriceDg: 123856
        },
        {
          id: 2,
          status: 1,
          znCount: 0,
          payType: 1,
          maxLowRate: 0.9,
          tradeType: 1,
          maxTopRate: 2,
          catalogId: 0,
          priceFdyk: 100,
          znPriceDay: 100,
          totalPriceSxf: 1200,
          znPriceTotal: 0,
          createPrice: 2490,
          totalPriceDg: 12000,
          priceFdykMul: 10,
          catalogCode: "J0",
          validityType: 2,
          createStock: 2,
          catalogName: "焦炭",
          createTime: 1534319773517,
          userId: 16,
          goodsId: 273,
          agentId: 0,
          priceYk: 100,
          lowRate: 0.1,
          endPrice: 0,
          endType: 0,
          goodsName: " 原油1000桶",
          topRate: 0.2,
          totalPriceDg: 123856
        },
        {
          id: 3,
          status: 2,
          znCount: 0,
          payType: 1,
          maxLowRate: 0.9,
          tradeType: 1,
          maxTopRate: 2,
          catalogId: 0,
          priceFdyk: 100,
          znPriceDay: 100,
          totalPriceSxf: 1200,
          znPriceTotal: 0,
          createPrice: 2490,
          totalPriceDg: 12000,
          priceFdykMul: 10,
          catalogCode: "J0",
          validityType: 2,
          createStock: 2,
          catalogName: "焦炭",
          createTime: 1534319773517,
          userId: 16,
          goodsId: 273,
          agentId: 0,
          priceYk: -110000,
          lowRate: 0.2,
          endPrice: 0,
          endType: 0,
          goodsName: " 原油1000桶",
          topRate: 1.2,
          totalPriceDg: 123856
        }
      ]
    };
  },
  mounted() {
    this.initData();
  },
  filter:{
     
  },
  computed: {
    ...mapState(["login"]),
    createPrice() {
      return function(item) {
        return item.status == 0
          ? "--"
          : item.createPrice == 0 ? "0" : item.createPrice;
      };
    },
    priceYk() {
      return function(item) {
        return item.status == 0 ? "--" : item.priceYk;
      };
    },
    topRate() {
      return function(item) {
        return item.status == 0
          ? "--"
          : item.topRate == 0 ? "--" : parseInt(item.topRate * 100) + "%";
      };
    },
    lowRate() {
      return function(item) {
        return item.status == 0
          ? "--"
          : item.lowRate == 0 ? "--" : parseInt(item.lowRate * 100) + "%";
      };
    },
    status() {
      return function(item) {
        let status = "";
        if (item.status == 0) {
          status = "建仓中";
        } else if (item.status == 1) {
          status = "平仓";
        } else if (item.status == 2) {
          status = "平仓中";
        }
        return status;
      };
    },
    totalPriceSxf() {
      var total = 0;
      this.tradeList.forEach(item => {
        total += item.priceYk;
      });
      console.log(total)
      return total > 0 ? (total == 0 ? 0 : "+" + total) : total;
    },
    priceYKStyle(){
        return function(item) {
            let fontStyle = item.priceYk < 0 ? "font-success" : "font-red";
            return item.status == 0 ? '' : item.priceYk == 0 ? '' : fontStyle;          
        }
    }
  },
  components: {
    Badge,
    Group,
    XButton,
    footGuide
  },
  methods: {
    async initData() {
      let msg = await getTradeList();
      if (msg.s == 200) {
        this.tradeList = mag.d;
      } else {
        this.login = false;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
@import "./trade";
</style>
