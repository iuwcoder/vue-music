<template>
  <teleport to="body">
    <transition name="slide-down">
      <div class="message" v-show="visible" @click="hide">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "message",
  props: {
    delay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide() {
      clearTimeout(this.timer)
      this.visible = false
    }
  }

}
</script>

<style lang="scss" scoped>
  .message {
    position: fixed;
    bottom: 15%;
    text-align: center;
    left: 28%;
    width: 44%;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    z-index: 400;
    background: $color-bgc1;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border-radius: 20px;

    &.slide-down-enter-active, &.slide-down-leave-active {
      transition: all 0.3s
    }

    // &.slide-down-enter-from, &.slide-down-leave-to {
    //   transform: translate3d(0, -100%, 0)
    // }
  }
</style>