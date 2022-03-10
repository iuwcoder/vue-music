<template>
  <van-popup
    class="popup"
    teleport="body"
    position="bottom"
    :style="{ width: '100%', height: '25%', backgroundColor: '#fff' }"
    v-model:show="show"
    round
  >
    <div class="content" v-for="(item, index) in deSheet" :key="index">
      <div class="top-nav">歌单：{{ item.name }}</div>
      <div class="item">
        <i class="iconfont icon-xiazai"></i>
        <span>下载</span>
      </div>
      <div class="item">
        <i class="iconfont icon-fenx"></i>
        <span>分享</span>
      </div>
      <div class="item">
        <i class="iconfont icon-shanchu"></i>
        <span>编辑歌单信息</span>
      </div>
      <div class="item" @click="delet">
        <i class="iconfont icon-shanchu"></i>
        <span>删除</span>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getDeletSheet } from "@/network/sheet";

export default {
  name: "DeleteSheet",
  props: ["deSheet"],
  data() {
    return {
      show: false,
      id: "", //歌单id
      sheet: []
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },

    delet() {
      // console.log(id);
      if (!this.$store.state.cookie) {
        this.$toast("未登录");
        this.$router.push("/login");
      } else {
        getDeletSheet(
          '7327068249',
          this.$store.state.cookie
        )
          .then((res) => {
            console.log(res);
            console.log(this.id);
            // 保存数据
            this.$toast("删除成功", 1900);
            this.$emit("deleteSheet");
          })
          .catch((err) => {
            this.$toast("删除失败！", 1900);
            // this.$router.push("/login");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  .content {
    .top-nav {
      height: 44px;
      width: 100%;
      padding: 0 15px;
      line-height: 44px;
      color: $color-text2;
      font-size: 16px;
      border-bottom: $border-line;
    }
    .item {
      height: 40px;
      margin-left: 20px;
      line-height: 40px;
      .iconfont {
        font-size: 22px;
      }
      span {
        margin-left: 15px;
        font-size: 16px;
      }
    }
  }
}
</style>