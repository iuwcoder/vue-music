<template>
  <div class="main-top-bar">
    <div class="left" @click="leftSider">
      <i class="iconfont icon-hanbao"></i>
    </div>
    <div class="center"  @click="toSearch">
      <i class="iconfont icon-sousuo"></i>
      <input :placeholder="placeholder" disabled="disabled"/>
    </div>
    <div class="right">
      <i class="iconfont icon-yuyin"></i>
    </div>
    <left-popup ref="popupRef"></left-popup>
  </div>
</template>

<script>
import LeftPopup from "@/components/context/leftPopup/LeftPopup.vue";

export default {
  name: "MainTopBar",
  components: {
    LeftPopup,
  },
  data() {
    return {
      placeholder: '搜索歌曲、歌手' //默认搜索内容
    }
  },
  methods: {
    // 左侧弹出层
    leftSider() {
      this.$refs.popupRef.showPopup();
    },

    // 搜索
    toSearch() {
      this.$router.push("/search");
    },
  },
};
</script>

<style lang="scss" scoped>
.main-top-bar {
  display: flex;
  justify-content: space-evenly;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: $color-bgc1;
  // padding: 0 15px;
  .left,
  .right {
    width: 5%;
    color: $color-text;
    .icon-hanbao {
      font-size: 18px;
    }
    .icon-yuyin {
      font-size: 20px;
    }
  }
  .center {
    width: 75%;
    height: 30px;
    line-height: 30px;
    margin-top: 7px;
    background-color: $color-bgc;
    border-radius: 20px;
    .icon-sousuo {
      margin-right: 10px;
      font-size: 13px;
      color: $color-text1;
    }
    input {
      width: 80%;
      height: 100%;
      border: 0;
      padding: 0;
      font-size: 14px;
      background-color: $color-bgc;
    }
  }
}
</style>