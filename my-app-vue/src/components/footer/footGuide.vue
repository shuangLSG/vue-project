<template>
  <div>
    <tabbar>
      <tabbar-item selected link="/home">
        <img slot="icon" class="icon-sprite-hq" :src="iconData[0].src">
        <img slot="icon-active" class="icon-sprite-hq" :src="iconData[1].src">
        <span slot="label">行情</span>
      </tabbar-item>
      <tabbar-item >
        <img slot="icon" class="icon-sprite-hq" :src="iconData[2].src">
        <img slot="icon-active" class="icon-sprite-hq" :src="iconData[3].src">
        <span slot="label">直播</span>
      </tabbar-item>
      <tabbar-item link="/trade">
        <img slot="icon" class="icon-sprite-hq" :src="iconData[4].src">
        <img slot="icon-active" class="icon-sprite-hq" :src="iconData[5].src">        
        <span slot="label">交易</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" class="icon-sprite-hq" :src="iconData[6].src">
        <img slot="icon-active" class="icon-sprite-hq" :src="iconData[7].src">        
        <span slot="label">资产</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  data(){
    return{
      iconData:[
        {src:require('../../../static/img/icon/hangqing_@2x.png')},
        {src:require('../../../static/img/icon/dhangqing_@2x.png')},
        {src:require('../../../static/img/icon/zhibo_@2x.png')},
        {src:require('../../../static/img/icon/dzhibo_@2x.png')},
        {src:require('../../../static/img/icon/jiaoyi_@2x.png')},
        {src:require('../../../static/img/icon/djiaoyi_@2x.png')},
        {src:require('../../../static/img/icon/zichan_@2x.png')},
        {src:require('../../../static/img/icon/dzichan_@2x.png')}            
      ]
    }
  },
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