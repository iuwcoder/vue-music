<template>
  <div class="discover">
    <scroll class="discover-content">
      <div>
        <!-- 使用 vant 组件库 -->
        <discover-swiper class="swiper"></discover-swiper>
        <!-- 分类导航栏 -->
        <discover-tabbar></discover-tabbar>
        <!-- 推荐歌单 -->
        <discover-sheet></discover-sheet>
        <!-- 新歌速递 -->
        <discover-song></discover-song>
        <!-- 最新MV -->
        <discover-mv></discover-mv>
        <!-- 新碟上架 -->
        <discover-album></discover-album>
        <!-- 热门歌手 -->
        <discover-singer></discover-singer>
      </div>
    </scroll>
  </div>
</template>

<script>
import DiscoverSwiper from "./childrenComps/DiscoverSwiper.vue";
import DiscoverSheet from "./childrenComps/DiscoverSheet.vue";
import DiscoverTabbar from "./childrenComps/DiscoverTabbar.vue";
import DiscoverSong from "./childrenComps/DiscoverSong.vue";
import DiscoverMv from "./childrenComps/DiscoverMv.vue";
import DiscoverAlbum from "./childrenComps/DiscoverAlbum.vue";
import DiscoverSinger from "./childrenComps/DiscoverSinger.vue";

import scroll from "components/common/scroll/scroll.vue";

import "assets/icon/Discover.css"; // 字体图标
import "assets/icon/RadioStation.css"; // 字体图标
export default {
  name: "Discover",
  components: {
    DiscoverSwiper,
    DiscoverSheet,
    DiscoverTabbar,
    DiscoverSong,
    DiscoverMv,
    DiscoverAlbum,
    DiscoverSinger,
    scroll,
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.discover {
  height: 100vh;
  .discover-content {
    height: 100%;
    overflow: hidden;
    .swiper {
      padding-top: 10px;
    }
  }
}
</style>
