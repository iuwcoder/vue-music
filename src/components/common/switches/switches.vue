<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item, index) in items"
      :key="item"
      :class="{ active: modelValue === index }"
      @click="switchItem(index)"
    >
      <span>{{ item }}</span>
    </li>
    <div class="active-bar" :style="activeStyle"></div>
  </ul>
</template>

<script>
export default {
  name: "Switches",
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    activeStyle() {
      const x = 120 * this.modelValue;
      return {
        transform: `translate3d(${x}px, 0, 0)`,
      };
    },
  },
  methods: {
    switchItem(index) {
      this.$emit("update:modelValue", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.switches {
  display: flex;
  position: relative;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  .switch-item {
    position: relative;
    left: 20px;
    z-index: 10;
    flex: 1;
    height: 30px;
    line-height: 30px;
    // font-size: 17px;
    color: $color-text;
    &.active {
      color: $color-red;
    }
  }
  .active-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: 30px;
    transition: transform 0.3s;
    border-radius: 10px;
    background-color: $color-bgc1;
  }
}
</style>