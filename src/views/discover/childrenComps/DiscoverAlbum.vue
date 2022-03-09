<template>
  <div class="discover-album">
    <div class="top-title">
      <div class="title">新碟上架</div>
      <div class="more" @click="more">更多</div>
    </div>
    <div class="content">
      <!-- 第一个for循环遍历出 三大部分 -->
      <div class="ablum" v-for="(item, index) in 3" :key="index">
        <!-- 第二个for循环遍历 每一个部分中的歌曲 -->
        <div
          class="ablum-list"
          v-for="(item, i) in albumList[index]"
          :key="i"
          :index="i"
          @click="albumShow(item.id)"
        >
          <div class="pic">
            <img :src="item.picUrl" alt="" />
            <i class="iconfont icon-bofang"></i>
          </div>
          <div class="text">
            <div class="text-name">{{ item.name }}</div>
            <div class="text-author">- {{ item.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewAlbum } from "network/discover";

export default {
  name: "DiscoverAlbum",
  components: {},
  data() {
    return {
      offset: 0,
      albumList: [[], [], []], // 二维数组
    };
  },
  methods: {
    more() {
      this.$router.push("/discover/moreAlbum/");
    },
        // 路由跳转
    albumShow(id) {
      this.$router.push("/SheetInfo/" + id + '&' + false);
    },
  },
  created() {
    getNewAlbum(9, this.offset * 9, "ALL", "new").then((res) => {
      let path = res.data.monthData;
      for (let i = 0; i < 9; i++) {
        if (res.data.monthData.length > i && i >= 0 && i < 3) {
          this.albumList[0].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists, // 演唱者
          });
        } else if (res.data.monthData.length > i && i >= 3 && i < 6) {
          this.albumList[1].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists, // 演唱者
          });
        } else if (res.data.monthData.length > i && i >= 6 && i < 9) {
          this.albumList[2].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists, // 演唱者
          });
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.discover-album {
  margin-top: 15px;
  border-bottom: $border-bottom;
  .top-title {
    width: 100%;
    display: flex;
    .title {
      flex: 1;
      margin-left: 12px;
      font-size: 16px;
      font-weight: 550;
      line-height: 25px;
    }
    .more {
      margin-right: 12px;
      width: 40px;
      height: 22px;
      border: 1px solid #919090;
      border-radius: 22px;
      line-height: 22px;
      text-align: center;
      font-size: 12px;
    }
  }
  .content {
    display: flex;
    .ablum {
      height: 175px;
      margin: 4px 10px;
      .ablum-list {
        width: 340px;
        height: 45px;
        display: flex;
        padding-top: 10px;
        .pic {
          position: relative;
          img {
            width: 45px;
            height: 45px;
            border-radius: 5px;
          }
          .iconfont {
            position: absolute;
            top: 15px;
            left: 16px;
            font-size: 14px;
            color: #fff;
            opacity: 0.7;
          }
        }
        .text {
          margin-left: 8px;
          padding: 7px 0;
          width: 85%;
          // border-bottom: $border-line;
          .text-name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 5px;
            font-size: 14px;
          }
          .text-author {
            padding: 4px 0 0 4px;
            font-size: 3px;
            color: $color-text1;
          }
        }
      }
    }
  }
}
</style>