<template>
  <div>
    <nav-bar class="navbar">
      <template v-slot:left>
        <div class="left-box" @click="leftSider">
          <i class="iconfont icon-hanbao"></i>
        </div>
      </template>
      <template v-slot:center>
        <span
          class="main-title"
          v-for="(item, index) in titleList"
          :key="index"
          @click="itemClick(index)"
          :class="{ activeTitle: index === currentIndex }"
        >
          {{ item }}
        </span>
      </template>
      <template v-slot:right>
        <div class="right-box" @click="toSearch">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </template>
    </nav-bar>

    <left-popup ref="popupRef"></left-popup>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import LeftPopup from "@/components/context/leftPopup/LeftPopup.vue"

export default {
  name: "MainNavBar",
  components: {
    NavBar,
    LeftPopup
  },
  data() {
    return {
      titleList: ["我的", "发现", "视频"],
      currentIndex: 1,
      show: false,
    };
  },
  methods: {
    leftSider() {
      this.$refs.popupRef.showPopup()
    },
    // 搜索
    toSearch() {
      this.$router.push("/search");
    },

    // 组件切换
    itemClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/userCenter");
          break;
        case 1:
          this.$router.push("/discover");
          break;
        case 2:
          this.$router.push("/video");
          break;
      }
    },
  },
  watch: {
    $route: {
      // 监听路由变化
      handler: function (val, oldVal) {
        if (val.fullPath == "/userCenter") {
          this.itemClick(0);
        } else if (val.fullPath == "/discover") {
          this.itemClick(1);
        } else if (val.fullPath == "/video") {
          this.itemClick(2);
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #fff;
}
.left-box .iconfont {
  font-size: 17px;
}
.right-box .iconfont {
  font-size: 17px;
}

.main-title {
  font-size: 15px;
  height: 28px;
  line-height: 30px;
  padding: 0 12px;
  color: rgb(116, 116, 116);
}

.activeTitle {
  font-size: 18px;
  color: #000;
  line-height: 28px;
}
</style>
