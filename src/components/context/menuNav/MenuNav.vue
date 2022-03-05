<template>
  <div class="menu-nav">
    <div class="left" @click="back">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="center">{{ navTitle }}</div>
    <div class="right" @click="toSub">
      <i v-if="rightImg" class="iconfont icon-fenxiang"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuNav",
  props: {
    showBlackImg: {
      type: Boolean,
      default: true,
    },
    showWriteImg: {
      type: Boolean,
      default: false,
    },
    navTitle: {
      type: String,
      default: "",
    },
    rightImg: {
      type: Boolean,
      default: false,
    },
    // 返回按钮默认返回路径
    backPath: {
      type: String,
      default: '-1'
    }
  },
  methods: {
    back() {
      if (this.backPath == '-1') {
        this.$router.go(-1);
      } else {
        this.$router.push(this.backPath)
      }
      // this.$router.go(-1);
    },

    toSub() {
      if (this.rightImg) {
        this.$emit("openSub");
      }
    },
  },
};
</script>
<style scoped>
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
.left {
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.left .iconfont{
  font-size: 16px;
}
.center {
  width: 280px;
  flex: 7;
  line-height: 44px;
  font-size: 18px;
  text-indent: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right .icon-fenxiang {
  font-size: 14px;
}
</style>