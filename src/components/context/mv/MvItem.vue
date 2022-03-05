<template>
  <div class="mv-box">
    <div
      class="mv-item"
      @click="toplay(item.id)"
      v-for="(item, index) in videoList"
      :key="index"
    >
      <div class="mv-img">
        <img v-lazy="item.imgurl16v9" alt="" />
        <div class="dur">{{ item.duration }}</div>
      </div>
      <div class="mv-content">
        <div class="mv-detail">
          <div class="mv-name">{{ item.name }}</div>
          <div class="push-time">{{ item.publishTime }}</div>
          <div class="count">{{ item.playCount }}播放</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvList",
  props: {
    videoList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toPlay(id) {
      this.$router.push("/mvplay/" + id + "&" + this.isMv);
    },
  },
};
</script>

<style lang="scss" scoped>
.mv-box {
  .mv-item {
    margin: 15px 0;
    height: 90px;
    display: flex;

    .mv-img {
      width: 150px;
      height: 90px;
      flex: 4.5;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      .dur {
        color: $color-bgc;
        font-size: 10px;
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    }
    .mv-content {
      flex: 5.5;
      height: 90px;
      line-height: 90px;
      margin-left: 10px;
      .mv-detail {
        // 文本居中
        display: inline-block;
        vertical-align: middle;
        line-height: 18px;
        .mv-name {
          // 文本显示为两行
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 15px;
          margin-bottom: 7px;
        }
        .push-time,
        .count {
          // margin-top: 5px;
          font-size: 12px;
          color: $color-text3;
        }
      }
    }
  }
}
</style>