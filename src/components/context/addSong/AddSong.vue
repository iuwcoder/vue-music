<template>
  <teleport to="body">
    <transition name="slide">
      <div class="add-song" v-show="visible">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide">
            <i class="iconfont icon-fanhui"></i>
          </div>
        </div>
        <div class="search-input-wrapper">
          <enter-input
            v-model="query"
            placeholder="搜索歌曲"
            :showBack="false"
            :showSearch="true"
          ></enter-input>
        </div>
        <div v-show="!query">
          <div class="title-1">
            <span>最近播放</span>
          </div>
          <!-- <switches
            :items="['最近播放', '搜索历史']"
            v-model="currentIndex"
          ></switches> -->
          <div class="list-wrapper">
            <scroll
              ref="scrollRef"
              class="list-scroll"
              v-if="currentIndex === 0"
            >
              <div v-if="AddSheet">
                <song-item
                  :songList="playHistory"
                  @select="sheetSongBySongList"
                ></song-item>
              </div>
              <div v-else>
                <song-item
                  :songList="playHistory"
                  @select="selectSongBySongList"
                ></song-item>
              </div>
            </scroll>
          </div>
        </div>
        <div class="search-result" v-show="query">
          <suggest :query="query"></suggest>
        </div>
        <message ref="messageRef">
          <div class="message-title">
            <span class="text">已添加到播放列表</span>
          </div>
        </message>
      </div>
    </transition>
  </teleport>
</template>

<script>
import EnterInput from "@/components/context/enterInput/EnterInput.vue";
import Suggest from "@/views/search/childrenComps/Suggest.vue";
import Switches from "@/components/common/switches/switches.vue";
import SongItem from "@/components/context/songItem/SongItem";
import Message from "@/components/common/message/message.vue";
import scroll from "components/common/scroll/scroll.vue";

import useSearchHistory from "@/views/search/childrenComps/use-search-history";
import useSheetSong from "./use-sheet-song";

import { getTracksSheet } from "@/network/sheet";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, ref, nextTick, watch } from "vue";

export default {
  name: "AddSong",
  components: {
    EnterInput,
    Suggest,
    Switches,
    SongItem,
    Message,
    scroll,
  },
  props: {
    AddSheet: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const visible = ref(false); //页面展示
    const query = ref(""); //搜索词
    const currentIndex = ref(0); //切换导航
    const scrollRef = ref(null); // scroll实例
    const messageRef = ref(null); //消息弹窗
    const op = ref(null); //增加 add, 删除为 del
    const sheetId = ref(null); // 路由传过来的歌单id

    const router = useRouter();

    const store = useStore();
    const searchHistory = computed(() => store.state.searchHistory);
    const playHistory = computed(() => store.state.playHistory);
    const cookie = computed(() => store.state.cookie);

    // const { saveSheet } = useSearchHistory();
    const { saveSheet } = useSheetSong();

    watch(query, async () => {
      await nextTick();
      refreshScroll();
    });

    async function show() {
      visible.value = true;
      await nextTick();
      refreshScroll();
    }
    function hide() {
      visible.value = false;
    }

    function refreshScroll() {
      scrollRef.value.scroll.refresh();
    }

    // 添加歌曲到播放列表
    function selectSongBySongList({ song }) {
      addSong(song);
    }

    function addSong(song) {
      store.dispatch("addSong", song);
      showMessage();
    }
    // 添加歌曲到歌单
    function sheetSongBySongList({ song }) {      
      op.value = "add";
      sheetId.value = router.currentRoute.value.params.id
      getTracksSheet(op.value, sheetId.value, song.id, cookie.value).then(
        (res) => {
          // saveSheet(song); // 存储到本地中
          console.log(res);
        }
      );
      showMessage();
    }

    // 展示添加成功消息弹窗
    function showMessage() {
      messageRef.value.show();
      // saveSearch()
    }

    return {
      // data
      visible,
      query,
      currentIndex,
      scrollRef,
      messageRef,
      // vuex
      searchHistory,
      playHistory,
      // methods
      show,
      hide,
      selectSongBySongList,
      sheetSongBySongList,

      saveSheet,
    };
  },
};
</script>

<style lang="scss" scoped>
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 3000;
  height: 100vh;
  background-color: $color-bgc1;
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: 20px;
      color: $color-text;
    }
    .close {
      position: absolute;
      top: 0;
      left: 8px;
      .icon-fanhui {
        display: block;
        padding: 12px;
        font-size: 18px;
        color: $color-text;
      }
    }
  }
  .search-input-wrapper {
    margin: 15px 20px;
  }
  .title-1 {
    width: 100%;
    margin: 20px 0 0 20px;
    font-size: 15px;
    color: $color-text1;
  }
  .list-wrapper {
    position: absolute;
    top: 150px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
    }
  }
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
  .message-title {
    font-size: 0;
    .text {
      font-size: 16px;
      color: $color-text;
    }
  }
}
</style>