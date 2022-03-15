<template>
  <div class="collect">
    <menu-nav :navTitle="'我的收藏'"></menu-nav>
    <scroll class="scroll-content">
      <div v-no-result:[noResultText]="noResult">
        <song-nav
          v-if="favoriteList.length"
          class="song-nav"
          :trackCount="favoriteList.length"
          @click="selectAll"
        ></song-nav>
        <song-item :songList="favoriteList" @select="selectSong"></song-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import MenuNav from "@/components/context/menuNav/MenuNav.vue";
import SongNav from "@/components/context/songItem/SongNav";
import SongItem from "@/components/context/songItem/SongItem";
import scroll from "components/common/scroll/scroll.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "myCollection",
  components: {
    MenuNav,
    SongNav,
    SongItem,
    scroll,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["favoriteList"]),

    noResult() {
      return !this.favoriteList.length;
    },
    noResultText() {
      return "暂无收藏歌曲";
    },
  },
  methods: {
    ...mapActions(["addSong", "selectPlay"]),

    selectSong({ song }) {
      this.addSong(song);
    },
    selectAll({ item, index }) {
      this.selectPlay({ list: this.favoriteList, index });
    },
  },
};
</script>

<style lang="scss" scoped>
.collect {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-bgc1;
  .scroll-content {
    height: 100%;
    overflow: hidden;
  }
}
</style>