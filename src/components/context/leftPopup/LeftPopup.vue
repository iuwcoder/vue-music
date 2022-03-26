<template>
  <van-popup
    class="popup"
    teleport="body"
    position="left"
    :style="{ width: '80%', height: '100%', backgroundColor: '#f5f5f5' }"
    v-model:show="show"
  >
    <div class="user-content" v-if="this.$store.state.userId !== ''" @click="detail">
      <div class="user-img">
        <img :src="avatarUrl" alt="" />
      </div>
      <div class="user-detail">
        <div class="text">{{ nickName }}</div>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </div>
    <div v-else class="user-content" @click="login">
      <div class="user-img">
        <i class="iconfont icon-yonghu"></i>
      </div>
      <div class="user-detail">
        <div class="text">未登录</div>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </div>
    <div class="close">
      <van-button
        class="btn"
        plain
        color="#ff4b41"
        type="primary"
        block
        @click="exit"
        >退出登录</van-button
      >
    </div>
  </van-popup>
</template>

<script>
import { getUserDetail } from "network/user"; // 用户信息
import { refreshLogin } from "network/login";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "LeftPopup",
  data() {
    return {
      show: false,
      level: "",
      avatarUrl: "",
      nickName: "",
    };
  },
  methods: {
    ...mapMutations(["changeLogin", "setUserId", "setCookie"]),
    ...mapActions(["clearSongList"]),

    showPopup() {
      this.show = true;
    },

    // 个人详情
    detail() {
      this.$router.push("/Detail/" + this.$store.state.userId);
    },

    // 未登录
    login() {
      this.clearSongList();
      this.$router.push("/login");
    },

    // 退出
    exit() {
      localStorage.clear("token");
      this.setUserId("");
      this.changeLogin("");
      this.setCookie("");
      this.clearSongList();
      this.$router.push("/login");
    },
  },
  created() {
    getUserDetail(this.$store.state.userId).then((res) => {
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
.popup {
  position: relative;
  background-color: #bfa;
  .user-content {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 10px;
    .user-img {
      width: 35px;
      height: 35px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .icon-yonghu {
        font-size: 35px;
        color: $color-red;
      }
    }
    .user-detail {
      margin-left: 10px;
      display: flex;
      align-items: center;
      .text {
        color: $color-text;
        font-size: 16px;
      }
      .icon-gengduo {
        margin-left: 5px;
        font-size: 13px;
        color: $color-text2;
      }
    }
  }
  .close {
    position: absolute;
    width: 94%;
    bottom: 20px;
    .btn {
      margin-left: 3%;
      border-radius: 10px;
      border: 0;
      font-size: 16px;
    }
  }
}
</style>
