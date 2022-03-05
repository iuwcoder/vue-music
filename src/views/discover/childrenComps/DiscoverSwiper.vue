<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        class="swiper-item"
        v-for="(item, index) in swiperList"
        :key="index"
      >
        <a :href="item.url">
          <div class="img">
            <img :src="item.pic" alt="" />
            <div
              class="title"
              :style="{
                background:
                  item.titleColor === 'blue' ? '#326ef8' : item.titleColor,
              }"
            >
              <span>
                {{ item.typeTitle }}
              </span>
            </div>
          </div>
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "network/discover";

export default {
  name: "DiscoverSwiper",
  data() {
    return {
      swiperList: [],
    };
  },
  created() {
    getBanner(1).then((res) => {
      this.swiperList = res.data.banners;
    });
  },
};
</script>
<style lang="scss" scoped>
.my-swipe {
  width: 94%;
  height: 140px; 
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  .swiper-item {
    width: 100%;
    height: 100%;
    .img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        position: relative;
      }
      .title {
        position: absolute;
        padding: 4px 6px 5px;
        border-top-left-radius: 8px;
        font-size: 7px;
        text-align: center;
        right: 0;
        bottom: 0;
        color: #fff;
      }
    }
  }
}
</style>