<template>
  <div class="songList">
    <div
      class="songSheet1"
      @click="sheetInfo(item.id)"
      v-for="(item, index) in sheetList"
      :key="index"
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
        <div class="center">
          <div class="sheetDetail">
            <div class="listName">{{ item.name }}</div>
            <div class="count">
              {{ item.trackCount }}首
              {{ item.creator !== nickName ? " by " + item.creator : "" }}
            </div>
          </div>
        </div>
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSheetList",
  props: ["sheetList", "nickName", "sheet"],
  methods: {
    sheetInfo(id) {
      this.$router.push("/SheetInfo/" + id + '&' + true); // 跳转到歌单页面
    },
  },
};
</script>
<style scoped>
.left {
  flex: 1.5;
  border-radius: 8px;
  overflow: hidden;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.count {
  font-size: 12px;
  height: 15px;
  display: flex;
  align-items: center;
  color: #aaaaaa;
}
.center {
  flex: 7.5;
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
  height: 45px;
  display: flex;
  /* position: relative;
  top: 5px; */
  margin-top: 9px;
}
</style>