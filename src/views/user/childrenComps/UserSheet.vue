<template>
  <div class="user-sheet">
    <div class="box">
      <div class="top">
        <div class="left">
          创建歌单 ({{ this.$store.state.userId !== "" ? sheetLength : 0 }}个)
        </div>
        <div class="center" @click="addSheet">
          <i class="iconfont icon-tianjia"></i>
        </div>
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
      <user-sheet-list
        :sheetList="playList"
        :nickName="nickName"
        :sheet="sheet"
      ></user-sheet-list>
    </div>
    <div class="box">
      <div class="top">
        <div class="left">收藏歌单 ({{ sheetCollectionLength }}个)</div>
        <div class="center">
          <i class="iconfont icon-tianjia"></i>
        </div>
        <div class="right">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
      <user-sheet-list
        v-if="sheetCollectionLength !== 0"
        :sheetList="playList"
        :nickName="nickName"
      ></user-sheet-list>
      <div class="nosheet" v-else>暂时还没有收藏歌单</div>
    </div>
    <create-sheet ref="addSheetRef" @successSheet="successSheet"></create-sheet>
  </div>
</template>

<script>
import UserSheetList from "@/components/context/userSheetList/UserSheetList";
import CreateSheet from "@/components/context/sheet/CreateSheet";

import { getUserDetail, getUserPlayList } from "network/user"; // 用户信息

export default {
  name: "UserSheet",
  components: {
    UserSheetList,
    CreateSheet,
  },
  data() {
    return {
      sheet: "my",
      playList: [],
      nickName: "",
    };
  },
  computed: {
    // 计算歌单数量
    sheetLength() {
      return (
        this.playList.filter((item) => item.creator === this.nickName).length -
        1
      );
    },
    sheetCollectionLength() {
      return this.playList.filter((item) => item.creator !== this.nickName)
        .length;
    },
  },
  methods: {
    // 添加歌单
    addSheet() {
      this.$refs.addSheetRef.showPopup();
    },
    // 新建歌单的数据
    successSheet(createSheet) {
      this.playList.unshift(
        createSheet
      );
    },
  },

  created() {
    getUserDetail(this.$store.state.userId).then((res) => {
      this.nickName = res.data.profile.nickname; // 用户名
    });
    getUserPlayList(this.$store.state.userId).then((res) => {
      console.log(res);
      for (const item of res.data.playlist) {
        this.playList.push({
          name: item.name, //歌单名称
          id: item.id,
          img: item.coverImgUrl, //歌单图片
          playCount: item.playCount, //创建歌单数量
          trackCount: item.trackCount, //收藏歌单数量
          creator: item.creator.nickname, //用户名
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.user-sheet {
  width: 100%;
  margin-top: 7px;
  .box {
    padding: 12px 13px;
    border-radius: 8px;
    background-color: $color-bgc1;
    box-shadow: $boxshaow;
    margin-bottom: 10px;
    .top {
      width: 100%;
      display: flex;
      height: 25px;
      font-size: 13px;
      line-height: 25px;
      color: $color-text4;
      .left {
        flex: 4;
        font-size: 12px;
      }
      .center {
        flex: 5;
        .icon-tianjia {
          float: right;
          font-size: 18px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        .icon-sandian {
          position: absolute;
          right: 0;
          font-size: 16px;
        }
      }
    }
    .nosheet {
      width: 100%;
      height: 30px;
      line-height: 40px;
      color: $color-text4;
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>