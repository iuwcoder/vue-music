<template>
  <div class="more-album">
    <menu-nav class="nav" :navTitle="'专辑'"></menu-nav>
    <van-tabs
      class="tab"
      background="#f5f5f5"
      title-active-color="#e93d34"
      animated
      swipeable
      @click-tab="tabToggle"
    >
      <van-tab
        v-for="(item, index) in tagList"
        :title="item"
        :key="index"
        class="tab-item"
      >
      </van-tab>
    </van-tabs>
    <scroll class="scroll-content">
      <div class="content" v-loading="!albumList.length">
        <div
          class="album-item"
          @click="albumShow(item.id)"
          v-for="(item, index) in albumList"
          :key="index"
        >
          <div class="top-img">
            <img v-lazy="item.picUrl" alt="" />
            <div class="zhe"></div>
          </div>
          <div class="album-name">{{ item.name }}</div>
          <div class="artist">{{ item.artist }}</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import MenuNav from "components/context/menuNav/MenuNav";
import Scroll from "components/common/scroll/scroll.vue";

import { getNewAlbum } from "network/discover";

export default {
  name: "moreAlbum",
  components: {
    MenuNav,
    Scroll,
  },
  data() {
    return {
      offset: 0,
      tagList: ["全部", "华语", "欧美", "韩国", "日本"],
      albumList: [], // 专辑数组
      name: "推荐",
      test: "Recommend",
      Area: "全部",
      // loading: false,
      totop: 0,
    };
  },
  methods: {
    // 路由跳转
    albumShow(id) {
      this.$router.push("/SheetInfo/" + id + "&" + 'false');
    },

    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0:
          this.album("ALL", "hot");
          this.Area = "全部";
          this.name = "全部";
          this.test = "Recommend";
          break;
        case 1:
          this.album("ZH", "hot");
          this.Area = "华语";
          this.name = "华语";
          this.test = "Mandarin Music";
          break;
        case 2:
          this.album("EA", "hot");
          this.Area = "欧美";
          this.name = "欧美";
          this.test = "Western Music";
          break;
        case 3:
          this.album("KR", "hot");
          this.Area = "韩国";
          this.name = "韩国";
          this.test = "Korean Music";
          break;
        case 4:
          this.album("JP", "hot");
          this.Area = "日本";
          this.name = "日本";
          this.test = "Japanese Music";
          break;
        default:
          break;
      }
    },

    // 封装方法
    album(area, type) {
      if (this.Area !== area) {
        this.offset = 0;
        this.albumList = [];
        getNewAlbum(30, this.offset * 30, area, type).then((res) => {
          for (const item of res.data.monthData) {
            this.albumList.push({
              id: item.id,
              name: item.name,
              picUrl: item.picUrl,
              artist: item.artist.name,
              showBlack: false,
            });
          }
        });
      }
      this.Area = area;
    },
  },
  created() {
    this.album("ALL", "hot");
  },
};
</script>

<style lang="scss" scoped>
.more-album {
  width: 100%;
  height: 100vh;
  .scroll-content {
    height: 100%;
    overflow: hidden;
  }
  .nav {
    border: none;
    // position: fixed;
    // z-index: 20;
    // top: 0;
    // left: 0;
    // right: 0;
  }
  .tab {
    // position: fixed;
    // top: 44px;
    // left: 0;
    // right: 0;
    z-index: 9;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 20px;
    margin-bottom: 50px;
    .album-item {
      width: 42%;
      height: 170px;
      margin-bottom: 15px;
      .top-img {
        width: 80%;
        position: relative;
        // z-index: 3;
        display: flex;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          z-index: 3;
        }
        .zhe {
          background-color: #333;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 20px;
          z-index: 1;
        }
      }
      .album-name {
        width: 135px;
        font-size: 14px;
        margin-top: 7px;
        @include no-wrap();
      }
      .artist {
        @include no-wrap();
        font-size: 12px;
        color: $color-text1;
        margin-top: 5px;
      }
    }
  }
}
</style>