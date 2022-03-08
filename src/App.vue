<template>
  <div id="app">
    <!-- <main-nav-bar v-if="$route.meta.TabbarShow"></main-nav-bar> -->
    <main-top-bar v-if="$route.meta.TabbarShow"></main-top-bar>
    <main-bottom-bar v-if="$route.meta.BottomShow"></main-bottom-bar>
    <router-view v-slot="{ Component }" :key="$route.fullPath">
      <transition appear name="slide">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <play-song></play-song>
  </div>
</template>

<script>
import MainNavBar from "@/components/context/mainNavBar/MainNavBar.vue";
import MainTopBar from "@/components/context/mainTopBar/MainTopBar.vue";
import MainBottomBar from "@/components/context/mainBottomBar/MainBottomBar.vue";
import PlaySong from "@/components/context/playSong/PlaySong.vue";

export default {
  name: "App",
  components: {
    MainNavBar,
    MainTopBar,
    MainBottomBar,
    PlaySong,
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
    },
  },
};
</script>

<style lang="scss">
.v-enter {
  opacity: 0;
  /* 进来的时候从右 */
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  /* 离开的时候向左 */
  transform: translateX(-100%);
}

/* 动画执行期间 */
.v-enter-active,
.v-leave-active {
  /* 添加动画效果 */
  transition: all 0.2s linear;
}
</style>
