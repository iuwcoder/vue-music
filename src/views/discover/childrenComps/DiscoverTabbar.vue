<template>
  <div class="discover-tabbar">
    <tabbar class="tabbar">
      <tabbar-item class="tabbar-item" @click="toSongs">
        <template #item-icon>
          <div class="img-icon">
            <i class="iconfont icon-rili"></i>
          </div>
        </template>
        <template #item-text><span>每日推荐</span></template>
      </tabbar-item>
      <tabbar-item class="tabbar-item" @click="Sheet">
        <template #item-icon>
          <div class="img-icon">
            <i class="iconfont icon-gedan"></i>
          </div>
        </template>
        <template #item-text><span>歌单</span></template>
      </tabbar-item>
      <tabbar-item class="tabbar-item">
        <template #item-icon>
          <div class="img-icon">
            <i class="iconfont icon-paihang"></i>
          </div>
        </template>
        <template #item-text><span>排行榜</span></template>
      </tabbar-item>
      <tabbar-item class="tabbar-item">
        <template #item-icon>
          <div class="img-icon">
            <i class="iconfont icon-fm"></i>
          </div>
        </template>
        <template #item-text><span>私人FM</span></template>
      </tabbar-item>
      <tabbar-item class="tabbar-item" @click="toAlbum">
        <template #item-icon>
          <div class="img-icon">
            <i class="iconfont icon-zhuanji"></i>
          </div>
        </template>
        <template #item-text><span>数字专辑</span></template>
      </tabbar-item>
      <!-- <tabbar-item class="tabbar-item">
        <template #item-icon>
          <div class="img-icon">
            <i class="iconfont icon-zhibo"></i>
          </div>
        </template>
        <template #item-text><span>直播</span></template>
      </tabbar-item> -->
    </tabbar>
  </div>
</template>

<script>
import Tabbar from "components/common/tabbar/Tabbar";
import TabbarItem from "components/common/tabbar/TabbarItem";

import "assets/icon/Discover.css"; // 字体图标
import "assets/icon/RadioStation.css"; // 字体图标

export default {
  name: "DiscoverTabbar",
  components: {
    Tabbar,
    TabbarItem,
  },
  methods: {
    // 每日推荐
    toSongs() {
      this.$router.push("/discover/RecommendSong");
    },
    // 歌单跳转
    Sheet() {
      this.$router.push("/discover/moreSheet");
    },
    // 专辑跳转
    toAlbum() {
      this.$router.push("/discover/moreAlbum");
    },
  },
};
</script>

<style lang="scss" scoped>
.discover-tabbar {
  height: 85px;
  // overflow: hidden;
  // overflow-y: auto;
 .tabbar {
  width: 100%;
  height: 78px;
  margin-top: 15px;
  margin-bottom: 10px;
  .tabbar-item {
    height: 70px;
    text-align: center;
    padding: 0 5px;
    .img-icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-image: linear-gradient(to right, #d84e4e, red);
      margin: 0 auto;
      text-align: center;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        color: #fff;
        font-size: 18px;
      }
    }
    span {
      position: relative;
      left: 0;
      bottom: 0;
      top: 8px;
      font-size: 13px;
    }
  }
} 
}

</style>