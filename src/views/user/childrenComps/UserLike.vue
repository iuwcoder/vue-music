<template>
  <div class="user-like" @click="sheetInfo(this.likeId)">
    <div class="bbox">
      <div class="box">
        <div class="left1">
          <i class="iconfont icon-xihuan"></i>
        </div>
        <div class="center">
          <div>
            <div class="listName">我喜欢的音乐</div>
            <div class="count">{{ trackCount }}首</div>
          </div>
        </div>
        <div class="right">
          <div class="loveMode">
            <div class="rightBox">
              <i class="iconfont icon-xindong"></i>
              <div class="title">心动模式</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserPlayList } from "network/user"; // 用户信息

export default {
  name: "UserLike",
  data() {
    return {
      likeId: "",
      trackCount: "",
    };
  },
  methods: {
    sheetInfo(id) {
      this.$router.push("/SheetInfo/" + id); // 跳转到歌单页面
    },
  },
  created() {
    getUserPlayList(this.$store.state.userId).then((res) => {
      this.likeId = res.data.playlist[0].id;
      this.trackCount = res.data.playlist[0].trackCount;
      console.log(this.likeId);
    });
  },
};
</script>

<style lang="scss" scoped>
.user-like {
  width: 100%;
  height: 80px;
  background-color: $color-bgc1;
  border-radius: 8px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  // box-shadow: $boxshaow;
  .bbox {
    margin: 0 auto;
    width: 95%;
    height: 50px;
    .box {
      display: flex;
      .left1 {
        margin-left: 7px;
        flex: 1.45;
        height: 50px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #ebcece;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-xihuan {
          font-size: 24px;
          color: $color-red;
        }
      }
    }
    .center {
      flex: 5;
      display: flex;
      align-items: center;
      .listName {
        margin-left: 10px;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
      }
      .count {
        margin-left: 10px;
        font-size: 12px;
        height: 15px;
        line-height: 15px;
        color: $color-text4;
      }
    }
    .right {
      flex: 3;
      display: flex;
      align-items: center;
      .loveMode {
        width: 85px;
        height: 23px;
        border-radius: 15px;
        margin: 0 auto;
        border: 1px solid #cdcdcd;
        display: flex;
        align-items: center;
        .rightBox {
          width: 80%;
          margin: 0 auto;
          text-align: center;
          .icon-xindong {
            font-size: 15px;
            color: $color-red;
            float: left;
          }
          .title {
            font-size: 12px;
            color: $color-text3;
          }
        }
      }
    }
  }
}
</style>