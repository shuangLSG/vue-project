<template>
    <div class="mui-numbox am-radius">
        <x-button mini plain
        class="mui-numbox-btn-minus"
        type="default" 
        :disabled="disabledReduce" 
        :class="classes" 
        @click.native="reduceFn"
        ref="reduce"
        >-</x-button>

        <input 
        :type="inputType" 
        :style="inputStyle" 
        v-model="currentValue">

        <x-button mini plain
        type="default" 
        class="mui-numbox-btn-plus"
        :disabled="disabledAdd" 
        :class="classes"
        @click.native="addFn"
        ref="add"
        >+</x-button>
    </div>
</template>

<script>
/**
 *  <num-box min='1' max='10' step='1'></num-box>
 *  <num-box :data="Array" setDefault="无"></num-box>
 *  <num-box :data="Array" :setDefault="200"></num-box>
 *  <num-box :data="Array" :setDefault="200" unit="%"></num-box>
 */
import { XButton, XInput } from "vux";
export default {
  data() {
    return {
      inputType: "text",
      currentValue: "",
      disabledAdd: false,
      disabledReduce: false
    };
  },
  props: {
    min: Number,
    max: Number,
    step: Number,
    textAlign: {
      type: String,
      default: "center"
    },
    placeholder: String,
    value: [String, Number],
    data: {
      type: Array,
      default: null
    },
    setDefault: [String, Number],
    unit: String
  },
  components: {
    XButton,
    XInput
  },
  created() {
    this.init();
  },
  computed: {
    inputStyle() {
      if (this.textAlign) {
        return {
          textAlign: this.textAlign
        };
      }
    },
    classes() {
      if (this.min && this.max) {
        return [
          {
            "weui-btn_disabled":
              (this.max == this.currentValue && this.disabledAdd) ||
              (this.min == this.currentValue && this.disabledReduce)
          }
        ];
      }
    }
  },
  methods: {
    init() {
      if (this.min) {
        this.currentValue = this.min;
        this.inputType = "number";
        // 按钮禁用状态
        if (this.currentValue == this.min) {
          this.disabledReduce = true;
        }
        if (this.currentValue == this.max) {
          this.disabledAdd = true;
        }
      }
      // 传入数组
     
      if (this.data !== null) {
        if (this.setDefault) {
          this.setDefaultFn();
        } else {
          this.currentValue = "无";
        }
        // 按钮禁用状态
        if (this.currentValue == "无") {
          this.disabledReduce = true;
        }
        if (this.data[this.data.length - 1] == parseInt(this.currentValue)) {
          this.disabledAdd = true;
        }
      }
    },
    setDefaultFn() {
      if (typeof this.setDefault === "number" && this.unit) {
        this.currentValue = this.setDefault + this.unit;
      } else {
        this.currentValue = this.setDefault;
      }
    },
    checkUnit(afterValue) {
      // 是否有单位
      if (this.unit) {
        if (afterValue == "无") {
          this.currentValue = afterValue;
          return;
        }
        this.currentValue = afterValue + this.unit;
      } else {
        this.currentValue = afterValue;
      }
    },
    reduceFn() {
      // 加 按钮取消禁用状态
      if (this.disabledAdd) {
        this.disabledAdd = false;
      }
      let value = parseInt(this.currentValue);
      let afterValue;
      // 1.根据数组做加、减
      if (this.data !== null && !this.disabledReduce) {
        // 根据当前input值，求所在数组中 对应得索引，取前一个值
        let curIndex = this.data.indexOf(value);
        afterValue = this.data[curIndex - 1];
        if (curIndex == 1) {
          this.disabledReduce = true;
          afterValue = "无";
        }
      } else if (this.min && !this.disabledReduce) {
        afterValue = value - this.step;
      }
      this.checkUnit(afterValue);
    },
    addFn() {
      if (this.disabledReduce) {
        this.disabledReduce = false;
      }
      let value = parseInt(this.currentValue);
      let afterValue;
      // 1.根据数组做加、减
      if (this.data != null && !this.disabledAdd) {
        // 根据当前input值，求所在数组中 对应得索引，取前一个值
        let curIndex = null;
        if (this.currentValue === "无") {
          curIndex = 0;
        } else {
          curIndex = this.data.indexOf(value);
        }
        afterValue = this.data[curIndex + 1];
        this.currentValue = afterValue;
        if (curIndex == this.data.length - 2) {
          console.log(curIndex, this.data.length - 2);
          this.disabledAdd = true;
        }
      } else if (this.max && !this.disabledAdd) {
        afterValue = value + this.step;
      }

      this.checkUnit(afterValue);
    }
  },
  watch: {
    currentValue(newValue) {
      if (this.min) {
        if (newValue >= this.max) {
          this.disabledAdd = true;
        } else if (newValue <= this.min) {
          this.disabledReduce = true;
        }
      }

      this.$emit('on-change', newValue);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin";
.weui-btn {
  position: absolute;
  top: 0;
  font-size: 18px;
  width: 0.7rem;
  height: 100%;
  line-height: 100%;
  color: #555;
  padding: 0;
  border-radius: 0;
  border: none !important;
  &.mui-numbox-btn-minus {
    left: 0;
  }
  &.mui-numbox-btn-plus {
    right: 0;
  }
}
.mui-numbox {
  .flex-h();
  .radius(0.1rem);
  position: relative;
  width: 5.5rem;
  height: 0.88rem;
  padding: 0 0.7rem;
  border: solid 1px #e2e2e2;
  box-sizing: border-box;
  .weui-btn_plain-disabled {
    color: #ccc;
    background-color: #f2f2f2 !important;
  }
  input {
    display: inline-block;
    overflow: hidden;
    width: 100% !important;
    height: 100%;
    margin: 0;
    padding: 0 3px !important;
    text-align: center;
    text-overflow: ellipsis;
    word-break: normal;
    border: none !important;
    font-size: 0.38rem;
    border-right: solid 1px #e2e2e2 !important;
    border-left: solid 1px #e2e2e2 !important;
  }
}
</style>
