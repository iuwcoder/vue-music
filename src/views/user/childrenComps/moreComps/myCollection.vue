<template>
  <div class="collect">
    <menu-nav :navTitle="'最近播放'"></menu-nav>
    <div v-no-result:[noResultText]="noResult">
      <song-nav
        v-if="this.favoriteList.length"
        class="song-nav"
        :trackCount="favoriteList.length"
        @click="select"
      ></song-nav>
      <song-item :songList="favoriteList" @select="selectSong"></song-item>
    </div>
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
    select() {
      this.selectPlay(this.favoriteList)
    }
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
}
</style>