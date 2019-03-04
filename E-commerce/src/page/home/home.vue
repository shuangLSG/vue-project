<template>
    <div>
        <ul>
          <li v-for="img in banner" :key="img.id">
            <img :src="img.img_350_400">
          </li>
        </ul>
    </div>
</template>

<script>
import { selectionquery, commodityquery } from "../../service/getData.js";

export default {
  name: "home",
  data() {
    return {
      currCommody: null,
      banner: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      // 分类
      let currCommodyData = await commodityquery(3);
      this.currCommody = currCommodyData.data.d;

      selectionquery().then((res)=>{
        let initPage= res.data.d;
        this.banner = initPage.banner;
      }).catch((err)=>{
        console.log(err)
      });
    }
  }
};
</script>

