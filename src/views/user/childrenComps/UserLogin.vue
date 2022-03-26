<template>
    <div class="box" @click="detail">
      <div class="user-login">
        <div class="user-img">
          <img :src="avatarUrl" alt="" />
        </div>
        <div class="user-detail">
          <div class="text">{{ nickName }}</div>
          <div class="level">lv{{ level }}</div>
        </div>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </div>
</template>

<script>
import { getUserDetail } from "network/user"; // 用户信息

export default {
  name: "UserLogin",
  data() {
    return {
      level: "",
      avatarUrl: "",
      nickName: "",
    };
  },
  methods: {
    detail() {
      this.$router.push("/Detail/" + this.$store.state.userId);
    }
  },
  created() {
    // 441939758
    getUserDetail(this.$store.state.userId).then((res) => {
      console.log(res);
      this.level = res.data.level;
      this.listenSongs = res.data.listenSongs;
      this.nickName = res.data.profile.nickname; // 用户名
      this.avatarUrl = res.data.profile.avatarUrl; // 头像
      this.backgroundUrl = res.data.profile.backgroundUrl; // 背景图
    });
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-top: 20px;
  border-radius: 12px;
  background-color: $color-bgc1;
  box-shadow: $boxshaow;
  padding: 8px;
  .user-login {
    width: 100%;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    
    .user-img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      float: left;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        float: left;
      }
    }
    .user-detail {
      margin-left: 10px;
      .text {
        font-size: 14px;
        margin-bottom: 7px;
        // @include no-wrap();
      }
      .level {
        background-color: $color-bgc1;
        border-radius: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        padding: 0 6px;
        float: left;
        font-size: 11px;
        box-shadow: $boxshaow;
      }
    }
    .icon-gengduo {
      position: absolute;
      right: 5px;
      font-size: 15px;
      color: $color-text2;
    }
  }
}
</style>