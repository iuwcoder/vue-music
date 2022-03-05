<template>
  <div class="mv" v-loading="!mvList.length">
    <mv-item v-if="mvList.length !== 0" :videoList="mvList"></mv-item>
    <!-- <div class="noMv" v-else>暂时还没有MV哦</div> -->
  </div>
</template>

<script>
import MvItem from "components/context/mv/MvItem";
import { toStringNum, durationTime } from "common/common";

import { getSingerMv } from "network/singer";

export default {
  name: "Mv",
  components: { MvItem },
  props: ["artistId"],
  data() {
    return {
      mvList: [],
    };
  },
  created() {
    getSingerMv(this.artistId).then((res) => {
      for (const item of res.data.mvs) {
        this.mvList.push({
          id: item.id, // id
          name: item.name, // 名称
          duration: durationTime(item.duration), // 时长
          playCount: toStringNum(item.playCount), // 播放量
          publishTime: item.publishTime, // 发布时间
          imgurl16v9: item.imgurl16v9, // 封面
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.mv {
  margin: 0 15px;
}
</style>