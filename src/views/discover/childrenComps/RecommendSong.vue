<template>
  <div class="recommend">
    <menu-nav :navTitle="'每日推荐'"></menu-nav>
    <div class="nav">
      <van-icon name="play-circle" color="#ff4b41" />
      <span>播放全部</span>
    </div>
    <div class="songs">
      <song-item :songList="songList"></song-item>
    </div>
  </div>
</template>

<script>
import MenuNav from "components/context/menuNav/MenuNav";
import SongItem from "@/components/context/songItem/SongItem";
import { getRecommendSong } from "network/discover";

export default {
  name: "RecommendSong",
  components: {
    MenuNav,
    SongItem,
  },
  data() {
    return {
      songList: [],
    };
  },
  created() {
    getRecommendSong(this.$store.state.cookie).then((res) => {
      console.log(res);
      for (const item of res.data.data.dailySongs) {
        this.songList.push({
          id: item.id,
          songName: item.name,
          yuanc: [],
          singer: item.ar,
          zhuanji: item.al.name,
          mv: item.mv,
        });
      }
    });
  },
};
</script>

<style>
</style>