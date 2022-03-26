<template>
  <div class="songList">
    <div
      class="songSheet1"
      v-for="(item, index) in sheetList"
      :key="index"
      @click="selectItem(item, index)"
    >
      <div
        class="songSheet"
        v-if="
          sheet === 'my'
            ? item.creator === nickName && index !== 0
            : item.creator !== nickName
        "
      >
        <div class="left">
          <img :src="item.img" alt="" />
        </div>
        <div class="center" @click="sheetInfo(item.id)">
          <div class="sheetDetail">
            <div class="listName">{{ item.name }}</div>
            <div class="count">
              {{ item.trackCount }}首
              {{ item.creator !== nickName ? " by " + item.creator : "" }}
            </div>
          </div>
        </div>
        <div class="right" @click="delet()">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
    <song-pop
      ref="deleteSheetRef"
      :deSheet="sheetList"
      @deleteSheet="deleteSheet"
    ></song-pop>
  </div>
</template>

<script>
import SongPop from "@/components/context/sheet/SongPop";

export default {
  name: "UserSheetList",
  props: ["sheetList", "nickName", "sheet"],
  components: {
    SongPop,
  },
  methods: {
    sheetInfo(id) {
      this.$router.push("/SheetInfo/" + id + "&" + 'true'); // 跳转到歌单页面
    },

    selectItem({ sheet, index }) {
      this.$emit("select", { sheet, index });
    },

    // 展示删除歌单
    delet() {
      console.log(this.sheetList.id);
      this.$refs.deleteSheetRef.showPopup();
    },

    deleteSheet() {
      // this.sheetList.shift()
    },
  },
};
</script>
<style lang="scss" scoped>
.left {
  border-radius: 8px;
  overflow: hidden;
  height: 50px;
  width: 52px;
}
.left img {
  width: 100%;
  height: 100%;
}
.sheetDetail {
  margin-left: 10px;
}
.listName {
  width: 220px;
  height: 22px;
  line-height: 22px;
  font-size: 15px;
  @include no-wrap();
}
.count {
  font-size: 12px;
  height: 15px;
  display: flex;
  align-items: center;
  color: #aaaaaa;
}
.center {
  flex: 1;
  display: flex;
  align-items: center;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.right .icon-sandian {
  position: absolute;
  right: 0;
  font-size: 16px;
  color: #aaaaaa;
}
.songSheet {
  width: 100%;
  height: 55px;
  display: flex;
  /* position: relative;
  top: 5px; */
  margin-top: 9px;
}
</style>