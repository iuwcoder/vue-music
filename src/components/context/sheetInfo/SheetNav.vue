<template>
  <div class="sheet-nav">
    <div class="item" @click="toSub">
      <div class="iconfont">
        <i class="iconfont icon-tianjia"></i>
      </div>
      <div class="text">{{ sheetNav.subCount }}</div>
    </div>
    <span>|</span>
    <div class="item" @click="toComment">
      <div class="iconfont">
        <i class="iconfont icon-pinglun"></i>
      </div>
      <div class="text">{{ sheetNav.commentCount }}</div>
    </div>
    <span>|</span>
    <div class="item">
      <div class="iconfont">
        <i class="iconfont icon-fenx"></i>
      </div>
      <div class="text text1">{{ sheetNav.shareCount }}</div>
    </div>
  </div>
</template>

<script>
import { getSubSheet } from "network/sheet"; // 收藏歌单

export default {
  name: "SheetNav",
  props: {
    sheetNav: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      t: 1,
    };
  },
  methods: {
    // 收藏
    toSub() {
      if (!this.$store.state.cookie) {
        this.$toast("未登录");
        this.$router.push("/login");
      } else {
        console.log(this.sheetNav.id);
        getSubSheet(this.t, this.sheetNav.id, this.$store.state.cookie)
          .then((res) => {
            console.log(res);
            // 保存数据
            this.$toast("收藏成功", 1900);
            // this.$emit("successSheet", this.createSheet);
          })
      }
    },
    // 评论
    toComment() {
      this.$router.push("/Comment/" + this.$route.params.id + "&" + "2");
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.sheet-nav {
  width: 80%;
  height: 45px;
  display: flex;
  box-shadow: $boxshaow;
  border-radius: 30px;
  span {
    line-height: 45px;
    color: $color-text4;
  }
  .item {
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: space-evenly;

    .iconfont {
      color: $color-text;
      font-size: 20px;
    }
    .text {
      font-size: 15px;
      color: $color-text;
      margin-left: -15px;
      // padding: 0 20px 0 0;
      // border-right: 1px solid #333;
    }
    // .text1 {
    //   border-right: none;
    // }
  }
}
</style>