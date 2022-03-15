<template>
  <div class="menu-nav">
    <div class="left" @click="back">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="center">{{ navTitle }}</div>
    <div class="right" v-if="showRight" @click="showPop">
      <i class="iconfont icon-sandian"></i>
    </div>
    <top-pop ref="sheetSongRef" :sheetId="sheetId"></top-pop>
  </div>
</template>

<script>
import TopPop from "@/components/context/sheet/TopPop";

export default {
  name: "MenuNav",
  components: {
    TopPop
  },
  props: {
    showRight: {
      type: Boolean,
      default: false,
    },
    navTitle: {
      type: String,
      default: "",
    },
    // 返回按钮默认返回路径
    backPath: {
      type: String,
      default: "-1",
    },
    sheetId: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
      if (this.backPath == "-1") {
        this.$router.go(-1);
        this.$emit('clearSheet')
      } else {
        this.$router.push(this.backPath);
      }
      // this.$router.go(-1);
    },

    showPop() {
      this.$refs.sheetSongRef.showPopup()
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-nav {
  width: 100%;
  height: 44px;
  /* font-size: .426667rem; */
  display: flex;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  position: relative;
  z-index: 20;
  background-color: #fff;
  color: #333;
}
.popup {
  position: fixed;
  top: 0;
  background-color: rgb(212, 230, 208);
}
.left {
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.iconfont {
  font-size: 16px;
}
.center {
  width: 280px;
  flex: 7;
  line-height: 44px;
  font-size: 18px;
  text-indent: 15px;
  @include no-wrap();
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .right .icon-sandian {
  font-size: 14px;
} */
</style>