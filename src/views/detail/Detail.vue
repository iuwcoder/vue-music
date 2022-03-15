<template>
  <div class="detail">
    <menu-nav
      ref="menu"
      :showBlackImg="false"
      :showWriteImg="true"
      :rightImg="true"
      class="nav"
      :navTitle="navTitle"
      @openSub="openSub"
      :style="menuStyle"
    ></menu-nav>
    <!-- <div class="nav-box" ref="tab" v-show="isTabFixed" :style="tabStyle">
      <tab-nav
        class="tabnav"
        @tabToggle="tabToggle"
        :firstIndex="firstIndex"
        :itemList="itemList"
        ref="inforTabnav"
      ></tab-nav>
    </div> -->
    <scroll class="detail-content" :probe-type="3" @scroll="onScroll">
      <div>
        <div
          class="top-box"
          ref="bgImg"
          :style="bgImgStyle"
          v-if="profile != null"
        >
          <div class="user-bgc">
            <img :src="profile.backgroundUrl" alt="" />
          </div>
          <div class="zhez"></div>
          <div class="user-detail" v-if="special">
            <div class="user-img">
              <img :src="profile.avatarUrl" alt="" />
              <div class="logo" v-if="profile.artistId">
                <i class="iconfont icon-logo"></i>
              </div>
            </div>
            <div class="user-name">
              {{ profile.artistName }}
              <img
                v-if="profile.vipType !== 0"
                src="~assets/img/common/vip1.svg"
                alt=""
              />
            </div>
            <div class="info">
              <div class="follows">{{ profile.follows }} 关注</div>
              <div class="followeds">{{ profile.followeds }} 粉丝</div>
            </div>
            <div class="createtime">
              <!-- <div>{{profile.identify.imageDesc}}</div> -->
            </div>
          </div>
          <div v-else class="singerDetail">{{ profile.artistName }}</div>
        </div>
        <div class="nav-box" ref="tab">
          <van-tabs
            class="tab"
            background="#fff"
            title-active-color="#e93d34"
            animated
            swipeable
            @click-tab="tabToggle"
          >
            <van-tab
              v-for="(item, index) in itemList"
              :title="item"
              :key="index"
            >
            </van-tab>
          </van-tabs>
          <!-- <tab-nav
            @tabToggle="tabToggle"
            :firstIndex="firstIndex"
            class="tabnav"
            :itemList="itemList"
            ref="inforTabnav"
          ></tab-nav> -->
        </div>

        <!-- 主页 -->
        <home-page
          :artistId="profile.artistId"
          :identify="profile.identify"
          :count="profile.listenSongs"
          :profile="profile"
          v-if="showHome"
        ></home-page>
        <!-- 歌曲 -->
        <song-list
          class="songs"
          :artistId="profile.artistId"
          v-if="showSongs"
        ></song-list>
        <!-- 专辑 -->
        <album
          class="album"
          :artistId="profile.artistId"
          v-if="showAlbum"
        ></album>
        <!-- MV -->
        <mv class="mv" :artistId="profile.artistId" v-if="showMv"></mv>
      </div>
    </scroll>
  </div>
</template>

<script>
import MenuNav from "@/components/context/menuNav/MenuNav.vue";
import TabNav from "@/components/context/tabNav/TabNav";
import HomePage from "./childrenComps/HomePage.vue";
import SongList from "@/components/context/songItem/SongList";
import Album from "./childrenComps/Album.vue";
import Mv from "./childrenComps/Mv.vue";
import scroll from "components/common/scroll/scroll.vue";

import { toStringNum } from "common/common";
import { getUserDetail } from "network/user";
import { getSingerAlbum, getSongsList } from "network/singer";

import "assets/icon/Information.css";

