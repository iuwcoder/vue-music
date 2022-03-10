<template>
  <div class="SongItem" v-loading="!songList.length">
    <!-- <scroll class="song-content"> -->
    <div>
      <div
        class="item"
        v-for="(item, index) in songList"
        :key="index"
        @click="selectItem(item, index)"
      >
        <div class="itemBox">
          <div class="index" v-if="shouLeft">
            {{ index + 1 }}
          </div>
          <div class="pic" v-if="showPic">
            <img v-lazy="item.picUrl" alt="" />
          </div>
          <div class="left">
            <div class="leftContainer">
              <div class="name">
                {{ item.navTitle }}
                <span v-if="item.yuanc.length !== 0" class="yuanc"
                  >({{ item.yuanc[0] }})</span
                >
              </div>
              <div class="singer">
                <span>{{ item.singers }} </span>
                -
                {{ " " + item.zhuanji }}
              </div>
            </div>
          </div>
          <div class="mv">
            <i
              @click.stop="playMv(item.mv)"
              v-if="item.mv !== 0"
              class="iconfont icon-mv"
            ></i>
          </div>
          <div class="more" @click.stop="moreMenu">
            <i class="iconfont icon-sandian"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- </scroll> -->
  </div>
</template>

<script>
// import scroll from "components/common/scroll/scroll.vue";

export default {
  name: "SongItem",
  components: {
    // scroll,
  },
  props: {
    songList: {
      type: Array,
      default: [],
    },
    // 数字索引
    shouLeft: {
      type: Boolean,
      default: true,
    },
    // 专辑封面
    showPic: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["select", "select-song"],
  methods: {
    // 播放歌曲
    selectItem(song, index) {
      this.$emit("select", { song, index });
    },
    selectSong(song) {
      this.$emit("select-song", song);
    },

    // 添加歌曲到歌单
    // sheetItem(song) {
    //   this.$emit("sheet", { song, index });
    // },
    moreMenu() {
      console.log(22);
    },

    playMv(mid) {
      this.$router.push("/mvplay/" + mid);
    },
  },
};
</script>
<style lang="scss" scoped>
// .songItem {
//   // height: 100vh;
// }
// .song-content {
//   height: 100%;
//   overflow: hidden;
// }
.item {
  width: 100%;
  height: 50px;
  // border-bottom: 1px solid #e2e2e2ea;
  display: flex;
  align-items: center;
  margin: 8px 0;
}
.yuanc {
  color: $color-text1;
  font-size: 15px !important;
}
.itemBox {
  width: 100%;
  height: 45px;
  position: relative;
  display: flex;
}
.name {
  width: 210px;
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.singer {
  width: 240px;
  height: 15px;
  line-height: 15px;
  color: $color-text1;
  margin-top: 3px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index {
  flex: 0.53;
  font-size: 15px;
  text-align: center;
  margin-right: 10px;
  line-height: 40px;
  margin-left: 7px;
}
.pic {
  width: 45px;
  height: 45px;
  margin-right: 10px;
  margin-left: 12px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}
.left {
  flex: 5;
  display: flex;
  align-items: center;
}
.mv {
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mv .icon-mv {
  font-size: 20px;
  color: $color-red;
}
.more {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.more .icon-sandian {
  font-size: 18px;
  color: $color-text1;
}
</style>