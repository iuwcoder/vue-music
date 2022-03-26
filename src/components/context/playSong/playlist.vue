<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="visible && playlist.length" @click="hide">
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <i class="iconfont" :class="modeIcon" @click="changeMode"> </i>
              <span class="text">{{ modeText }}</span>
              <span class="add" @click="showAddSong">
                <i class="iconfont icon-tianjia"></i>
              </span>
              <span class="clear" @click="showConfirm">
                <i class="iconfont icon-shanchu"></i>
              </span>
            </h1>
          </div>
          <scroll ref="scrollRef" class="list-content">
            <transition-group ref="listRef" name="list" tag="ul">
              <li
                class="item"
                v-for="song in sequenceList"
                :key="song.id"
                @click="selectItem(song)"
              >
                <i class="current" :class="getCurrentIcon(song)"></i>
                <span class="text"
                  >{{ song.navTitle }}
                  <span class="singer">- {{ song.singers }}</span>
                </span>
                <!-- <span class="favorite" @click.stop="toggleFavorite(song)">
                  <i class="iconfont" :class="getFavoriteIcon(song)"></i>
                </span> -->
                <span class="delete" @click.stop="removeSong(song)">
                  <i class="iconfont icon-chacha"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <div class="list-footer" @click="hide">
            <span>关闭</span>
          </div>
        </div>
        <confirm
          ref="confirmRef"
          @confirm="confirmClear"
          text="是否清空播放列表？"
          confirm-btn-text="清空"
        ></confirm>
        <add-song ref="addSongRef" :AddSheet="false"></add-song>
      </div>
    </transition>
  </teleport>
</template>

<script>
import scroll from "components/common/scroll/scroll";
import Confirm from "@/components/common/confirm/confirm.vue";
import AddSong from "@/components/context/addSong/AddSong.vue"

import { ref, computed, nextTick, watch } from "vue";
import { useStore } from "vuex";
import useMode from "./use-mode";
import useFavorite from "./use-favorite";

export default {
  name: "playlist",
  components: {
    scroll,
    Confirm,
    AddSong
  },
  setup() {
    const visible = ref(false); //展示
    const removing = ref(false); //删除限制
    const scrollRef = ref(null); //scroll
    const listRef = ref(null); //歌曲列表
    const confirmRef = ref(null); //清空
    const addSongRef = ref(null) //添加

    const store = useStore();
    const playlist = computed(() => store.state.playlist);
    const sequenceList = computed(() => store.state.sequenceList);
    const currentSong = computed(() => store.getters.currentSong);

    const { modeIcon, modeText, changeMode } = useMode();
    const { getFavoriteIcon, toggleFavorite } = useFavorite();

    function getCurrentIcon(song) {
      if (song.id === currentSong.value.id) {
        return "iconfont icon-play";
      }
    }

    // 选中歌曲或者自动切换歌曲 自动滚动到对应位置
    watch(currentSong, async (newSong) => {
      if (!visible.value || !newSong.id) {
        return;
      }
      await nextTick();
      scrollToCurrent();
    });

    // 展示
    async function show() {
      visible.value = true;
      // better-scroll需要在DOM挂载后拿到数据计算高度后 进行滚动
      await nextTick();
      refreshScroll();
      scrollToCurrent();
    }
    // 隐藏
    function hide() {
      visible.value = false;
    }

    // scroll
    function refreshScroll() {
      scrollRef.value.scroll.refresh();
    }
    // 滚动到对应播放歌曲
    function scrollToCurrent() {
      // 查找索引
      const index = sequenceList.value.findIndex((song) => {
        return currentSong.value.id === song.id;
      });
      if (index == -1) {
        return;
      }
      const target = listRef.value.$el.children[index];
      scrollRef.value.scroll.scrollToElement(target, 300);
    }

    // 点击切换歌曲
    function selectItem(song) {
      const index = playlist.value.findIndex((item) => {
        return song.id === item.id;
      });
      store.commit("setCurrentIndex", index);
      store.commit("setPlayingState", true);
    }

    // 删除歌曲
    function removeSong(song) {
      // 限制多次点击
      if (removing.value) {
        return;
      }
      removing.value = true;
      store.dispatch("removeSong", song);
      if (!playlist.value.length) {
        hide();
      }
      setTimeout(() => {
        removing.value = false;
      }, 300);
    }

    // 展示清空组件
    function showConfirm() {
      confirmRef.value.show();
    }
    // 清空歌曲列表
    function confirmClear() {
      store.dispatch("clearSongList");
      hide();
    }

    // 添加歌曲
    function showAddSong() {
      addSongRef.value.show()
    }
    

    return {
      // data
      visible,
      scrollRef,
      listRef,
      confirmRef,
      addSongRef,
      // vuex
      playlist,
      sequenceList,
      // computed
      getCurrentIcon,
      // methods
      show,
      hide,
      selectItem,
      removeSong,
      showConfirm,
      confirmClear,
      showAddSong,
      // mode
      modeIcon,
      modeText,
      changeMode,
      // favorite
      getFavoriteIcon,
      toggleFavorite,
    };
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 300;
  background-color: $color-lay;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: fixed;
    left: 4%;
    bottom: 0;
    z-index: 210;
    width: 92%;
    border-radius: 20px 20px 0 0;
    background-color: $color-bgc1;
    // padding: 0 15px;
    .list-header {
      position: relative;
      padding: 20px 0 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .iconfont {
          font-size: 18px;
          color: $color-text3;
        }
        .text {
          flex: 1;
          font-size: 17px;
          color: $color-text;
          margin-left: 10px;
          @include no-wrap();
        }
        .clear, .add {
          @include extend-click();
          flex: 0.2;
          .iconfont {
            font-size: 22px;
            color: $color-text1;
          }
        }
      }
    }
    .list-content {
      max-height: 280px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: 14px;
          color: $color-red;
        }
        .text {
          flex: 1;
          font-size: 16px;
          color: $color-text;
          @include no-wrap();
          .singer {
            color: $color-text3;
            font-size: 10px;
            padding-left: 2px;
            @include no-wrap();
          }
        }
        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: 16px;
          color: $color-text2;
          .iconfont {
            color: $color-text3;
          }
        }
        .delete {
          // @include extend-click();
          color: $color-text3;
          .icon-chacha {
            font-size: 15px;
          }
          &.disable {
            color: $color-text;
          }
        }
      }
    }
    .list-footer {
      text-align: center;
      line-height: 50px;
      background: $color-bgc1;
      font-size: 17px;
      color: $color-text;
    }
  }
}
</style>