export default {
  name: "Detail",
  components: {
    MenuNav,
    TabNav,
    HomePage,
    SongList,
    Album,
    Mv,
    scroll,
  },
  data() {
    return {
      navTitle: "",
      profile: {}, // 用户信息
      itemList: ["主页"],
      pageY: 0,
      showHome: false, // 显示/隐藏主页
      showSongs: true, // 显示/隐藏歌曲
      showAlbum: false, // 显示/隐藏专辑
      showMv: false, // 显示/隐藏mv
      navToTop: 0, // 导航栏距离顶部的距离
      showShare: false, // 分享面板
      special: true,
      scrollY: 0, //滚动位置
      tabOffsetTop: 0, //最大滚动位置
      isTabFixed: false,
      active: 0
    };
  },
  // 监听路由变化
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.profile = {}; // 清空mv数据
      this.index = 0; // 重置导航栏索引
      // this.$refs.inforTabnav.tabItem(this.firstIndex);
      this.tabToggle(this.index); // 切换导航栏界面
      this.showHome = false; // 显示首页
      next();
      this.userDetail();
    }
  },
  computed: {
    bgImgStyle() {
      let zIndex = 0;
      let translateZ = 0;
      let scale = 1;
      if (this.scrollY > this.tabOffsetTop) {
        zIndex = 0;
        translateZ = 1;
      }
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.tabOffsetTop);
      }

      return {
        zIndex,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    },
    // 顶部导航栏
    menuStyle() {
      let backgroundColor = "";
      let color = "";
      let zIndex = 21;
      if (this.scrollY > this.tabOffsetTop) {
        backgroundColor = "#fff";
        color = "#333";
        zIndex = 21;
        this.navTitle = this.profile.artistName;
      } else {
        this.navTitle = "";
      }
      return {
        backgroundColor,
        color,
        zIndex,
        // navTitle
      };
    },
    // 分类导航栏
    tabStyle() {
      let position = "";
      let left = 0;
      let right = 0;
      let top = 0;
      let zIndex = 0;
      if (this.scrollY > this.tabOffsetTop) {
        this.isTabFixed = true;
        position = "fixed";
        left = 0;
        right = 0;
        top = "64px";
        zIndex = 10;
      } else {
        this.isTabFixed = false;
      }
      return {
        position,
        left,
        right,
        top,
        zIndex,
      };
    },
  },
  methods: {
    openSub() {
      this.showShare = true;
    },

    onScroll(pos) {
      this.scrollY = -pos.y;
      // console.log(this.scrollY);
    },

    // 导航栏切换
    tabToggle(index) {
      switch (index) {
        case 0:
          this.showHome = true;
          this.showSongs = false;
          this.showAlbum = false;
          this.showMv = false;
          break;
        case 1:
          this.showSongs = true;
          this.showHome = false;
          this.showAlbum = false;
          this.showMv = false;
          break;
        case 2:
          this.showAlbum = true;
          this.showSongs = false;
          this.showHome = false;
          this.showMv = false;
          break;
        case 3:
          this.showMv = true;
          this.showAlbum = false;
          this.showSongs = false;
          this.showHome = false;
          break;
        default:
          break;
      }
    },

    userDetail() {
      getUserDetail(this.$route.params.uid).then(
        (res) => {
          this.profile.userId = res.data.profile.userId;
          this.profile.level = res.data.level; // 用户等级
          this.profile.listenSongs = res.data.listenSongs; // 用户累计播放歌曲
          this.profile.avatarUrl = res.data.profile.avatarUrl; // 用户头像
          this.profile.artistName = res.data.profile.artistName; // 用户昵称
          this.profile.follows = res.data.profile.follows; // 用户关注
          this.profile.followeds = toStringNum(res.data.profile.followeds); // 用户粉丝
          this.profile.gender = res.data.profile.gender; // 性别
          this.profile.birthday = res.data.profile.birthday; // 生日
          this.profile.backgroundUrl = res.data.profile.backgroundUrl; // 背景图片
          this.profile.createTime = res.data.profile.createTime; // 创建时间
          this.profile.artistId = res.data.profile.artistId || null; // 歌手id
          this.profile.vipType = res.data.profile.vipType; // 是否会员
          this.profile.description = res.data.profile.description; // 描述
          this.profile.identify = res.data.identify; // 认证信息
          // this.$set(
          //   this.profile,
          //   this.profile.backgroundUrl,
          //   res.data.profile.backgroundUrl
          // );

          // 判断用户是不是歌手
          if (this.profile.artistId !== null) {
            this.itemList.splice(1, 0, "歌曲", "专辑", "视频");
          }
        },
        (err) => {
          this.profile.artistId = this.$route.params.uid;
          this.itemList.splice(1, 0, "歌曲", "专辑", "视频");

          getSingerAlbum(this.$route.params.uid).then((res) => {
            this.profile.backgroundUrl = res.data.artist.picUrl;
            this.profile.artistName = res.data.artist.name;
            this.special = false;
          });
        }
      );
    },
  },
  created() {
    this.userDetail();
  },
  mounted() {
    // 保存导航栏距离顶部的距离
    this.tabOffsetTop = this.$refs.tab.offsetTop - 44;
  },
};
</script>

<style lang="scss" scoped>
.detail {
  position: relative;
  z-index: 20;
  height: 100vh;
  .nav {
    background-color: transparent;
    position: fixed;
    z-index: 21;
    border: 0;
    transition: all 0.4s linear;
    color: $color-bgc1;
  }
  .top-box {
    width: 100%;
    height: 280px;
    position: relative;
    z-index: 1;
    .user-bgc {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      filter: blur(2px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .zhez {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .user-detail {
      padding: 15px 15px 0;
      position: absolute;
      top: 23%;
      z-index: 3;
      .user-img {
        width: 75px;
        height: 75px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .logo {
          position: absolute;
          bottom: 2px;
          right: 5px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: $color-red;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont {
            font-size: 12px;
            color: #fff;
          }
        }
      }
      .user-name {
        font-size: 19px;
        margin-top: 15px;
        color: $color-bgc1;
        position: relative;
        img {
          height: 25px;
          position: absolute;
          top: -2px;
        }
      }
      .info {
        font-size: 13px;
        color: #c6c6c6;
        height: 10px;
        margin-top: 10px;
        .follows {
          float: left;
          height: 10px;
          line-height: 10px;
          padding-right: 10px;
          border-right: 1px solid #c6c6c6;
        }
        .followeds {
          float: left;
          height: 10px;
          line-height: 10px;
          margin-left: 10px;
        }
      }
      .createtime {
        height: 20px;
        font-size: 13px;
        line-height: 20px;
        color: #c6c6c6;
        margin-top: 10px;
      }
    }
    .singerDetail {
      width: 80%;
      height: 40px;
      margin: 0 5%;
      color: $color-bgc1;
      font-size: 20px;
      font-weight: 550;
      position: absolute;
      bottom: 50px;
      z-index: 3;
      line-height: 40px;
    }
  }
  .nav-box {
    // position: fixed;
    width: 100%;
    z-index: 21;
    transition: all 0.4s linear;
    margin-top: -20px;
    .tabnav {
      // position: relative;
      height: 44px;
      z-index: 21;
      // border-top-left-radius: 15px;
      // border-top-right-radius: 15px;
      background-color: $color-bgc1 !important;
    }
  }
  .detail-content {
    height: 100%;
    overflow: hidden;
    // z-index: 50;
    .songs {
      background-color: $color-bgc1;
      padding-top: 10px;
    }
  }
}
</style>