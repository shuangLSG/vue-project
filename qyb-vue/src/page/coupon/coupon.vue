<template>
    <div>
        <section v-if="couponData.length">
            优惠券
        </section>
        <section v-else class="empty-box">
            <img src="../../../static/img/tisj.png"/>
            <p class="font-gray">当前暂无可使用的免息券</p>
        </section>

        <p class="font-blue action-ele" @click="showDialog=true">查看免息券规则</p>


        <div v-transfer-dom>
            <x-dialog v-model="showDialog" hide-on-blur :dialog-style="{width: '83%', 'background-color': '#fff'}">
                <div class="mui-popup-inner " @click="showDialog = false">
                    <div class="mui-popup-title text-center">
                        免息券使用规则
                    </div>
                    <div class="mui-popup-text">
                        <p>免息券可直接抵扣手续费，不足抵扣的部分将用现金补足差额；<br>
                            免息券使用采取用户自由选择的原则进行；<br>
                            单张免息券仅可使用一次，建仓成功后失效；<br>
                            使用免息券后盈利可提现，不可直接用券提现。
                        </p>
                    </div>
                </div>
            </x-dialog>
        </div>
    </div>
</template>

<script>
import { XDialog, TransferDomDirective as TransferDom } from "vux";
import { mapState, mapMutations } from "vuex";
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  mounted() {
    this.initData();
  },
  computed: {
    ...mapState(["coupon"])
  },
  data() {
    return {
      showDialog: false,
      couponData: []
    };
  },
  methods: {
    ...mapMutations(["SAVE_COUPON"]),
    async initData() {
      let couponmsg = await getCouponList();
      this.couponData = couponmsg.d;
    }
  }
};
</script>
<style lang="less">
@import "../../style/mixin";
.mui-popup-title {
  font-size: 0.42rem;
  font-weight: 500;
  padding: 0.2rem;
  border: 1px solid #ddd;
}
.mui-popup-title + .mui-popup-text {
  padding: 0.3rem;
  text-align: left;
  p {
    .sc(0.38rem,@gray);
  }
}

.empty-box {
  img {
    width: 6.46rem;
  }
  p {
    font-size: 0.46rem;
  }
}
.action-ele {
  text-align: right;
  padding: 0.4rem 0.8rem;
}
</style>
