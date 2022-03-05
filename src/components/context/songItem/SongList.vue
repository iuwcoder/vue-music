<template>
  <div class="songs">
    <div class="top-box">
      <div class="left">播放热门50</div>
      <div class="right">
        <div class="toggle" @click="toggle">
          <i class="iconfont" :class="icon"></i>{{ toggleTitle }}
        </div>
      </div>
    </div>
    <div>
      <song-item
        :songList="songs"
        @select="selectItem"
      ></song-item>
    </div>
  </div>
</template>

<script>
import SongItem from "@/components/context/songItem/SongItem";
import { getSongsList } from "network/singer";
import { getSongDetial, getlyric } from "network/played"; // 获取歌曲基本信息 歌词 评论
import { playSong } from "network/songs"; // 获取音乐url
import { mapActions } from "vuex";

export default {
  name: "SongList",
  components: {
    SongItem,
  },
  props: ["artistId"],
  data() {
    return {
      songs: [], // 歌曲列表
      icon: "icon-shijianpaihang",
      index: 0, // 切换歌曲排列
      toggleTitle: "按时间排列",
      // loading: true,
      id: "", // 音乐id
    };
  },
  methods: {
    selectItem({ item, index }) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    // 随机播放
    toggle() {
      this.randomPlay(this.songs);
    },
    getSong() {
      
    },

    songsList(order) {
      getSongsList(this.artistId, order, 50).then((res) => {
        for (const item of res.data.songs) {
          getSongDetial(item.id.toString()).then((res) => {
            let result = res.data.songs[0];
            // console.log(res);
            playSong(item.id).then((res) => {
              let music = res.data.data[0];
              getlyric(item.id).then((res) => {
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
              });
            });
          });
        }
        // this.song.map((item2, index2) => {
        //   console.log(item2);
        //   this.songs.map((item1) => {
        //     if (item2.navTitle == item1.songName) {
        //       this.songs.push(this.song);
        //     }
        //   });
        //   return this.songs;
        // });
        console.log(this.songs);
        // console.log(this.song);
        // let songsList = this.songs.map((item, index) => {
        //   return { ...item, ...this.song[index] };
        // });
        // console.log(songsList);
      });
    },

    ...mapActions(["selectPlay", "randomPlay"]),
  },
  created() {
    this.songsList("hot");
  },
};
</script>

<style lang="scss" scoped>
.songs {
  // padding: 0 10px 15px;
  z-index: -1;
  .top-box {
    width: 90%;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    display: flex;
    margin: 0 20px;
    .left {
      flex: 1;
      font-size: 17px;
    }
    .right {
      .toggle {
        font-size: 13px;
        line-height: 45px;
        color: $color-text2;
        float: right;
        .iconfont {
          font-size: 12px;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>