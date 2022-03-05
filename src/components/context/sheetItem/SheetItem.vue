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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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

/* .programbox{
  min-height: 30px;
}
.proName{
  width: 100%;
  font-size: 14px;
  height: 15px;
  line-height: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 5px;
  color: #000 !important;
}
.desc{
  width: 100%;
}
.desc p{
  word-break: break-all;
  line-height: 15px !important;
  font-size: 7px;
  color: rgb(121, 119, 119);
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
} */

/* .toPlay{
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 0.664);
  border-radius: 50%;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.335);
} */
/* .pImg{
  width: 17px;
  height: 17px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pImg .iconfont{
  font-size: 12px;
  color: red;
  position: relative;
  left: 1px;
} */
</style>