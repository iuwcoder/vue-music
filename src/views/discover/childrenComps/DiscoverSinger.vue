<template>
  <div class="discover-singer">
    <div class="top-title">
      <div class="title">热门歌手</div>
      <div class="more" @click="more">更多</div>
    </div>
    <div class="content">
      <div
        class="singer-item"
        @click="toSinger(item.accountId)"
        v-for="(item, index) in singerList"
        :key="index"
      >
        <div class="img">
          <img :src="item.picUrl" alt="" />
          <div class="tag">
            <i class="iconfont icon-logo"></i>
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotSinger } from "network/discover";

export default {
  name: "DiscoverSinger",
  components: {},
  data() {
    return {
      offset: 0,
      singerList: [],
    };
  },
  methods: {
     toSinger(id) {
        this.$router.push("/Detail/" + id);      
    },
    more() {
      this.$router.push("/discover/moreSinger/");
    },
  },
  created() {
    getHotSinger(9, this.offset * 9).then((res) => {
      for (const item of res.data.artists) {
        this.singerList.push({
          accountId: item.accountId,
          // id: item.id,
          name: item.name,
          picUrl: item.img1v1Url,
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.discover-singer {
  margin-top: 15px;
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
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 8px 0;
    .singer-item {
      width: 29%;
      height: 120px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: $boxshaow;
      margin-bottom: 8px;
      .img {
        width: 80px;
        height: 80px;
        margin: 10px auto 5px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .tag {
          position: absolute;
          right: 5px;
          bottom: 5px;
          background-color: $color-red;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont {
            color: #fff;
            font-size: 12px;
            transform: calc(0.9);
          }
        }
      }
      .name {
        @include no-wrap();
        text-align: center;
        font-size: 13px;
      }
    }
  }
}
</style>