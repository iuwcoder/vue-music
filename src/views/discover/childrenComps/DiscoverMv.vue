<template>
  <div class="discover-mv">
    <div class="top-title">
      <div class="title">最新MV</div>
      <!-- <div class="more">更多</div> -->
    </div>
    <div class="content">
      <div class="content-item" v-for="(item, index) in mvList" :key="index">
        <div class="top-img">
          <img :src="item.cover" alt="" />
          <div class="count">▷ {{ item.playCount }}</div>
        </div>
        <div class="text">
          <div class="name">{{ item.name }}</div>
          <div class="artist-name">{{ item.artistName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewMv } from "network/discover";
import { toStringNum } from "common/common";

export default {
  name: "DiscoverMv",
  components: {},
  data() {
    return {
      mvList: [],
    };
  },
  methods: {},
  created() {
    getNewMv("", 9).then((res) => {
      for (const item of res.data.data) {
        this.mvList.push({
          id: item.id,
          name: item.name, // mv名称
          cover: item.cover, // mv封面
          artistName: item.artistName, // 创作者
          playCount: toStringNum(item.playCount), // 播放量
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.discover-mv {
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: $border-bottom;
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
    margin-top: 10px;
    .content-item {
      margin-left: 10px;
      .top-img {
        width: 160px;
        height: 120px;
        border-radius: 7px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .count {
          position: absolute;
          top: 5px;
          right: 5px;
          color: #fff;
          font-size: 12px;
        }
      }
      .text {
        margin-top: 7px;
        margin-left: 3px;
        .name {
          font-size: 14px;
        }
        .artist-name {
          font-size: 10px;
          color: $color-text1;
          padding-top: 3px;
        }
      }
    }
  }
}
</style>