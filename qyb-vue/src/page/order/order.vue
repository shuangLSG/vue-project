<template>
    <div class="bg-gray pull-screen">
        <div class="min-wrapper bg-white">
            <section class="order-detail">
                <section class="title">
                    {{hqData.name}}<span :class="'curQHStyle'">{{hqData.nowPrice}}</span>
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
                        <num-box :min='1' :max="10" :step="1" @on-change="changeStock" v-model="curStock"></num-box>
                    </section>
                    <p class="font-gray">最大可交易{{oneGood.maxStock}}手</p>
                </div>
                <div class="action flex-h">
                    <span class="action-label">止盈</span>
                    <section>
                        <num-box :data="stopprofit" setDefault="无" unit="%" @on-change="changeStopProfit" v-model="curStopProfit"></num-box>
                    </section>
                    <p class="font-gray">范围{{stopprofit[0]}}-{{stopprofit[stopprofit.length-1]}}%</p>
                </div>
                <div class="action flex-h">
                    <span class="action-label">止损</span>
                    <section>
                        <num-box :data="stoploss" @on-change="changeStopLoss" v-model="curStopLoss"></num-box>
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

        <tabbar class="bg-white">
            <div class="total-box">
                <span class="font-light-red">{{total}}</span>
                <span class="font-gray">(含策略服务费{{totalSxf}})</span> 
            </div>
            <x-button type="warn"  @click.native="create()" class="action-btn fr">确认建仓</x-button>                
        </tabbar>
    </div>
</template>

<script>
import {
  Card,
  XButton,
  Flexbox,
  FlexboxItem,
  Cell,
  XSwitch,
  CheckIcon,
  Tabbar
} from "vux";
import NumBox from "../../components/common/NumBox";
import {
  hangqing,
  getGoodsList,
  getCouponList,
  createTrade
} from "../../service/getData.js";
import { mapState, mapMutations } from "vuex";
import { clearInterval, setInterval } from "timers";

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
      curIndex: 0, //某种规格的索引
      isUseCoupon: false,
      isAgree: true,
      timer: null,

      prevPrice: null, //页面初始化，使用昨收价作为参考，之后使用当前价作参考
      total: 0, //总金额
      totalSxf: 0, //总手续费
      curStock: 1, // 当前手数
      couponPrice: 0, //优惠券金额
      curStopLoss: "无", // 当前止损
      curStopProfit: "无" //当前止盈
    };
  },
  components: {
    Cell,
    Card,
    Tabbar,
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

    this.$nextTick(function() {
      var _this = this;
      this.timer = setInterval(function() {
        _this.refreshData();
      }, 1000);
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    ...mapState(["coupon"]),
    curQHStyle(){
     let flag= this.prevPrice,
      curPrice = this.hqData.nowPrice;
       if (flag <= curPrice) {
            return 'font-red triangle-up';
        } else if (flag >= curPrice) {
            return 'font-success triangle-down';
        }
    }
  },
  methods: {
    ...mapMutations(["REMOVE_COUPON"]),
    async initData() {
      let hqmsg = await hangqing(this.code);
      this.hqData = hqmsg.d[0];
      this.prevPrice = this.hqData.yestodayClosePrice;

      let glmsg = await getGoodsList();
      this.curGoods = glmsg.d[this.code];
      this.oneGood = this.curGoods[this.curIndex];
      // 止盈、止损
      this.stoploss = this.oneGood.stoploss;
      this.stopprofit = this.oneGood.stopprofit;

      // 初始化当前总金额
      this.setTotal(this.curStock);

      let couponmsg = await getCouponList();
      this.couponData = couponmsg.d;
    },
    async refreshData() {
      let hqmsg = await hangqing(this.code);
      this.hqData = hqmsg.d[0];
      // this.prevPrice = this.hqData.nowPrice;
    },
    selectSpec(index) {
      this.curIndex = index;
      this.oneGood = this.curGoods[index];
    },
    selectType(type) {
      this.type = type;
    },
    toCoupon(newVal) {
      if (newVal) {
        this.$router.push({ path: "/coupon" });
      }
    },
    changeStock(val) {
      this.setTotal(val);
    },
    changeStopProfit(val) {
      this.curStopProfit = val;
    },
    changeStopLoss(val) {
      this.curStopLoss = val;
    },
    setTotal(handVal) {
      let sxf = 0,
        couponPrice = 0;
      if (this.coupon) {
        couponPrice = this.coupon.price;
      }
      //总策略服务费
      if (this.isUseCoupon && couponPrice) {
        sxf = this.oneGood.priceSxf * handVal - couponPrice;
        this.totalSxf = sxf > 0 ? sxf : 0;
      } else {
        this.totalSxf = this.oneGood.priceSxf * handVal;
      }
      this.total = this.oneGood.price * handVal + this.totalSxf; // 减去优惠券
    },
    async create() {
      let toprate =
          this.curStopProfit == "无" ? 0 : parseInt(this.curStopProfit) / 100,
        lowrate =
          this.curStopLoss == "无" ? 0 : parseInt(this.curStopLoss) / 100,
        flag = this.isUseCoupon ? 1 : 0,
        type = this.type == "buy" ? 1 : 2,
        couponids = this.coupon ? this.coupon.id : "";

      let msg = await createTrade(
        this.oneGood.id,
        this.curStock,
        type,
        toprate,
        lowrate,
        flag,
        couponids
      );
      if (msg.s == 200) {
        this.$vux.toast.text("正在建仓...", "bottom");
        this.REMOVE_COUPON();
        THIS.$router.push({ path: "/trade" });
      } else {
        this.$vux.toast.text(mag.d);
      }
    }
  },
  watch: {
    oneGood(newVal) {
      this.setTotal(this.curStock);
    },
    $route(to, from) {
      this.code = this.$route.query.code;
      this.type = this.$route.query.type;
    }
  }
};
</script>
<style lang="less">
@import "../../style/mixin";
@import "./order";
</style>
