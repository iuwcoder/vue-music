<template>
  <div class="user-center">
    <scroll class="scroll-content">
      <div>
        <user-login
          class="login"
          v-if="this.$store.state.userId !== ''"
        ></user-login>
        <user-not-login
          v-else
          class="not-login"
          @click="clear"
        ></user-not-login>
        <user-menu></user-menu>
        <user-like></user-like>
        <tab-control id="tabCon" ref="tab" :title="title"></tab-control>
        <user-sheet></user-sheet>
      </div>
    </scroll>
  </div>
</template>

<script>
import UserLogin from "./childrenComps/UserLogin.vue"; //登录
import UserNotLogin from "./childrenComps/UserNotLogin.vue"; //未登录
import UserMenu from "./childrenComps/UserMenu.vue";
import UserLike from "./childrenComps/UserLike.vue";
import TabControl from "@/components/common/tabControl/TabControl";
import UserSheet from "./childrenComps/UserSheet.vue";
import scroll from "components/common/scroll/scroll.vue";

import { mapActions } from "vuex";

import "assets/icon/MyMessage.css"; // 我的页面字体图标

export default {
  name: "UserCenter",
  components: {
    UserLogin,
    UserNotLogin,
    UserMenu,
    UserLike,
    TabControl,
    UserSheet,
    scroll,
  },
  data() {
    return {
      title: ["创建歌单", "收藏歌单", "歌单助手"],
    };
  },
  methods: {
    ...mapActions(["clearSongList"]),

    tabToggle(index) {
      if (this.index !== index) {
        this.sheetDetail = []; // 清空数据
        this.getSheet(index);
      }
      this.index = index;
    },

    // 清空播放状态
    clear() {
      this.clearSongList();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-center {
  margin: 0 15px;
  background-color: $color-bgc;
  height: 100vh;
  .scroll-content {
    height: 100%;
    overflow: hidden;
    .login,
    .not-login {
      #tabCon {
        margin-top: 15px;
      }
    }
  }
}
</style>
