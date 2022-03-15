<template>
  <div class="sheet-item">
    <div class="top-img">
      <img class="pic" v-lazy="sheetItem.picUrl" alt="" />
      <div class="count" v-if="showCount">▷ {{ sheetItem.playCount }}</div>
      <div class="toPlay" v-if="showImg">
        <div class="pImg">
          <i class="iconfont icon-shouyebofang"></i>
        </div>
      </div>
    </div>
    <div class="sheet-name" v-if="isSheet">
      {{ sheetItem.rcmdtext }}
    </div>
    <div class="programbox" v-else>
      <div class="proName">{{ sheetItem.name }}</div>
      <div class="desc">
        <!-- <span>{{sheetItem.desc}}</span> -->
        <p>{{ sheetItem.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sheetItem: {
      type: Object,
      default: {},
    },
    showCount: {
      type: Boolean,
      default: true,
    },
    showImg: {
      type: Boolean,
      default: false,
    },
    isSheet: {
      type: Boolean,
      default: true,
    },
  },
  name: "SheetItem",
};
</script>
<style lang='scss' scoped>
// @import "@/assets/scss/mixin.scss";
.sheet-item {
  width: 100px;
  .top-img {
    height: 100px;
    border-radius: 7px;
    overflow: hidden;
    position: relative;

    .count {
      position: absolute;
      height: 20px;
      line-height: 20px;
      right: 5px;
      top: 0;
      color: #fff;
      font-size: 12px;
    }
  }

  .sheet-name {
    font-size: 12px;
    line-height: 15px;
    margin-top: 3px;
    // 文本显示两行
    @include no-more-wrap();
  }
}
.top-img .pic {
  width: 100%;
  height: 100%;
}

.sheetName {
  width: 100%;
  margin-top: 2px;
  font-size: 12px;
  line-height: 20px !important;
  text-overflow: -o-ellipsis-lastline !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 3 !important;
  -webkit-box-orient: vertical !important;
}
</style>