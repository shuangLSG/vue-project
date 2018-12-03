<template>
  <div
    class="weui-cell"
    @click="onClick">
    <div class="weui-cell__hd">
      <slot name="hd"></slot>
    </div>
    <div class="vux-cell-bd">
      <p>
        <label class="vux-label">
          <slot name="value">{{ value }}</slot>
        </label>    
      </p>
    </div>
    <div class="weui-cell__ft" :class="valueClass">
      <slot>{{ ft }}</slot>  
    </div> 
  </div>
</template>

<script>
export default {
  props: {
    value: [String],
    ft: [String, Number]
  },
  computed: {
    
  }
};
</script>

