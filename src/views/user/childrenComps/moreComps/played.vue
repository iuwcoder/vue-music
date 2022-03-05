<template>
  <div class="played">
    <menu-nav :navTitle="'最近播放'"></menu-nav>
    <song-nav class="song-nav" :trackCount="songs.length"></song-nav>
    <song-item :songList="songs" @select="selectItem"></song-item>
  </div>
</template>

<script>
import MenuNav from "@/components/context/menuNav/MenuNav.vue";
import SongNav from "@/components/context/songItem/SongNav";
import SongItem from "@/components/context/songItem/SongItem";
import scroll from "components/common/scroll/scroll.vue";

import { getSongDetial, getlyric } from "network/played"; // 获取歌曲基本信息 歌词 评论
import { playSong } from "network/songs"; // 获取音乐url
import { getPlayList } from "network/played"; // 网络请求
import { toStringNum } from "common/common"; // 播放量转换

import { mapActions } from "vuex";

export default {
  name: "played",
  components: {
    MenuNav,
    SongNav,
    SongItem,
    scroll
  },
  data() {
    return {
      songs: [],
    };
  },
  methods: {
    selectItem({ item, index }) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    ...mapActions(["selectPlay", "randomPlay"]),
  },
  created() {
    // 获取数据
    getPlayList(this.$route.params.id, 0).then((res) => {
      for (const item of res.data.allData) {
        getSongDetial(item.song.id.toString()).then((res) => {
          let result = res.data.songs[0];
          playSong(item.song.id).then((res) => {
            let music = res.data.data[0];
            getlyric(item.song.id).then((res) => {
              this.songs.push({
                singers: result.ar[0].name, // 歌手
                navTitle: result.name, // 歌曲名称
                yuanc: result.alia, //歌曲别名
                zhuanji: result.al.name, //专辑名称
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
    });
  },
};
</script>

<style lang="scss" scoped>
.played {
  background-color: $color-bgc1;
  .song-nav {
    margin-top: 10px;
  }
}
</style>