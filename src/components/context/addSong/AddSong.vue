<template>
  <teleport to="body">
    <transition name="slide">
      <div class="add-song" v-show="visible">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
        <div class="search-input-wrapper">
          <search-input
            v-model="query"
            placeholder="搜索歌曲"
            :showBack="false"
            :showSearch="true"
          ></search-input>
        </div>
        <div v-show="!query">
          <switches
            :items="['最近播放', '搜索历史']"
            v-model="currentIndex"
          ></switches>
          <div class="list-wrapper">
            <scroll
              ref="scrollRef"
              class="list-scroll"
              v-if="currentIndex === 0"
            >
              <song-item
                :songList="playHistory"
                @select="selectSongBySongList"
              ></song-item>
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
import SearchInput from "@/views/search/childrenComps/SearchInput.vue";
import Suggest from "@/views/search/childrenComps/Suggest.vue";
import Switches from "@/components/common/switches/switches.vue";
import SongItem from "@/components/context/songItem/SongItem";
import Message from "@/components/common/message/message.vue";
import scroll from "components/common/scroll/scroll.vue";
import useSearchHistory from "@/views/search/childrenComps/use-search-history";

import { useStore } from "vuex";
import { computed, ref, nextTick, watch } from "vue";

export default {
  name: "AddSong",
  components: {
    SearchInput,
    Suggest,
    Switches,
    SongItem,
    Message,
    scroll,
  },
  setup() {
    const visible = ref(false); //页面展示
    const query = ref(""); //搜索词
    const currentIndex = ref(0); //切换导航
    const scrollRef = ref(null);
    const messageRef = ref(null); //消息弹窗

    const store = useStore();
    const searchHistory = computed(() => store.state.searchHistory);
    const playHistory = computed(() => store.state.playHistory);

    const { saveSearch } = useSearchHistory();

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

    function selectSongBySongList({ song }) {
      addSong(song);
    }

    function addSong(song) {
      store.dispatch("addSong", song);
      showMessage();
    }

    // 展示添加成功消息弹窗
    function showMessage() {
      messageRef.value.show();
      saveSearch()
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
  z-index: 300;
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
      right: 8px;
      .icon-close {
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
  .list-wrapper {
    position: absolute;
    top: 165px;
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