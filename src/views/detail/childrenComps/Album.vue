<template>
  <div class="album" v-loading="!albumList.length">
    <div
      class="album-item"
      @click="showAlbum(item.id)"
      v-for="(item, index) in albumList"
      :key="index"
    >
      <div class="left">
        <img v-lazy="item.picUrl" alt="">       
      </div>
      <div class="right">
        <div class="title">{{item.name}}
          <span class="sp" v-if="item.alias.length !==0">
            {{item.alias[0]}}
          </span>
        </div>
        <div class="detail">
          {{$filters.getTime(item.publishTime)}}
          {{item.size}}首
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerAlbum } from "network/singer";

export default {
  name: "Album",
  props: ["artistId"],
  data() {
    return {
      offset: 0,
      more: true,
      albumList: [],
    };
  },
  methods: {
    // 专辑详情页
    showAlbum(id) {
      this.$router.push("/SheetInfo/" + id + "&" + 'false');
    },
    singerAlbum() {
      if (this.more) {
        getSingerAlbum(this.artistId, 50, this.offset).then((res) => {
          for (const item of res.data.hotAlbums) {
            this.albumList.push({
              name: item.name, // 专辑名称
              id: item.id, // id
              picUrl: item.picUrl, // 封面
              publishTime: item.publishTime, // 发布时间
              size: item.size, // 专辑歌曲数量
              alias: item.alias, // 专辑介绍
              // showImg: false, // 图片显示
            });
          }
        });
      }
    },
  },
  created() {
    this.singerAlbum();
  },
};
</script>

<style lang="scss" scoped>
.album {
  background-color: $color-bgc1;
  padding: 0 15px 15px;
  .album-item {
    width: 100%;
    height: 50px;
    display: flex;
    padding-top: 13px;
    .left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 8px;
      }
    }
    .right {
      margin: 8px 10px;
      .title {
        font-size: 14px;
        @include no-wrap();
        .sp {
          color: $color-text1;
        }

      }
      .detail {
        font-size: 12px;
        margin-top: 5px;
        color: $color-text1;
      }
    }
  }
}
</style>