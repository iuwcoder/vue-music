<template>
  <div class="play-song" v-show="playlist.length">
    <transition
      name="normal"
    >
      <div class="normal-player" v-show="fullScreen">
        <!-- 背景图片 -->
        <div class="background">
          <img :src="currentSong.bgimg" />
        </div>
        <div class="zhez"></div>
        <!-- 导航 -->
        <div class="top">
          <div class="back" @click="back">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <h1 class="title">{{ currentSong.navTitle }}</h1>
          <h2 class="subtitle">{{ currentSong.singers }}</h2>
        </div>
        <div
          class="middle"
          @touchstart.prevent="onMiddleTouchStart"
          @touchmove.prevent="onMiddleTouchMove"
          @touchend.prevent="onMiddleTouchEnd"
        >
          <!-- 唱片转盘 -->
          <div class="middle-l" :style="middleLStyle">
            <div ref="cdWrapperRef" class="cd-wrapper">
              <div ref="cdRef" class="cd">
                <img
                  ref="cdImageRef"
                  class="image"
                  :class="cdCls"
                  :src="currentSong.bgimg"
                />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>
          <!-- 歌词 -->
          <scroll class="middle-r" ref="lyricScrollRef" :style="middleRStyle">
            <div class="lyric-wrapper">
              <div v-if="currentLyric" ref="lyricListRef">
                <p
                  class="text"
                  :class="{ current: currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.num"
                >
                  {{ line.txt }}
                </p>
              </div>
              <!-- 纯音乐 -->
              <div class="pure-music" v-show="pureMusicLyric">
                <p>{{ pureMusicLyric }}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <!-- cd与歌词交互 -->
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <!-- 中间导航 -->
          <div class="nav">
            <div class="PlaySongNav">
              <div class="navitem">
                <i
                  @click="toogleFavorite(currentSong)"
                  class="iconfont"
                  :class="getFavoriteIcon(currentSong)"
                ></i>
              </div>
              <div class="navitem">
                <i class="iconfont icon-xiazai"></i>
              </div>
              <div class="navitem">
                <i class="iconfont icon-changge"></i>
              </div>
              <div class="navitem" @click="toComment">
                <i class="iconfont icon-pinglun"></i>
              </div>
              <div class="navitem">
                <i class="iconfont icon-sandian"></i>
              </div>
            </div>
          </div>
          <!-- 进度条 -->
          <div class="progress-wrapper">
            <span class="time time-l">{{ formatTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                ref="barRef"
                :progress="progress"
                @progress-changing="onProgressChanging"
                @progress-changed="onProgressChanged"
              ></progress-bar>
            </div>
            <span class="time time-r">{{ formatTime(playDuration) }}</span>
          </div>
          <!-- 切换歌曲 -->
          <div class="operators">
            <div class="item img1">
              <i @click="changeMode" class="iconfont" :class="modeIcon"></i>
            </div>
            <div class="item img1" :class="disableCls">
              <i @click="prev" class="iconfont icon-prev"></i>
            </div>
            <div class="item img2" :class="disableCls">
              <i @click="togglePlay" class="iconfont" :class="playIcon"></i>
            </div>
            <div class="item img1" :class="disableCls">
              <i @click="next" class="iconfont icon-next"></i>
            </div>
            <div class="item img1">
              <i class="iconfont icon-liebiao"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <mine-player :progress="progress" :toggle-play="togglePlay"></mine-player>
    <audio
      :src="currentSong.url"
      ref="audioRef"
      autoplay
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar.vue"; //进度条
import MinePlayer from "./mini-player.vue"; //迷你播放器
import scroll from "components/common/scroll/scroll";

import { formatTime } from "@/assets/js/util.js";
import { PLAY_MODE } from "@/assets/js/constant";
import { useStore} from "vuex";
import { useRouter } from "vue-router";
import { computed, watch, ref, nextTick } from "vue";
import useMode from "./use-mode"; //播放模式
import useFavorite from "./use-favorite"; //喜欢
import useCd from "./use-cd"; //唱片转盘
import useLyric from "./use-lyric"; //歌词
import useMiddleInteractive from "./use-middle-interactive"; //cd与歌词交互
import useAnimation from "./use-animation"; //切换cd动画
import usePlayHistory from "./use-play-history" //播放历史

export default {
  name: "PlaySong",
  components: {
    ProgressBar,
    MinePlayer,
    scroll,
  },
  setup() {
    //data
    const audioRef = ref(null);
    const barRef = ref(null); //进度条
    const songReady = ref(false); //歌曲缓冲
    const duration = ref(0); //歌曲时长
    const currentTime = ref(0); //当前播放时间
    let progressChanging = false;

    const router = useRouter();

    //vuex
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playing = computed(() => store.state.playing);
    const currentIndex = computed(() => store.state.currentIndex);
    const playlist = computed(() => store.state.playlist);
    const playDuration = computed(() => store.state.playDuration);
    const playMode = computed(() => store.state.playMode);

    // hooks
    const { modeIcon, changeMode } = useMode();
    const { getFavoriteIcon, toogleFavorite } = useFavorite();
    const { cdCls, cdRef, cdImageRef } = useCd();
    const {
      currentLyric,
      currentLineNum,
      pureMusicLyric,
      playingLyric,
      lyricScrollRef,
      lyricListRef,
      playLyric,
      stopLyric,
    } = useLyric({ songReady, currentTime });
    const {
      currentShow,
      middleRStyle,
      middleLStyle,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
    } = useMiddleInteractive();
    const { enter, afterEnter, leave, afterLeave } = useAnimation();
    const { savePlay } = usePlayHistory()

    // computed
    const playIcon = computed(() => {
      return playing.value ? "icon-pause" : "icon-play";
    });
    const disableCls = computed(() => {
      return songReady.value ? "" : "disable";
    });

    const progress = computed(() => {
      return currentTime.value / playDuration.value;
    });

    // watch
    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return;
      }
      currentTime.value = 0;
      songReady.value = false;
      const audioEl = audioRef.value;
      audioEl.src = newSong.url;
      audioEl.play();
      store.commit("setPlayingState", true);
    });

    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return;
      }
      const audioEl = audioRef.value;
      if (newPlaying) {
        audioEl.play();
        playLyric();
      } else {
        audioEl.pause();
        stopLyric();
      }
    });

    // 监听播放器全屏收缩状态下进度条变化
    watch(fullScreen, async (newFullScreen) => {
      if (newFullScreen) {
        await nextTick();
        barRef.value.setOffset(progress.value);
      }
    });

    function back() {
      store.commit("setFullScreen", false);
      // this.$router.back();
    }

    // 控制歌曲播放
    function togglePlay() {
      if (!songReady.value) {
        return;
      }
      store.commit("setPlayingState", !playing.value);
    }

    function pause() {
      store.commit("setPlayingState", false);
    }
    // 上一首
    function prev() {
      const list = playlist.value;
      if (!songReady.value || !list.length) {
        return;
      }
      if (list.length === 1) {
        loop();
      } else {
        let index = currentIndex.value - 1;
        if (index === -1) {
          index = list.length - 1;
        }
        store.commit("setCurrentIndex", index);
      }
    }

    // 下一首
    function next() {
      const list = playlist.value;
      if (!songReady.value || !list.length) {
        return;
      }
      if (list.length === 1) {
        loop();
      } else {
        let index = currentIndex.value + 1;
        if (index === list.length) {
          index = 0;
        }
        store.commit("setCurrentIndex", index);
      }
    }

    // 单曲循环
    function loop() {
      const audioEl = audioRef.value;
      audioEl.currentTime = 0;
      audioEl.play();
      store.commit("setPlayingState", true);
    }

    //歌曲缓冲
    function ready() {
      if (songReady.value) {
        return;
      }
      songReady.value = true;
      // 获取歌曲总时长
      duration.value = audioRef.value.duration;
      store.commit("setPlayDuration", duration.value);
      // 确保歌词一定执行
      playLyric();
      savePlay(currentSong.value) 
    }

    // 歌曲出错时，允许前进和后退
    function error() {
      songReady.value = true;
    }

    // 获取当前播放时长
    function updateTime(e) {
      if (!progressChanging) {
        currentTime.value = e.target.currentTime;
      }
    }

    // 拖动进度条时
    function onProgressChanging(progress) {
      progressChanging = true;
      currentTime.value = playDuration.value * progress;
      playLyric(); //同步当前歌词位置
      stopLyric(); //暂停歌词
    }
    // 拖动后
    function onProgressChanged(progress) {
      progressChanging = false;
      audioRef.value.currentTime = currentTime.value =
        playDuration.value * progress;
      if (!playing.value) {
        store.commit("setPlayingState", true);
      }
      playLyric(); //同步
    }

    // 歌曲结束时自动播放下一首
    function end() {
      currentTime.value = 0;
      if (playMode.value === PLAY_MODE.loop) {
        loop();
      } else {
        next();
      }
    }

    // 评论
    function toComment() {
      router.push('/Comment/' + currentSong.value.id  + "&" + "0")
      
    }

    return {
      // data
      audioRef,
      barRef,
      songReady,
      currentTime,
      duration,
      progressChanging,

      // vuex
      fullScreen,
      playing,
      currentSong,
      currentIndex,
      playlist,
      playDuration,
      playMode,

      playIcon,
      disableCls,
      progress,

      back,
      togglePlay,
      pause,
      prev,
      next,
      loop,
      ready,
      error,
      updateTime,
      formatTime,
      PLAY_MODE,
      onProgressChanging,
      onProgressChanged,
      end,
      toComment,
      // mode
      modeIcon,
      changeMode,
      // favorite
      getFavoriteIcon,
      toogleFavorite,
      // cd
      cdCls,
      cdRef,
      cdImageRef,
      // lyric
      currentLyric,
      currentLineNum,
      pureMusicLyric,
      playingLyric,
      lyricScrollRef,
      lyricListRef,
      // use-middle-interactive
      currentShow,
      middleRStyle,
      middleLStyle,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,
      // use-animation
      enter,
      afterEnter,
      leave,
      afterLeave,


      // play,
    };
  },
};
</script>

