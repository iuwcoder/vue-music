<template>
  <div class="more-sheet">
    <menu-nav class="menu-nav" :navTitle="'歌单广场'"></menu-nav>
    <van-tabs
      @click-tab="tabToggle"
      class="tab"
      background="#f5f5f5"
      title-active-color="#e93d34"
      animated
      swipeable
    >
      <van-tab
        v-for="(item, index) in tagsList"
        :title="item"
        :key="index"
        class="tab-item"
      >
      </van-tab>
    </van-tabs>
    <scroll class="sheet-content">
      <div class="content">
        <div
          class="sheet-item"
          v-for="(item, index) in sheetDetail"
          :key="index"
          :isSheet="true"
          @click="toClick(item.id)"
        >
          <sheet-item :sheetItem="item"></sheet-item>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import MenuNav from "@/components/common/menuNav/MenuNav.vue";
import SheetItem from "components/context/sheetItem/SheetItem";
import scroll from "components/common/scroll/scroll.vue";

import { toStringNum } from "common/common";
import { getHotSheet, getSheetTags } from "network/discover";

export default {
  name: "moreSheet",
  components: {
    MenuNav,
    SheetItem,
    scroll,
  },
  data() {
    return {
      tagsList: ["全部"], //歌单分类列表
      sheetDetail: [], // 歌单信息
      offset: 0,
      index: 0, // 切换索引
      more: true, // 查看是否更多数据
      active: 0,
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 歌单详情页跳转
    toClick(id) {
      this.$router.push("/SheetInfo/" + id + '&' + true);
      // this.$router.push("/SheetInfo/" + id + "&" + false);
    },

    tabToggle(index) {
      if (this.index !== index) {
        this.sheetDetail = []; // 清空数据
        this.getSheet(index);
      }
      this.index = index;``
    },

    // 获取歌单
    getSheet(index) {
      if (this.more) {
        getHotSheet("hot", this.tagsList[index], 30, this.offset * 30).then(
          (res) => {
            this.more = res.data.more;
            for (const item of res.data.playlists) {
              this.sheetDetail.push({
                id: item.id, // 歌单id
                rcmdtext: item.name, // 歌单名称
                picUrl: item.coverImgUrl, // 封面
                playCount: toStringNum(item.playCount), // 播放量
              });
            }
            // this.$loading.loadingNo();
            this.offset++;
          }
        );
      }
    },
  },
  created() {
    // 标签栏
    getSheetTags().then((res) => {
      for (const item of res.data.tags) {
        this.tagsList.push(item.name);
      }
    });

    // 获取全部歌单数据
    getHotSheet("hot", "全部", 30, this.offset * 30).then((res) => {
      for (const item of res.data.playlists) {
        this.sheetDetail.push({
          id: item.id, // 歌单id
          rcmdtext: item.name, // 歌单名称
          picUrl: item.coverImgUrl, // 封面
          playCount: toStringNum(item.playCount), // 播放量
        });
      }
      this.offset++;
    });
  },
};
</script>

<style lang="scss" scoped>
.more-sheet {
  height: 100vh;
  background-color: $color-bgc;
  .menu-nav {
    background-color: $color-bgc;
    border: none;
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
  }
  // .tab {
  //   width: 100%;
  //   .tab-item {
  //   }
  // }
  .sheet-content {
    height: 100%;
    overflow: hidden;
    .content {
      border-top: $border-bottom;
      width: 100%;
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      .sheet-item {
        margin-bottom: 7px;
      }
    }
  }
}
</style>