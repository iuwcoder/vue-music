<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: "Tabbar"
};
</script>

<style scoped>
  #tab-bar {
    display: flex;
    width: 100%;
    height: 49px;
  }
</style>
