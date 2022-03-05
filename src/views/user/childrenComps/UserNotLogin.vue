<template>
  <router-link to="/userCenter/login" tag="div">
    <div class="box">
    <div class="user-login">
      <i class="iconfont icon-yonghu"></i>
      <span class="text">{{ userName }}</span>
      <i class="iconfont icon-gengduo"></i>
    </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "UserNotLogin",
  data() {
    return {
      userName: "未登录",
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: $color-bgc1;
  box-shadow: $boxshaow;
  padding: 8px;
  border-radius: 12px;
  .user-login {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    position: relative;
    .userImg {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      float: left;
      margin-left: 10px;
      line-height: 45px;
    }
    .text {
      font-size: 15px;
      margin-left: 10px;
      line-height: 45px;
      color: $color-text2;
    }
    .icon-gengduo {
      position: absolute;
      right: 5px;
      font-size: 15px;
      color: $color-text2;
    }
    .icon-yonghu {
      margin-left: 5px;
      position: relative;
      top: 2px;
      color: $color-red;
      font-size: 40px;
    }
  }
}
</style>