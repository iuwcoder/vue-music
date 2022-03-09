<template>
  <div class="discover-sheet" v-loading="!sheetList.length">
    <div class="top-title">
      <div class="title">推荐歌单</div>
      <div class="more" @click="Sheet">更多</div>
    </div>
    <div class="content">
      <div
        class="sheet-item"
        v-for="(item, index) in sheetList"
        :key="index"
        @click="toSheet(item.id)"
      >
        <sheet-item :sheetItem="item"></sheet-item>
      </div>
    </div>
  </div>
</template>

<script>
import SheetItem from "components/context/sheetItem/SheetItem";
// import scroll from "components/common/scroll/scroll.vue";

import { toStringNum } from "common/common";
import { getHotSheet } from "network/discover";

export default {
  name: "DiscoverSheet",
  components: {
    SheetItem,
    // scroll,
  },
  data() {
    return {
      sheetList: [],
    };
  },
  methods: {
    toSheet(id) {
      this.$router.push("/SheetInfo/" + id + '&' + true);
    },
    Sheet() {
      this.$router.push("/discover/moreSheet");
    },
  },
  created() {
    getHotSheet().then((res) => {
      for (const item of res.data.playlists) {
        this.sheetList.push({
          id: item.id,
          rcmdtext: item.name,
          picUrl: item.coverImgUrl,
          playCount: toStringNum(item.playCount),
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.discover-sheet {
  padding-top: 15px;
  border-top: $border-line;
  border-bottom: $border-bottom;
  // display: -webkit-box;
  // overflow-x: auto;
  // height: 190px;
  .top-title {
    width: 100%;
    display: flex;
    .title {
      flex: 1;
      margin-left: 12px;
      font-size: 16px;
      font-weight: 550;
      line-height: 25px;
    }
    .more {
      margin-right: 12px;
      width: 40px;
      height: 22px;
      border: 1px solid #919090;
      border-radius: 22px;
      line-height: 22px;
      text-align: center;
      font-size: 12px;
    }
  }
  .content {
    display: flex;
    .sheet-item {
      margin: 7px 5px;
    }
  }
}
</style>