<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <slot v-if="!isActive" name="item-icon"></slot> -->
    <!-- <slot v-else name="item-icon-active"></slot> -->
    <!-- <slot :class="{active: isActive}" name="item-text"></slot> -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    // 设置页面切换的活跃
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 设置字体颜色的活跃
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  /* .active {
    color: red;
  } */

</style>
