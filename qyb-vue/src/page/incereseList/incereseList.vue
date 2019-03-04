<template>
    <div>
        <group label-width="5em" class="sort-box">
            <cell title="default" primary="content">
                <span slot="title"> 期货名称</span>
                <div class="ctm-ft-content">
                    <span class="sort-item" href="javascript:;" @click="setSort(nowPrice,'nowPrice')">
                        <span :class="{active:sort =='nowPrice'}">当前价<img :src="iconStyle(nowPrice.type,'nowPrice')" alt=""></span>
                    </span>
                    <span class="sort-item" href="javascript:;" @click="setSort(diffRate,'diff_rate')">
                        <span :class="{active:sort =='diff_rate'}">涨跌幅<img :src="iconStyle(diffRate.type,'diff_rate')" alt=""></span>
                    </span>
                </div>
            </cell>
        </group>
        <group label-width="5em" class="zf-goods">
            <cell v-for="(item,i) in zfData" :key="i" :link="{path:'/market',query:{code:item.code}}" title="default" primary="content">
                <div slot="title" class="flex-v">
                    <span>{{item.name}}</span>
                    <span class="font-gray">{{item.code}}</span>
                </div>
                <div class="ctm-ft-content">
                    <span>{{item.nowPrice}}</span>
                    <span :class="fontStyle(item.diff_rate)">{{item.diff_rate}}%</span>
                </div>
            </cell>
        </group>
    </div>
</template>


<script>
import { Group, Cell } from "vux";
import { getZF } from "../../service/getData.js";
import { clearInterval, setInterval } from "timers";
export default {
  data() {
    return {
     
      zfData: null,
      nowPrice: {
        id: 1,
        type: "none"
      },
      diffRate: {
        id: 2,
        type: "down"
      },
      sort: "diff_rate", // 当前排序方式
      iconData: [
        {
          type: "none",
          src: require("../../../static/img/icon/quote_none_icon.png")
        },
        {
          type: "up",
          src: require("../../../static/img/icon/quote_up_icon.png")
        },
        {
          type: "down",
          src: require("../../../static/img/icon/quote_down_icon.png")
        }
      ],
      timer: null
    };
  },
  components: {
    Group,
    Cell
  },
  computed: {
    fontStyle() {
      return function(diff_rate) {
        return diff_rate == 0
          ? ""
          : diff_rate > 0 ? "font-red" : "font-success";
      };
    },
    iconStyle() {
      /**
       * @param type 图片样式
       * @param sort 当前以什么来排序
       */
      return function(type, sort) {
        // 返回一个数组
        let _this = this;
        var icon = this.iconData.filter(function(item) {
          return Object.keys(item).some(function(key) {
            return item[key] == type && sort == _this.sort;
          });
        });
        return icon.length ? icon[0].src : this.iconData[0].src; // 后面是页面初始化后，价格筛选的图标显示 none
      };
    }
  },
  mounted() {
    this.initData();

    this.$nextTick(function() {
      var _this = this;
      this.timer = setInterval(function() {
        _this.sortFn();
      }, 1000);
    });
  },
  // 退出该页面后清除定时器
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    async initData() {
      let msg = await getZF(0);
      this.zfData = msg.d;
    },

    setSort(data, sort) {
      // 若当前点击的排序方式 与先前不同，则修改排序方式
      if (sort != this.sort) {
        this.sort = sort;
      }
      if (data.type == "up") {
        data.type = "down";
      } else {
        data.type = "up";
      }

      this.sortFn();
    },

    async sortFn() {
      var msg = await getZF(0);
      var data = msg.d;
      // 根据排序方向（从大到小、从小到大）
      var direction = null;
      const sort = this.sort;
      if (sort == "nowPrice") {
        direction = this.nowPrice.type;
      } else {
        direction = this.diffRate.type;
      }
      this.zfData = data.sort(function(a, b) {
        if (direction == "down") {
          return b[sort] - a[sort];
        } else {
          return a[sort] - b[sort];
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
.weui-cells {
  margin-top: 0 !important;
}
.weui-cells:before,
.weui-cells:after {
  border: none;
  height: 0;
}
.ctm-ft-content {
  color: #000;
  .flex-content-h(flex-end);
  span {
    display: inline-block;
    width: 45% !important;
  }
}
.sort-box {
  .weui-cells {
    background-color: #f5f5f5;
    font-size: 0.34rem;
    .sort-item span.active {
      color: @blue;
    }
    img {
      margin-top: -0.06rem;
      margin-left: 0.1rem;
      width: 0.17rem;
      vertical-align: middle;
    }
  }
}
.zf-goods {
  .weui-cell_access .weui-cell__ft:after{
    display: none;
  }
  .flex-v {
    span:first-child {
      .sc(0.36rem,#000);
    }
    span:last-child {
      .sc(0.3rem,@gray);
    }
  }
  .ctm-ft-content {
    .font-number(0.56rem,1);
    .flex-content-h(flex-end);
  }
}
</style>
