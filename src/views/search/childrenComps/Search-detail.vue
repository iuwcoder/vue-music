<template>
  <div class="search-detail">
    <div class="song">
      <song-item :songList="songs"></song-item>
    </div>
  </div>
</template>

<script>
import SongItem from "@/components/context/songItem/SongItem";
import { searchResult } from "network/search";

export default {
  name: "SearchDetail",
  components: {
    SongItem,
  },
  data() {
    return {
      songs: [],
    };
  },
  created() {
    searchResult().then((res) => {
      for (const item of res.data.result.song.songs) {
        this.songs.push({
          id: item.id,
          navTitle: item.name,
          yuanc: [],
          singers: item.ar,
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