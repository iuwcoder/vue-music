<template>
  <div class="main-bottom-bar">
    <van-tabbar
      v-model="active"
      active-color="#ff4b41"
      inactive-color="#808080"
      @change="onChange"
    >
      <van-tabbar-item replace to="/discover">
        <span>发现</span>
        <template #icon>
          <i class="iconfont icon-faxian1"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>播客</span>
        <template #icon>
          <i class="iconfont icon-boke"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/userCenter">
        <span>我的</span>
        <template #icon>
          <i class="iconfont icon-yinle"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>关注</span>
        <template #icon>
          <i class="iconfont icon-wodeguanzhu"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>云村</span>
        <template #icon>
          <i class="iconfont icon-shequ"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "MainBottomBar",
  data() {
    return {
      active: 0,
    };
  },

  methods: {
    onChange(index) {
      this.active = index
      switch (index) {
        case 0:
          this.$router.push("/discover");
          break;
        case 1:
          this.$router.push("/discover");
          break;
        case 2:
          this.$router.push("/userCenter");
          break;
      }
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.main-bottom-bar {
  z-index: 500;
  .iconfont {
    font-size: 20px;
  }
}
</style>