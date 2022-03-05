<template>
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="showNormalPlayer">
      <div class="cd-wrapper">
        <div ref="cdRef" class="cd">
          <img
            ref="cdImageRef"
            width="40"
            height="40"
            :src="currentSong.bgimg"
            :class="cdCls"
          />
        </div>
      </div>
      <div ref="sliderWrapperRef" class="slider-wrapper">
        <div class="slider-group">
          <div class="slider-page" v-for="song in playlist" :key="song.id">
            <h2 class="name">{{ song.navTitle }}</h2>
            <p class="desc">{{ song.singers }}</p>
          </div>
        </div>
      </div>
      <div class="control">
        <progress-circle class="circle" :radius="32" :progress="progress">
          <i class="icon" :class="miniPlayIcon" @click.stop="togglePlay"></i>
        </progress-circle>
      </div>
      <div class="control" @click.stop="showPlaylist">
        <i class="iconfont icon-liebiao"></i>
      </div>
      <playlist ref="playlistRef"></playlist>
    </div>
  </transition>
</template>

<script>
import ProgressCircle from "./progress-circle.vue"; //圆形进度条
import Playlist from "./playlist.vue"; //播放列表

import { useStore } from "vuex";
import { computed, ref } from "vue";
import useCd from "./use-cd";
import useMiniSlider from "./use-mini-slider"; //切换歌曲

export default {
  name: "mini-player",
  components: {
    ProgressCircle,
    Playlist,
  },
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    // 播放暂停
    togglePlay: Function,
  },
  setup() {
    const playlistRef = ref(null);

    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playing = computed(() => store.state.playing);
    const playlist = computed(() => store.state.playlist);

    const { cdCls, cdRef, cdImageRef } = useCd();
    const { sliderWrapperRef } = useMiniSlider();

    const miniPlayIcon = computed(() => {
      return playing.value
        ? "iconfont icon-pausemini"
        : "iconfont icon-playmini";
    });

    // 展开全屏播放器
    function showNormalPlayer() {
      store.commit("setFullScreen", true);
    }

    // 展开播放列表
    function showPlaylist() {
      playlistRef.value.show();
    }

    return {
      playlistRef,
      fullScreen,
      currentSong,
      playing,
      playlist,
      miniPlayIcon,
      showNormalPlayer,
      showPlaylist,
      // cd
      cdCls,
      cdRef,
      cdImageRef,
      // use-mini-slider
      sliderWrapperRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-bgc1;
  border-top: $border-line;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 15px;

    .cd {
      height: 100%;
      width: 100%;

      img {
        border-radius: 50%;
        // border: 7px solid #222;
        &.playing {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          // @include no-wrap();
          font-size: 16px;
          color: $color-text;
        }
        .desc {
          // @include no-wrap();
          font-size: 13px;
          color: $color-text2;
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .circle {
      // position: relative;
      // width: 32px;
      // height: 32px;
      .icon {
        position: absolute;
        left: 10px;
        top: 9px;
        color: $color-text;
        font-size: 14px;
      }
    }
    .icon-liebiao {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-text1;
    }
  }
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
