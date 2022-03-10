<template>
  <div class="comment-input">
    <div class="content">
      <input v-model="content" placeholder="写评论..." type="text" />
    </div>
    <div class="send" @click="send">
      <i class="iconfont icon-fasong"></i>
    </div>
  </div>
</template>

<script>
import { getAddComment} from "network/comment";

export default {
  name: "CommentInput",
  props: {
    t: {
      type: Number,
      default: 1, //发表评论
    },
    type: {
      // 资源类型
      type: Number,
      default: 1,
    },
    id: {
      // 资源id
      type: String,
      default: "",
    },
  },
  emits: ['successComment'],
  data() {
    return {
      content: "",
      commentDetail: {},
    };
  },
  methods: {
    send() {
      if (!this.$store.state.cookie) {
        this.$toast("登录后才能评论");
        this.$router.push("/login");
      } else {
        if (this.comment !== "") {
          getAddComment(
            this.t,
            this.type,
            this.id,
            this.content,
            this.$store.state.cookie
          ).then((res) => {
            console.log(res);
            // 保存数据
            this.commentDetail = res.data.comment;
            this.commentDetail.content = res.data.comment.content;
            this.commentDetail.time = res.data.comment.time;
            this.commentDetail.user.avatarUrl = res.data.comment.user.avatarUrl;
            this.commentDetail.user.nickname = res.data.comment.user.nickname;
            this.$toast("发布成功", 1900);
            this.content = ""; // 清空内容
            this.$emit("successComment", this.commentDetail);
          }).catch((err) => {
            this.$toast("网络出错！", 1900);
            this.$router.push("/login");
          });
        } else {
          this.$toast("内容不能为空");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-input {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  border-top: $border-line;
  background-color: $color-bgc1;
  .content {
    flex: 8.7;
    height: 40px;
    text-align: center;
    margin-left: 10px;
    input {
      width: 100%;
      height: 100%;
      padding: 0;
      border: 0;
    }
  }
  .send {
    flex: 1.3;
    display: flex;
    justify-content: center;
    .icon-fasong {
      font-size: 20px;
    }
  }
}
</style>