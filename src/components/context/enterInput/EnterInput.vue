<template>
  <div class="search-input">
    <div class="left" @click="back" v-if="showBack">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="sous">
      <i class="iconfont icon-sousuo" v-if="showSearch"></i>
      <input
        v-model="query"
        :placeholder="placeholder"
      />
      <i v-show="query" @click="clear" class="iconfont icon-chacha"></i>
    </div>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce' //防抖

export default {
  name: "EnterInput",
  props: {
    modelValue: String, //搜索框内容
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手' //默认搜索内容
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      query: this.modelValue
    }
  },
  created() {
    // 监听内部query变化，修改modelValue，并对输入进行防抖
    this.$watch('query', debounce(300, (newQuery) => {
      this.$emit('update:modelValue', newQuery.trim())
    }))
    // 监听外部modelValue变化，填充到query里
    this.$watch('modelValue', (newVal) => {
      this.query = newVal
    })
  },
  methods: {
    back() {
      this.$router.push("/discover");
    },
    clear() {
      // 清空query
      this.query = ''
    }
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  background-color: $color-bgc1;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 10px;
  .left {
    .iconfont {
      font-size: 16px;
      color: $color-text;
    }
  }
  .sous {
    // width: 85%;
    height: 80%;
    flex: 1;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    margin-left: 15px;
    display: flex;
    align-items: center;
    .icon-sousuo {
      margin-right: 10px;
    }
    input {
      width: 100%;
      height: 100%;
      border: 0;
      padding: 0;
      font-size: 15px;
    }
  }
}
</style>