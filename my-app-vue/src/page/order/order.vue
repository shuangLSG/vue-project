<template>
    <div class="bg-gray pull-screen">
        <div class="min-wrapper bg-white">
            <section class="order-detail">
                <section class="title">
                    {{hqData.name}}<span class="font-success triangle-down">3389</span>
                </section>
                <section class="order-content">
                    <card :header="{title:'选择策略本金规格'}">
                        <div slot="content" class="card-content flex-h ">
                            <x-button type="default" :class="{active:i==curIndex}" v-for="(item,i) in curGoods" :key="i" @click.native="selectSpec(i)" class="action-btn">{{item.price}}</x-button>
                        </div>
                    </card>
                    <card :header="{title:oneGood.name}">
                        <div slot="content" class="card-content">
                            <div class="card-bd font-gray text-center">
                                <span>{{oneGood.price}}</span>规格：元/手
                            </div>
                            <flexbox class="flex-box">
                                <flexbox-item class="text-center">
                                    <span>{{oneGood.priceFdyk}}</span>
                                    <span class="font-gray">波动盈亏(元/手)</span>
                                </flexbox-item>
                                <flexbox-item class="text-center">
                                    <span>{{oneGood.priceSxf}}</span>
                                    <span class="font-gray">策略服务费(元/手)</span>
                                </flexbox-item>
                            </flexbox>
                        </div>
                    </card>
                </section>
            </section>
            <section class="actions-wrapper">
                <div class="action flex-h">
                    <span class="action-label">类型</span>
                    <section class=" flex-h flex-1">
                        <x-button plain :type="type=='buy'?'warn':'default'"  @click.native="selectType('buy')" class="action-btn">策略买入</x-button>
                        <x-button plain :type="type=='sell'?'primary':'default'"  @click.native="selectType('sell')" class="action-btn">策略卖出</x-button>                
                    </section>
                </div>
                <div class="action flex-h">
                    <span class="action-label">手数</span>
                    <section>
                        <num-box :min='1' :max="10" :step="1"></num-box>
                    </section>
                    <p class="font-gray">最大可交易{{oneGood.maxStock}}手</p>
                </div>
                <div class="action flex-h">
                    <span class="action-label">止盈</span>
                    <section>
                        <num-box :data="stopprofit" setDefault="无" unit="%"></num-box>
                    </section>
                    <p class="font-gray">范围{{stopprofit[0]}}-{{stopprofit[stopprofit.length-1]}}%</p>
                </div>
                <div class="action flex-h">
                    <span class="action-label">止损</span>
                    <section>
                        <num-box :data="stoploss"></num-box>
                    </section>
                    <p class="font-gray">范围{{stoploss[0]}}-{{stoploss[stoploss.length-1]}}%</p>
                </div>
            </section>
        </div>
        <div class="mag-top-4 bg-white">
           <x-switch :title="`<span>使用免息券 <span>(剩余${couponData.length}张可用)</span></span>`" v-model="isUseCoupon" prevent-default @on-click="toCoupon"></x-switch>
        </div>
        <div class="tips">
            <check-icon :value.sync="isAgree"></check-icon>
            我已阅读协议并同意相关合同条款 查看 <span class="font-blue">《策略交易协议》</span>
        </div>
    </div>
</template>

<script>
import { Card, XButton, Flexbox, FlexboxItem, Cell, XSwitch,CheckIcon } from "vux";
import NumBox from "../../components/common/NumBox";
import {
  hangqing,
  getGoodsList,
  getCouponList
} from "../../service/getData.js";
export default {
  data() {
    return {
      code: null,
      type: null, //买入、卖出
      hqData: [],
      couponData: [],
      curGoods: [],
      oneGood: [],
      stopprofit: [], // 页面一开始异步oneGood还没有值
      stoploss: [],
      curIndex: 0,
      isUseCoupon: false,
      isAgree:true
    };
  },
  components: {
    Cell,
    Card,
    CheckIcon,
    XSwitch,
    NumBox,
    XButton,
    Flexbox,
    FlexboxItem
  },
  beforeMount() {
    this.code = this.$route.query.code;
    this.type = this.$route.query.type;
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let hqmsg = await hangqing(this.code);
      this.hqData = hqmsg.d[0];

      let couponmsg = await getCouponList();
      this.couponData = couponmsg.d;

      let glmsg = await getGoodsList();
      this.curGoods = glmsg.d[this.code];
      this.oneGood = this.curGoods[this.curIndex];

      this.stoploss = this.oneGood.stoploss;
      this.stopprofit = this.oneGood.stopprofit;
    },
    selectSpec(index) {
      this.curIndex = index;
      this.oneGood = this.curGoods[index];
    },
    selectType(type) {
      this.type = type;
    },
    toCoupon() {
    //   if (this.isUseCoupon) {
    //     this.$router.push({ path: "/coupon" });
    //   }
    }
  }
};
</script>
<style lang="less">
@import "../../style/mixin";
@import "./order";
</style>
