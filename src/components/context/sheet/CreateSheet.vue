<template>
  <van-popup
    class="popup"
    teleport="body"
    position="bottom"
    :style="{ width: '100%', height: '30%', backgroundColor: '#fff' }"
    v-model:show="show"
    round
  >
    <div class="content">
      <div class="top-nav">
        <span class="cancel" @click="cancle">取消</span>
        <span class="finish" @click="finish">完成</span>
      </div>
      <enter-input
        class="input"
        v-model="query"
        placeholder="输入新建歌单标题"
        :showBack="false"
      ></enter-input>
    </div>
  </van-popup>
</template>

<script>
import EnterInput from "@/components/context/enterInput/EnterInput.vue";
import { getCreateSheet } from "@/network/sheet";

export default {
  name: "CreateSheet",
  components: {
    EnterInput,
  },
  data() {
    return {
      show: false, //展示弹出层
      query: "", //输入框内容
      name: '', //新建标题
      privacy: 0, // 是否为隐私歌单
      type: 'NORMAL', //歌单类型
      createSheet: [] // 新建歌单数据
    };
  },
  methods: {
    // 展示弹出
    showPopup() {
      this.show = true;
    },
    // 关闭
    cancle() {
      this.show = false;
    },

    finish() {
      if (!this.$store.state.cookie) {
        this.$toast("未登录");
        this.$router.push("/login");
      } else {
        if (this.query !== "") {
          getCreateSheet(this.name, this.privacy, this.type, this.$store.state.cookie)
            .then((res) => {
              this.name = this.query
              console.log(res);
              // 保存数据
              this.createSheet.name = res.data.playlist.name
              this.createSheet.id = res.data.playlist.id
              this.createSheet.img = res.data.playlist.coverImgUrl
              this.createSheet.playCount = res.data.playlist.playCount
              this.createSheet.trackCount = res.data.playlist.trackCount
              this.createSheet.creator = res.data.playlist.creator
              this.$toast("添加成功", 1900);
              console.log(this.createSheet);
              this.$router.push("/SheetInfo/" + this.createSheet.id + "&" + 'user'); // 跳转到歌单页面
              this.query = ""; // 清空内容
              this.$emit("successSheet", this.createSheet);
            })
            .catch((err) => {
              // this.$toast("添加失败！", 1900);
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
.popup {
  .content {
    margin: 0 15px;
    .top-nav {
      height: 44px;
      line-height: 44px;
      color: $color-text;
      font-size: 18px;
      .finish {
        float: right;
      }
    }
    .input {
      margin-top: 15px;
    }
  }
}
</style>