<template>
  <van-popup
    class="popup"
    teleport="body"
    position="bottom"
    :style="{ width: '100%', height: '22%', backgroundColor: '#fff' }"
    v-model:show="show"
    round
  >
    <div class="content">
      <div class="top-nav">歌曲:</div>
      <div class="item">
        <i class="iconfont icon-xiazai"></i>
        <span>下载</span>
      </div>
      <div class="item">
        <i class="iconfont icon-fenx"></i>
        <span>分享</span>
      </div>
      <!-- <div class="item">
        <i class="iconfont icon-shanchu"></i>
        <span>编辑歌单信息</span>
      </div> -->
      <div class="item" @click="showConfirm" @select="delet">
        <i class="iconfont icon-shanchu"></i>
        <span>删除</span>
      </div>
    </div>
  </van-popup>
  <confirm
    ref="confirmRef"
    @confirm="confirmClear"
    text="确定要删除歌单吗？"
    confirm-btn-text="删除"
  ></confirm>
</template>

<script>
import Confirm from "@/components/common/confirm/confirm.vue";
import { getTracksSheet } from "@/network/sheet"; //删除歌曲

export default {
  name: "SongPop",
  props: ["song"],
  components: {
    Confirm,
  },
  data() {
    return {
      show: false,
      sheetId: this.$route.params.id, // 保存路由传递的歌单id
      op: "del", //删除歌曲
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    // 展示删除歌曲
    showConfirm() {
      this.$refs.confirmRef.show();
      this.show = false;
    },
    // 删除歌单
    confirmClear(songs) {
      // this.$parent.selectItem(songs);
      console.log(this.songs);
      getTracksSheet(
        this.op,
        this.sheetId,
        "167876",
        this.$store.state.cookie
      ).then((res) => {
        console.log(res);
      });
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