<template>
  <div class="discover-song">
    <div class="top-title">
      <div class="title">新歌速递</div>
      <div class="more" @click="more">更多</div>
    </div>
    <div class="content">
      <!-- 第一个for循环遍历出 三大部分 -->
      <div class="song" v-for="(item, index) in 3" :key="index">
        <!-- 第二个for循环遍历 每一个部分中的歌曲 -->
        <div
          class="song-list"
          v-for="(songItems, i) in songList[index]"
          :key="i"
          :index="i"
          @click="toPlay(songItems.id)"
        >
          <div class="pic">
            <img :src="songItems.picUrl" alt="" />
            <i class="iconfont icon-bofang"></i>
          </div>
          <div class="sing">
            <div class="sing-name">{{ songItems.name }}</div>
            <div class="sing-author">- {{ songItems.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongsTop } from "network/discover";

export default {
  name: "DiscoverSong",
  data() {
    return {
      songList: [[], [], []],
    };
  },
  methods: {
    // 跳转到播放界面
    toPlay(sid) {
      this.$router.push("/PlaySong/" + sid);
    },
    more() {
      this.$router.push("/discover/moreSongs/");
    },
  },
  created() {
    // 获取新歌
    getSongsTop(0).then((res) => {
      let path = res.data.data;
      for (let i = 0; i < 9; i++) {
        if (i >= 0 && i < 3) {
          this.songList[0].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists, // 演唱者
          });
        } else if (i >= 3 && i < 6) {
          this.songList[1].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
            name: path[i].name, // 歌曲名称
            artists: path[i].artists, // 演唱者
          });
        } else if (i >= 6 && i < 9) {
          this.songList[2].push({
            id: path[i].id, // 歌曲id
            picUrl: path[i].album.picUrl, // 歌曲封面
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
.discover-song {
  border-bottom: $border-bottom;
  margin-top: 15px;
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
    .song {
      height: 175px;
      margin: 4px 10px;
      .song-list {
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
        .sing {
          margin-left: 8px;
          padding: 7px 0;
          width: 85%;
          // border-bottom: $border-line;
          .sing-name {
            @include no-wrap();
            margin-right: 5px;
            font-size: 14px;
          }
          .sing-author {
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