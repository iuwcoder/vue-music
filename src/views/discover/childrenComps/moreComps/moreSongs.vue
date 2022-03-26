<template>
  <div class="more-songs"  v-loading="!songs.length">
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
    <scroll class="detail-content">
      <div>
        <!-- <div class="title">
          <div class="name">{{ name }}</div>
          <div class="test">{{ test }}</div>
          <div class="img"><img :src="img" alt="" /></div>
        </div> -->
        <song-nav :trackCount="songLength"></song-nav>
        <song-item
          :songList="songs"
          :trackCount="songLength"
          :shouLeft="false"
          :showPic="true"
          @select="selectItem"
        ></song-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import MenuNav from "components/context/menuNav/MenuNav";
import SongNav from "@/components/context/songItem/SongNav";
import SongItem from "@/components/context/songItem/SongItem";
import scroll from "components/common/scroll/scroll.vue";

import { getSongsTop } from "network/discover";
import { getSongDetial, getlyric } from "network/played"; // 获取歌曲基本信息 歌词 评论
import { playSong } from "network/songs"; // 获取音乐url
import { mapActions } from "vuex";

export default {
  name: "moreSongs",
  components: {
    MenuNav,
    SongNav,
    SongItem,
    scroll,
  },
  data() {
    return {
      itemList: ["推荐", "华语", "欧美", "韩国", "日本"],
      songList: [],
      songs: [],
      name: "推荐",
      test: "Recommend",
      img: "~assets/img/discoverSongs/new1.jpg",
      songLength: 0, // 歌曲数量
      index: 0, // 默认显示
    };
  },
  methods: {
    ...mapActions(["selectPlay"]),

    // 顺序播放
    selectItem({ item, index }) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },

    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0:
          this.toggleSongs(0);
          this.name = "推荐";
          this.test = "Recommend";
          this.img = "~assets/img/discoverSongs/new1.jpg";
          break;
        case 1:
          this.toggleSongs(7);
          this.name = "华语";
          this.test = "Mandarin Music";
          break;
        case 2:
          this.toggleSongs(96);
          this.name = "欧美";
          this.test = "Western Music";
          break;
        case 3:
          this.toggleSongs(16);
          this.name = "韩国";
          this.test = "Korean Music";
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
        this.songs = []
        getSongsTop(index).then((res) => {
          this.songLength = res.data.data.length;
          for (const item of res.data.data) {
            getSongDetial(item.id.toString()).then((res) => {
              let result = res.data.songs[0];
              playSong(item.id).then((res) => {
                let music = res.data.data[0];
                getlyric(item.id).then((res) => {
                  this.songs.push({
                    singers: result.ar[0].name, // 歌手
                    navTitle: result.name, // 歌曲名称
                    yuanc: result.alia, //歌曲别名
                    zhuanji: result.al.name, //专辑名称
                    picUrl: result.al.picUrl, //专辑封面
                    mv: result.mv,
                    id: result.id, // 歌曲id
                    bgimg: result.al.picUrl, // 歌曲封面
                    url: music.url, // 歌曲url
                    lrc: res.data.lrc.lyric, //歌词
                  });
                  // console.log(this.songs);
                });
              });
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
    this.toggleSongs();
  },
};
</script>

<style>
.more-songs {
  background-color: #fff;
  height: 100vh;
}
.detail-content {
  height: 100%;
  overflow: hidden;
}
</style>