<template>
  <div class="progress-bar" @click="onClick">
    <div class="bar-inner">
      <div class="progress" ref="progress" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 10;

export default {
  name: "ProgressBar",
  emits: ["progress-changing", "progress-changed"],
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      offset: 0, //偏移量
    };
  },
  computed: {
    progressStyle() {
      return `width:${this.offset}px`;
    },
    btnStyle() {
      return `transform:translate3d(${this.offset}px,0,0)`;
    },
  },
  watch: {
    progress(newProgress) {
      // 进度条位置
      this.setOffset(newProgress)
    },
  },
  created() {
    this.touch = {};
  },
  methods: {
    onTouchStart(e) {
      // 获取进度条初始位置
      this.touch.x1 = e.touches[0].pageX;
      this.touch.beginWidth = this.$refs.progress.clientWidth;
    },
    onTouchMove(e) {
      const delta = e.touches[0].pageX - this.touch.x1;
      const tempWidth = this.touch.beginWidth + delta;
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      // 拖动时
      const progress = Math.min(1, Math.max(tempWidth / barWidth, 0));
      this.offset = barWidth * progress;
      this.$emit("progress-changing", progress);
    },
    onTouchEnd() {
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = this.$refs.progress.clientWidth / barWidth;
      this.$emit("progress-changed", progress);
    },
    onClick(e) {
      // 获取进度条当前位置
      const rect = this.$el.getBoundingClientRect();
      // 偏移量
      const offsetWidth = e.pageX - rect.left;
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = offsetWidth / barWidth
      this.$emit("progress-changed", progress);
    },

    // 当对mini播放器进行播放时，进度条不能实时更新到全屏播放器
    setOffset(progress) {
      // 获取进度条位置
      const barWidth = this.$el.clientWidth - progressBtnWidth;
      this.offset = barWidth * progress;
    }
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 15px;
    height: 1.5px;
    background: rgba(182, 182, 182, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: rgb(194, 193, 193);
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 8px;
        left: 8px;
        box-sizing: border-box;
        width: 10px;
        height: 10px;
        // border: 3px solid $color-text2;
        border-radius: 50%;
        background: $color-bgc1;
      }
    }
  }
}
</style>
