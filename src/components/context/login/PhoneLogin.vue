<template>
  <div class="phone-login">
    <menu-nav class="menu-nav" :navTitle="'手机号登录'"></menu-nav>
    <div class="box">
      <div class="tel">
        <div class="text">
          <span>手机号：</span>
        </div>
        <div class="ipt">
          <input v-model="tel" type="text" placeholder="请输入手机号码" />
        </div>
      </div>
      <div class="pwd">
        <div class="text">
          <span>密码：</span>
        </div>
        <div class="ipt">
          <input v-model="password" type="password" placeholder="请输入密码" />
        </div>
      </div>
    </div>
    <van-button class="btn" color="#da231b" type="primary" block @click="login"
      >登录</van-button
    >
  </div>
</template>

<script>
import MenuNav from "@/components/context/menuNav/MenuNav.vue";

import { phoneLogin} from "network/login"; // 网络请求

import { mapMutations } from "vuex";

export default {
  name: "PhoneLogin",
  components: {
    MenuNav,
  },
  data() {
    return {
      tel: "", // 手机号
      password: "", // 密码
      id: "",
      users: [],
      playlist: [],
    };
  },
  methods: {
    ...mapMutations(["changeLogin", "setUserId"]),
    login() {
      let reg = /^1[3-8][0-9]{9}$/;
      if (reg.test(this.tel)) {
        phoneLogin(this.tel, this.password)
          .then((res) => {
            console.log(res);
            if (res.data["code"] === 200) {
              this.userToken = res.data.token;
              this.changeLogin(this.userToken);
              this.userId = res.data.profile.userId;
              this.setUserId(this.userId);
              this.$router.push("/discover");
              console.log("成功");
            }
          })
          .catch((err) => {
            console.log("错误");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.phone-login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-bgc1;
  z-index: 52;
  .menu-nav {
    border: none;
  }
  .box {
    margin: 20px;
    height: 90px;
    .tel,
    .pwd {
      width: 100%;
      height: 40px;
      margin-top: 5px;
      display: flex;
      align-items: center;
      border-bottom: $border-line;
      .text {
        font-size: 16px;
        flex: 2;
        span {
          float: right;
        }
      }
      .ipt {
        flex: 7;
        margin-left: 5px;
        input {
          border: 0;
          height: 35px;
          font-size: 15px;
        }
      }
    }
  }
  .btn {
    width: 94%;
    margin-left: 3%;
    border-radius: 40px;
    font-size: 16px;
  }
}
</style>