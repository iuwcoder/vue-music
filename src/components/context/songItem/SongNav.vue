<template>
  <div class="song-nav">
    <van-icon class="play" name="play-circle" />
    <div class="title">
      播放全部<span> ({{ trackCount }})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongNav",
  props: ["trackCount"],
};
</script>

<style lang="scss" scoped>
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
</style>