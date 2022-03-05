<template>
  <div class="more-songs">
    <menu-nav :navTitle="'最新音乐'"></menu-nav>
    <van-tabs
      class="tab"
      background="#fff"
      title-active-color="#e93d34"
      animated
      swipeable
      @click="tabToggle"
    >
      <van-tab
        v-for="(item, index) in itemList"
        :title="item"
        :key="index"
        class="tab-item"
      >
      </van-tab>
    </van-tabs>
    <div class="title">
      <!-- <div class="name">{{ name }}</div>
      <div class="test">{{ test }}</div>
      <div class="img"><img :src="img" alt="" /></div> -->
    </div>
    <song-nav :trackCount="songLength"></song-nav>
    <song-item
      :songList="songList"
      :trackCount="songLength"
      :shouLeft="false"
      :showPic="true"
    ></song-item>
  </div>
</template>

<script>
import MenuNav from "components/context/menuNav/MenuNav";
import SongNav from "@/components/context/songItem/SongNav";
import SongItem from "@/components/context/songItem/SongItem";

import { getSongsTop } from "network/discover";

export default {
  name: "moreSongs",
  components: {
    MenuNav,
    SongNav,
    SongItem,
  },
  data() {
    return {
      itemList: ["推荐", "华语", "欧美", "韩国", "日本"],
      songList: [],
      // name: "推荐",
      // test: "Recommend",
      img: "~assets/img/discoverSongs/new1.jpg",
      songLength: 0, // 歌曲数量
      index: 0, // 默认显示
    };
  },
  methods: {
    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0:
          this.toggleSongs(0);
          // this.name = "推荐";
          // this.test = "Recommend";
          this.img = "~assets/img/discoverSongs/new1.jpg";
          break;
        case 1:
          this.toggleSongs(7);
          // this.name = "华语";
          // this.test = "Mandarin Music";
          break;
        case 2:
          this.toggleSongs(96);
          // this.name = "欧美";
          // this.test = "Western Music";
          break;
        case 3:
          this.toggleSongs(16);
          // this.name = "韩国";
          // this.test = "Korean Music";
          break;
        case 4:
          this.toggleSongs(8);
          this.name = "日本";
          this.test = "Japanese Music";
          break;
        default:
          break;
      }
    },
    // 封装方法
    toggleSongs(index) {
      // this.$loading.loadingShow();
      if (this.index !== index) {
        this.songList = [];
        getSongsTop(index).then((res) => {
          this.songLength = res.data.data.length;
          for (const item of res.data.data) {
            this.songList.push({
              id: item.id,
              navTitle: item.name, //歌曲名字
              yuanc: [],
              singers: item.artists[0].name, //歌手名字
              zhuanji: item.album.name, //专辑名字
              picUrl: item.album.picUrl, //专辑封面
              mv: item.mvid, //MV
            });
          }
          setTimeout(() => {
            // this.$loading.loadingNo();
          }, 1000);
        });
      }
      this.index = index;
      setTimeout(() => {
        // this.$loading.loadingNo();
      }, 500);
    },
  },
  created() {
    this.toggleSongs()
  },
};
</script>

<style>
.more-songs {
  background-color: #fff;
}
</style>