<template>
  <div>
    <tabbar>
      <tabbar-item selected link="/home">
        <img slot="icon" class="icon-sprite-hq" src="../../assets/icon/hangqing_@2x.png">
        <img slot="icon-active" class="icon-sprite-hq" src="../../assets/icon/dhangqing_@2x.png">
        <span slot="label">行情</span>
      </tabbar-item>
      <tabbar-item >
        <img slot="icon" class="icon-sprite-hq" src="../../assets/icon/zhibo_@2x.png">
        <img slot="icon-active" class="icon-sprite-hq" src="../../assets/icon/dzhibo_@2x.png">
        <span slot="label">直播</span>
      </tabbar-item>
      <tabbar-item >
        <img slot="icon" class="icon-sprite-hq" src="../../assets/icon/jiaoyi_@2x.png">
        <img slot="icon-active" class="icon-sprite-hq" src="../../assets/icon/djiaoyi_@2x.png">        
        <span slot="label">交易</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" class="icon-sprite-hq" src="../../assets/icon/zichan_@2x.png">
        <img slot="icon-active" class="icon-sprite-hq" src="../../assets/icon/dzichan_@2x.png">        
        <span slot="label">资产</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
.weui-tabbar {
  background-color: #fff !important;
  .weui-bar__item_on .weui-tabbar__label {
    color: @red !important;
  }
}
</style>