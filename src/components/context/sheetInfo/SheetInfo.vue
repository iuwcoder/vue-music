<template>
  <div class="sheet-info">
    <menu-nav
      class="menu-nav"
      :navTitle="navTitle"
      :style="menuStyle"
    ></menu-nav>
    <scroll class="detail-content" :probe-type="3" @scroll="onScroll">
      <div>
        <div class="box">
          <div ref="sheetDetailBox" class="zhez"></div>
          <div
            class="bimg"
            :style="{
              background: 'url(' + sheetInfo.coverImgUrl + ') no-repeat',
            }"
          ></div>
          <div class="zbox">
            <div class="top">
              <div class="top-img">
                <img class="pic" v-lazy="sheetInfo.coverImgUrl" alt="" />
                <div class="count" v-if="this.$route.params.isType == 'true'">▷ {{ sheetInfo.playCount }}</div>
              </div>
              <div class="right">
                <div class="title">{{ sheetInfo.name }}</div>
                <div class="user">
                  <img class="pho" v-lazy="sheetInfo.avatarUrl" alt="" />
                  <div class="name">{{ sheetInfo.nickname }}</div>
                </div>
                <div class="desc">{{ sheetInfo.desc }}</div>
              </div>
            </div>
          </div>
        </div>
        <div ref="sheetNav">
          <sheet-nav class="nav" :sheetNav="sheetInfo"></sheet-nav>
        </div>
        <!-- <song-nav :trackCount="sheetInfo.trackCount"></song-nav> -->
        <!-- <song-item :songList="songs" @select="selectItem"></song-item> -->
      </div>
    </scroll>
  </div>
</template>

<script>
import MenuNav from "@/components/common/menuNav/MenuNav.vue";
import SheetNav from "./SheetNav.vue";
import SongNav from "@/components/context/songItem/SongNav";
import SongItem from "@/components/context/songItem/SongItem";
import scroll from "components/common/scroll/scroll.vue";

import { toStringNum } from "common/common"; // 播放量转换

import { getSheetDetial } from "network/discover"; // 歌单
import { getAlbum, getAlbumDetail } from "network/album"; // 专辑
import { getSongDetial, getlyric } from "network/played"; // 获取歌曲基本信息 歌词 评论
import { playSong } from "network/songs"; // 获取音乐url
import { mapActions } from "vuex";

export default {
  name: "SheetInfo",
  components: {
    MenuNav,
    SheetNav,
    SongItem,
    SongNav,
    scroll,
  },
  data() {
    return {
      navTitle: "歌单®",
      sheetId: this.$route.params.id, // 保存路由传递的歌单id
      sheetInfo: {}, //歌单信息
      songs: [], // 歌曲列表
      isShow: false,
      index: 0, // 判断是专辑还是歌单
      scrollY: 0, //滚动位置
      tabOffsetTop: 0, //最大滚动位置
    };
  },
  computed: {
    // 顶部导航栏
    menuStyle() {
      let backgroundColor = "";
      let color = "";
      let zIndex = 21;
      if (this.scrollY > this.tabOffsetTop) {
        backgroundColor = "#fff";
        color = "#333";
        zIndex = 21;
      }
      return {
        backgroundColor,
        color,
        zIndex,
        // navTitle
      };
    },
  },
  methods: {
    ...mapActions(["selectPlay", "randomPlay"]),
    // 顺序播放
    selectItem({ item, index }) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },

    back() {
      this.$router.go(-1);
    },

    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    getSong(id) {
      getSongDetial(id.toString()).then((res) => {
        let result = res.data.songs[0];
        playSong(id).then((res) => {
          let music = res.data.data[0];
          getlyric(id).then((res) => {
            this.songs.push({
              singers: result.ar[0].name, // 歌手
              navTitle: result.name, // 歌曲名称
              yuanc: result.alia, //歌曲别名
              zhuanji: result.al.name, //专辑名称
              mv: result.mv,
              id: result.id, // 歌曲id
              bgimg: result.al.picUrl, // 歌曲封面
              url: music.url, // 歌曲url
              lrc: res.data.lrc.lyric, //歌词
            });
            // console.log(this.songs);
          });
        });
      });
    },
  },
  mounted() {
    // 保存导航栏距离顶部的距离
    this.tabOffsetTop = this.$refs.sheetNav.offsetTop - 44;
  },
  created() {
    if (this.$route.params.isType == "true") {
      getSheetDetial(this.sheetId).then((res) => {
        let path = res.data.playlist;
        this.sheetInfo.name = path.name; // 歌单名称
        this.sheetInfo.coverImgUrl = path.coverImgUrl; // 歌单封面
        this.sheetInfo.desc = path.description; // 歌单描述

        this.sheetInfo.avatarUrl = path.creator.avatarUrl; // 用户头像
        this.sheetInfo.nickname = path.creator.nickname; // 用户名
        this.sheetInfo.userId = path.creator.userId; // 用户id

        this.sheetInfo.playCount = toStringNum(path.playCount); // 歌单播放量
        this.sheetInfo.trackCount = path.trackCount; // 歌单歌曲数量
        this.sheetInfo.commentCount = path.commentCount; // 歌单评论数
        this.sheetInfo.subCount = toStringNum(path.subscribedCount); // 歌单收藏数
        this.sheetInfo.shareCount = path.shareCount; // 歌单分享数

        // this.$store.state.createId = path.creator.userId;
        this.isShow = true;
        for (const item of path.trackIds) {
          this.getSong(item.id);
        }
      });
    } else if (this.$route.params.isType == "false") {
      getAlbum(this.$route.params.id).then((res) => {
        console.log(res);
      })
    }
  },
  // },
};
</script>

<style lang="scss" scoped>
.sheet-info {
  top: 0;
  position: relative;
  background-color: #fff;
  height: 100vh;
  // background-color: rgba(0, 0, 0, 0.8);

  // margin-bottom: 40px;
  .detail-content {
    height: 100%;
    overflow: hidden;
  }
  .menu-nav {
    background-color: transparent;
    position: fixed;
    z-index: 21;
    border: 0;
    transition: all 0.4s linear;
    color: $color-bgc1;
  }
  .box {
    position: relative;
    padding: 65px 5px 30px 10px;
    // border-radius: 0 0 50% 50%;
    z-index: 15;
    .bimg {
      width: 100%;
      top: 0;
      left: 0;
      height: 94%;
      padding: 0;
      position: absolute;
      filter: blur(5px);
      background-size: cover !important;
      overflow: hidden;
      z-index: 1;
    }
    .zhez {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      position: fixed;
      position: absolute;
      top: -1px;
      left: 0;
      z-index: 10;
      // border-radius: 0 0 90% 80%;
    }
    .zbox {
      width: 100%;
      height: 90%;
      padding: 0;
      position: relative;
      z-index: 15;
      .top {
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: space-around;
        .top-img {
          height: 120px;
          width: 120px;
          // width: 35%;
          border-radius: 7px;
          overflow: hidden;
          position: relative;
          .pic {
            width: 100%;
            height: 100%;
          }
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
        .right {
          width: 60%;
          height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            color: $color-bgc1;
            font-size: 16px;
            line-height: 1.2;
            // 文本显示两行
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .user {
            .pho {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 7px;
              float: left;
            }
            .name {
              float: left;
              line-height: 30px;
              font-size: 13px;
              color: $color-song;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          .desc {
            font-size: 13px;
            color: $color-song;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .nav {
    z-index: 50;
    background-color: #fff;
    position: relative;
    top: -25px;
    left: 10%;
  }
}
</style>