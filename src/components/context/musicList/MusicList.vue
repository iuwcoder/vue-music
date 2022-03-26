<template>
  <div class="music-list">
    <div class="song-nav">
      <van-icon class="play" name="play-circle" />
      <div class="title">
        播放全部<span> ({{ trackCount }})</span>
      </div>
    </div>
    <scroll class="scroll-content" v-if="songList.length"  v-loading="!songList.length">
      <div>
        <song-item :songList="songList" @select="selectItem"></song-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongNav from "@/components/context/songItem/SongNav";
import SongItem from "@/components/context/songItem/SongItem";
import Scroll from "components/common/scroll/scroll.vue";

export default {
  name: "MusicList",
  components: {
    SongNav,
    SongItem,
    Scroll,
  },
  props: ["trackCount", "songList"],
  methods: {
    selectItem(song, index) {
      this.$emit("selectItem", { song, index });
    },
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  height: 100vh;
  .scroll-content {
    height: 100%;
    overflow: hidden;
  }
  .song-nav {
    margin-left: 8px;
    height: 35px;
    display: flex;
    align-items: center;
    .play {
      color: #ff4b41;
      font-size: 24px;
      margin-right: 12px;
    }
    .title {
      font-size: 18px;
      span {
        font-size: 15px;
        color: $color-text1;
      }
    }
  }
}
</style>