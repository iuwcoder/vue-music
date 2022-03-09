<!-- 从 {{ $filters.getTime(profile.createTime) }} 开始来到网易云 -->
<template>
  <div class="home-page" v-loading="loading">
    <div class="singer-detail" v-if="singer !== null || profile !== null">
      <div class="title">
        <span class="sp1">基本信息</span>
      </div>
      <div class="indentify" v-if="profile.identify">
        <img :src="profile.identify.imageUrl" alt="" />
        <div>{{ profile.identify.imageDesc }}</div>
      </div>
      <div class="name" v-if="profile.artistName">
        <span class="about">艺人名: </span>
        {{ profile.artistName }}
      </div>
      <div class="gender" v-if="profile.gender">
        <span class="about">性别: </span>
        {{ profile.gender === 1 ? "男" : "女" }}
      </div>
      <div class="birthday" v-if="profile.birthday">
        <span class="about">生日: </span>
        {{ $filters.getTime(profile.birthday) }}
      </div>
      <div class="desc" v-if="singerdetail.desc">
        <span class="about">歌手简介: </span>
        {{ singerdetail.desc }}
      </div>
    </div>

    <div class="like" v-if="showSheet">
      <div class="title">
        <span class="sp1">音乐品味</span>
      </div>
      <item-list
        v-if="showSheet"
        :title="'听歌排行'"
        :showDiv="true"
        :showImg="phImg"
        :showDivColor="'#ee5757'"
        :songCount="'累计听歌' + profile.listenSongs + '首'"
        :iconColor="'#fff'"
        @click="playedList"
      ></item-list>
      <item-list
        v-if="showSheet"
        :title="likeSheet.name"
        :showDiv="true"
        :showImg="likeImg"
        :showDivColor="'#ebcece'"
        :songCount="likeSheet.trackCount + '首，'"
        :playCount="'播放' + likeSheet.playCount + '次'"
        :iconColor="'#ff4b41'"
        @click="userLike"
      ></item-list>
    </div>
    <div class="creat-sheet" v-if="createSheet.length !== 0">
      <div class="title">
        <span class="sp1">创建的歌单</span>
        <span class="sp2"
          >({{ createSheet.length }}个，被收藏{{ subscribedCount }})</span
        >
      </div>
      <item-list
        v-for="(item, index) in createSheet"
        :key="index"
        :title="item.name"
        :sheetImg="item.coverImgUrl"
        :songCount="item.trackCount + '首，'"
        :playCount="'播放' + item.playCount + '次'"
        @click.stop="userSheet(item.id)"
      ></item-list>
    </div>
    <div class="sub-sheet" v-if="subSheet.length !== 0">
      <div class="title">
        <span class="sp1">收藏的歌单</span>
        <span class="sp2">({{ subSheet.length }})</span>
      </div>
      <item-list
        v-for="(item, index) in subSheet"
        :key="index"
        :title="item.name"
        :sheetImg="item.coverImgUrl"
        :songCount="item.trackCount + '首，by ' + item.nickname"
        :playCount="'，播放' + item.playCount + '次'"
        @click="sheet(item.id)"
      ></item-list>
    </div>
  </div>
</template>

<script>
import ItemList from "./ItemList.vue";

import { toStringNum } from "common/common";
import { getUserPlayList } from "network/user";
import { getSingerDetail } from "network/singer";

export default {
  name: "HomePage",
  components: {
    ItemList,
  },
  props: ["artistId", "profile"],
  data() {
    return {
      likeSheet: {}, // 喜欢的音乐
      createSheet: [], // 创建的歌单
      subSheet: [], // 收藏的歌单
      uid: "", // 用户id
      phImg: "icon-paihang",
      likeImg: "icon-aixin",
      subscribedCount: 0, // 歌单收藏总次数
      singer: "", // 歌手id
      singerdetail: {},
      showSheet: true,
      loading: true,
    };
  },
  methods: {
    // 用户最近播放
    playedList() {
      this.$router.push("/userCenter/played/" + this.$route.params.uid);
    },
    // 用户喜欢的音乐
    userLike() {
      this.$router.push("/SheetInfo/" + this.likeSheet.id + '&' + true);
    },
    // 用户创建的歌单
    userSheet(id) {
      this.$router.push("/SheetInfo/" + id + '&' + true);
    },

    // 用户收藏的歌单
    sheet(id) {
      this.$router.push("/SheetInfo/" + id + '&' + true);
    },
  },
  created() {
    this.uid = this.$route.params.uid;
    // 获取歌单
    getUserPlayList(this.$route.params.uid).then((res) => {
      if (res.data.playlist.length !== 0) {
        this.likeSheet.id = res.data.playlist[0].id; // 歌单id
        this.likeSheet.name = res.data.playlist[0].name; // 歌单名称
        this.likeSheet.playCount = toStringNum(res.data.playlist[0].playCount); // 歌单播放次数
        this.likeSheet.trackCount = res.data.playlist[0].trackCount; // 歌单歌曲数量

        for (let i = 1; i < res.data.playlist.length; i++) {
          if (res.data.playlist[i].creator.userId == this.uid) {
            this.createSheet.push({
              id: res.data.playlist[i].id, // 歌单id
              name: res.data.playlist[i].name, // 歌单名称
              coverImgUrl: res.data.playlist[i].coverImgUrl, // 歌单封面
              trackCount: res.data.playlist[i].trackCount, // 歌单歌曲数量
              playCount: toStringNum(res.data.playlist[i].playCount), // 歌单播放量
            });
            this.subscribedCount += res.data.playlist[i].subscribedCount; // 歌单被收藏数量
          } else {
            this.subSheet.push({
              id: res.data.playlist[i].id, // 歌单id
              name: res.data.playlist[i].name, // 歌单名称
              coverImgUrl: res.data.playlist[i].coverImgUrl, // 歌单封面
              trackCount: res.data.playlist[i].trackCount, // 歌单歌曲数量
              playCount: toStringNum(res.data.playlist[i].playCount), // 歌单播放量
              nickname: res.data.playlist[i].creator.nickname, // 创作者
            });
          }
        }
      } else {
        this.showSheet = false;
      }
    });
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.singer = this.artistId;
      getSingerDetail(this.singer).then((res) => {
        this.singerdetail.desc = res.data.briefDesc; // 歌手介绍
        this.singerdetail.introduction = res.data.introduction; // 歌手荣誉
        // this.$set(
        //   this.singerdetail,
        //   this.singerdetail.desc,
        //   res.data.briefDesc
        // );
        this.loading = false;
      });
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  padding: 15px;
  .like {
    background-color: $color-bgc1;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 15px;
    .text {
      padding-bottom: 5px;
      text-align: center;
    }
  }
  .singer-detail {
    font-size: 14px;
    .indentify {
      display: flex;
      align-items: center;
      img {
        width: 23px;
        height: 23px;
        float: left;
        margin-right: 5px;
      }
    }
    .indentify,
    .name,
    .gender,
    .birthday,
    .desc {
      margin-top: 9px;
      color: $color-text2;
    }
    .about {
      color: $color-text1;
      // line-height: 1;
    }
    .desc {
      // 文本显示两行
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 20px;
    }
  }
  .creat-sheet,
  .sub-sheet,
  .singer-detail {
    @extend .like;
  }
  .title {
    margin-bottom: 12px;
    .sp1 {
      font-size: 18px;
    }
    .sp2 {
      font-size: 12px;
      color: $color-text4;
      margin-left: 5px;
    }
  }
}
</style>