<template>
  <div class="item-list">
    <div class="left">
      <div
        v-if="showDiv"
        :style="{ backgroundColor: showDivColor }"
        class="no-sheet"
      >
        <i class="iconfont" :style="{ color: iconColor }" :class="showImg"></i>
      </div>
      <img class="sheet-img" v-else :src="sheetImg" alt="" />
    </div>
    <div class="center">
      <div class="center-box">
        <div class="title">{{ title }}</div>
        <div class="count">{{ songCount }} {{ playCount }}</div>
      </div>
    </div>
    <div class="right" v-if="isRight"></div>
  </div>
</template>

<script>
import "assets/icon/Information.css";

export default {
  name: "ItemList",
  props: {
    // 不显示歌曲封面的div
    showDiv: {
      type: Boolean,
      default: false,
    },
    showDivColor: {
      type: String,
      default: "red",
    },
    // 不显示歌曲封面时的图片
    showImg: {
      type: String,
      default: "",
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: "#fff",
    },
    // 歌曲封面
    sheetImg: {
      type: String,
      default: "",
    },
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 歌曲数量
    songCount: {
      type: String,
      default: "",
    },
    // 播放量
    playCount: {
      type: String,
      default: "",
    },
    // 是否显示右侧div
    isRight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  height: 45px;
  display: flex;
  margin-bottom: 8px;
  .left {
    flex: 1.3;
    height: 45px;
    width: 45px;
    border-radius: 8px;
    .no-sheet {
      border-radius: 8px;
      height: 45px;
      width: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .sheet-img {
      height: 45px;
      width: 45px;
      border-radius: 8px;
    }
  }
  .center {
    flex: 7;
    display: flex;
    align-items: center;
    .center-box {
      .title {
        font-size: 14px;
        width: 270px;
        margin-bottom: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .count {
        font-size: 12px;
        color: $color-text1;
        width: 270px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .right {
    flex: 1.5;
  }
}
</style>