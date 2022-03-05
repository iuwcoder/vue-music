<template>
  <div class="login">
    <div class="close" @click="close">
      <i class="iconfont icon-close"></i>
    </div>
    <div class="logo">
      <img src="~assets/img/common/login.png" alt="" />
    </div>
    <div class="loginType">
      <div @click="phoneLogin" class="phoneLogin">
        <span>手机号登录</span>
      </div>
      <div class="text" @click="close">
        <span>立即体验</span>
      </div>
      <div class="list">
        <div class="item">
          <div class="box">
            <i class="iconfont icon-QQ"></i>
          </div>
        </div>
        <div class="item">
          <div class="box">
            <i class="iconfont icon-weixin"></i>
          </div>
        </div>
        <div class="item">
          <div class="box">
            <i class="iconfont icon-weibo"></i>
          </div>
        </div>
        <!-- <div class="item">
          <div class="box">
            <i class="iconfont icon-youxiang"></i>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    close() {
      this.$router.push("/discover");
    },
    // 手机登录组件
    phoneLogin() {
      this.$router.push("/userCenter/login/phoneLogin");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #bd3126;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 51;
  .close {
    margin: 18px 0 0 18px;
    .icon-close {
      color: $color-bgc1;
      font-size: 20px;
    }
  }
  .logo {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 25%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(230, 228, 228, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .loginType {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    .phoneLogin,
    .text {
      width: 260px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      border-radius: 40px;
    }
    .phoneLogin {
      background-color: $color-bgc1;
      color: #da231b;
    }
    .text {
      margin-top: 20px;
      color: $color-bgc1;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .list {
      padding-top: 20px;
      width: 80%;
      height: 50px;
      margin: 0 auto;
      display: flex;
      .item {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;

          .iconfont {
            color: rgba(255, 255, 255, 0.856);
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>