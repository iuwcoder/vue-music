<template>
  <van-popover
    class="popup"
    teleport="body"
    placement="left-start"
    :style="{ width: '50%', height: '20%', backgroundColor: '#fff' }"
    v-model:show="show"
    round
  >
    <div class="content">
      <div class="item" @click="showAddSong">
        <i class="iconfont icon-tianjia"></i>
        <span>添加歌曲</span>
      </div>
      <div class="item" @click="showConfirm">
        <i class="iconfont icon-shanchu"></i>
        <span>删除歌单</span>
      </div>
      <div class="item">
        <i class="iconfont icon-fenx"></i>
        <span>编辑歌单信息</span>
      </div>
      <div class="item">
        <i class="iconfont icon-fenx"></i>
        <span>分享</span>
      </div>
    </div>
  </van-popover>
  <add-song class="add-song" ref="addSongRef"></add-song>
  <confirm
    ref="confirmRef"
    @confirm="confirmClear"
    text="确定要删除歌单吗？"
    confirm-btn-text="删除"
  ></confirm>
</template>

<script>
import AddSong from "@/components/context/addSong/AddSong.vue";
import Confirm from "@/components/common/confirm/confirm.vue";
import { getDeletSheet } from "@/network/sheet";

export default {
  name: "TopPop",
  components: {
    AddSong,
    Confirm,
  },
  data() {
    return {
      show: false,
    };
  },
  props: ["sheetId"],
  methods: {

    // 展示弹出
    showPopup() {
      this.show = true;
    },
    // 展示添加歌曲
    showAddSong() {
      this.$refs.addSongRef.show();
    },
    // 展示删除歌单提示框
    showConfirm() {
      this.$refs.confirmRef.show();
      this.show = false;
    },
    // 删除歌单
    confirmClear() {
      console.log(this.sheetId);
      if (!this.$store.state.cookie) {
        this.$toast("未登录");
        this.$router.push("/login");
      } else {
        getDeletSheet(this.sheetId, this.$store.state.cookie)
          .then((res) => {
            console.log(res);
            console.log(this.sheetId);
            this.$toast("删除成功", 1900);
            this.$router.push("/userCenter");
            // window.location.reload();
          })
          .catch((err) => {
            this.$toast("删除失败！", 1900);
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  .content {
    width: 100%;
    padding: 3px 10px;
    line-height: 44px;
    color: $color-text2;
    font-size: 16px;
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