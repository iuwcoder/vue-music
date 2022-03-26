<template>
  <div class="user-menu">
    <div class="menu">
      <div class="top">
        <div class="box1" @click="myPlayed">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-bofang"></i>
          </div>
          <div class="text">最近播放</div>
        </div>
        <div class="box1">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-xiazai2"></i>
          </div>
          <div class="text">本地音乐</div>
        </div>
        <div class="box1" @click="myDisk">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-yunpan"></i>
          </div>
          <div class="text">云盘</div>
        </div>
        <div class="box1">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-yigou"></i>
          </div>
          <div class="text">已购</div>
        </div>
      </div>
      <div class="bottom">
        <div class="box2" @click="myCollection">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-shoucang"></i>
          </div>
          <div class="text">收藏和赞</div>
        </div>
        <div class="box2" @click="myFollow">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-guanzhu"></i>
          </div>
          <div class="text">我的关注</div>
        </div>

        <div class="box2" @click="myRadioStation">
          <div class="icon iconbox">
            <i class="iconfont menuIcon icon-diantai"></i>
          </div>
          <div class="text">我的电台</div>
        </div>
        <div class="box2">
          <div class="icon iconbox">
            <i class="iconfont moreIcon menuIcon icon-add"></i>
          </div>
          <div class="text">音乐应用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMessageMenu",
  methods: {
    myPlayed() {
      this.$router.push("/userCenter/played/" + this.$store.state.userId);
    },
    myRadioStation() {},

    myFollow() {
      this.$router.push("/userCenter/myFollow/");
    },

    myDisk() {},

    myCollection() {
      this.$router.push("/userCenter/myCollection/")

      // if (!this.$store.state.cookie) {
      //   this.$toast.show("您需要先登录哦", 1900);
      //   this.$router.push("/myMessage/login");
      // } else {
      //   this.$router.push("/myMessage/collection");
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.user-menu {
  /* width: 100%; */
  height: 150px;
  border-radius: 8px;
  margin-top: 15px;
  overflow: hidden;
  font-size: 13px;
  text-align: center;
  background-color: #fff;
  padding: 5px;
  // box-shadow: $boxshaow;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu {
  width: 97%;
}
.top {
  width: 100%;
  height: 50%;
  display: flex;
  margin-top: 7px;
}
.bottom {
  width: 100%;
  height: 50%;
  display: flex;
  margin-top: 15px;
}
.bottom img {
  width: 28px;
}
.box1 {
  flex: 1;
  position: relative;
  height: 57px;
}
.box2 {
  flex: 1;
  position: relative;
  height: 54px;
}
.icon {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
  color: $color-text2;
}
.menuIcon {
  font-size: 27px;
  color: $color-red;
}
.moreIcon {
  color: #b6b6b6 !important;
}
</style>