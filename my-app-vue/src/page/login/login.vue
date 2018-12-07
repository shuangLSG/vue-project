<template>
    <div class="login-container">
        <section class="form-box">
            <x-input placeholder="请输入手机号" v-model="accounts" @on-change="change"> 
                <img slot="label" src="../../../static/img/icon/grzxsj_@2x.png">
            </x-input>
            <x-input placeholder="请输入密码" v-model="password" @on-change="change">
                <img slot="label" src="../../../static/img/icon/grzxmm_@2x.png">
            </x-input>
        </section>
        <section class="btn">
            <x-button type="primary" :disabled="disabled" :show-clear="true" @click.native="toLogin" class="weui-btn">登录</x-button>
        </section>
        <section class="link-forgetPSW tips">
            <router-link to="/setPwd">忘记密码？</router-link>
            <router-link to="/register" class="fr">注册</router-link>
        </section>
    </div>
</template>

<script>
import { XInput, XButton } from "vux";
import {mapState,mapMutations} from 'vuex';
import { login } from "../../../src/service/getData";
export default {
  data() {
    return {
      disabled: true,
      accounts: "",
      password: ""
    };
  },  
  components: {
    XInput,
    XButton
  },
  methods: {
    ...mapMutations(['RECORD_USERINFO']),
    async toLogin() {
      let msg = await login(this.accounts, this.password);
      //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
      if (msg.s == 200) {
        this.RECORD_USERINFO(msg.d);
        this.$router.go(-1); 
      } else {
        this.$vux.toast.text(msg.d);
      }
    },
    change() {
      if (this.accounts && this.password) {
        this.disabled = false;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
@import "../../style/weui/weui";
.login-container {
  padding: 0.2rem 0.4rem;
}
.form-box {
  .vux-x-input {
    padding: 0.3rem 0;
    margin-bottom: 0.18rem;
    border-bottom: 1px solid #f5f5f5;
    &:before {
      border: none;
      height: 0;
    }
    img {
      width: 0.34rem;
      vertical-align: middle;
      margin-right: 0.3rem;
      margin-bottom: 0.1rem;
    }
    :-ms-input-placeholder {
      .sc(0.38rem,@gray);
    }
    input {
      font-size: 0.38rem;
      height: 0.9rem;
    }
  }
}
.btn {
  margin-top: 1.1rem;
  margin-bottom: 0.2rem;
  button {
    height: 1.2rem;
    font-size: 0.44rem;
  }
}
.tips {
  padding: 0.2rem;
  .sc(0.38rem,#000);
}
</style>