<style lang="scss" scoped>
.play-song {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    background-color: #222;
    // height: 100vh;
    z-index: 150;
    // 背景
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.7;
      filter: blur(15px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .zhez {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.4);
    }

    // 导航
    .top {
      z-index: 3;
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-fanhui {
        display: block;
        padding: 9px;
        font-size: 22px;
        color: $color-bgc1;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        // @include no-wrap();
        font-size: 20px;
        color: $color-bgc;
      }
      .subtitle {
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        color: $color-song;
      }
    }
    // 中间部分
    .middle {
      z-index: 3;
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 210px;
      white-space: nowrap;
      font-size: 0;
      // 唱片转盘
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        .cd-wrapper {
          position: absolute;
          left: 15%;
          top: 30%;
          width: 70%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 150px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: $color-bgc1;
          }
        }
      }
      // 歌词
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 40px;
            color: $color-song;
            font-size: 16px;
            &.current {
              color: $color-bgc1;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 40px;
            color: $color-bgc;
            font-size: 18px;
          }
        }
      }
    }
    // 底部
    .bottom {
      z-index: 3;
      position: absolute;
      bottom: 4%;
      width: 100%;
      margin-top: 20px;
      // cd与歌词交互
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        margin-bottom: 17px;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-song;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text1;
          }
        }
      }
      // 底部导航条
      .nav {
        .PlaySongNav {
          width: 100%;
          height: 30px;
          display: flex;
          .navitem {
            flex: 1;
            text-align: center;
            .iconfont {
              font-size: 20px;
              color: $color-bgc1;
            }
            .icon-shixin {
              color: #ff4b41;
            }
          }
        }
      }
      // 进度条
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 92%;
        margin: 0px auto;
        padding: 7px 0;
        .time {
          color: rgb(194, 194, 194);
          font-size: 12px;
          flex: 0 0 43px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      // 控制栏
      .operators {
        width: 100%;
        height: 65px;
        line-height: 65px;
        display: flex;
        .item {
          flex: 1;
          color: $color-bgc;
          text-align: center;
        }
        .img1 {
          .iconfont {
            font-size: 25px;
          }
        }
        .img2 {
          .iconfont {
            font-size: 47px;
          }
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>