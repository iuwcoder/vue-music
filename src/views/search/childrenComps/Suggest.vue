<template>
  <div class="suggest" ref="rootRef" v-loading="loading">
    <div class="song">
      <song-item :songList="songs" @select="selectSong"></song-item>
      <div v-loading="pullUpLoading"></div>
    </div>
  </div>
</template>

<script>
import SongItem from "@/components/context/songItem/SongItem";
import { searchResult } from "network/search";
import { getSongDetial, getlyric } from "network/played"; // 获取歌曲基本信息 歌词 评论
import { playSong } from "network/songs"; // 获取音乐url

import { computed, nextTick, ref, watch } from "vue";
import { useStore } from "vuex";

import usePullUpLoad from "./use-pull-up-load";

export default {
  name: "Suggest",
  components: {
    SongItem,
  },
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["select-song", "select-singer"],
  setup(props, { emit }) {
    const songs = ref([]); //歌曲
    const songId = ref([]); //歌曲ID
    const singer = ref([]); //歌手
    const hasMore = ref(true); //是否有分页
    const offset = ref(0); //当前分页页数
    const manualLoading = ref(false); 
    

    const store = useStore();

    // computed
    const loading = computed(() => {
      return !songs.value.length;
    });
    const pullUpLoading = computed(() => {
      return isPullUpLoad.value && hasMore.value;
    });
    // 未加载完整个屏幕。不触发上拉加载事件
    const preventPullUpLoad = computed(() => {
      return loading.value || manualLoading.value;
    });

    // hook
    const { isPullUpLoad, rootRef, scroll } = usePullUpLoad(
      searchMore,
      preventPullUpLoad
    );

    watch(
      () => props.query,
      async (newQuery) => {
        if (!newQuery) {
          return;
        }
        await searchFirst();
      }
    );

    async function searchFirst() {
      if (!props.query) {
        return;
      }
      offset.value = 0;
      hasMore.value = true;
      songs.value = [];
      songId.value = [];

      await searchResult(props.query, 30, offset.value * 30, 1).then((res) => {
        hasMore.value = res.data.result.hasMore;
        for (const item of res.data.result.songs) {
          getSongDetial(item.id.toString()).then((res) => {
            let result = res.data.songs[0];
            // console.log(res);
            playSong(item.id).then((res) => {
              let music = res.data.data[0];
              // console.log(music);
              getlyric(item.id).then((res) => {
                songs.value.push({
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
      });
      // const result = await searchResult(props.query, 30, offset.value * 30, 1)
      // songs.value = await playSong(result.data.result.songs.id)
      // songId.value = result.data.result.songs.id
      // hasMore.value = result.data.result.hasMore
      console.log(songs.value);
      console.log(hasMore.value);
      await nextTick();
      await makeItScrollable();
    }

    async function searchMore() {
      if (!hasMore.value || !props.value) {
        return;
      }
      offset.value++;
      await searchResult(props.query, 30, offset.value * 30, 1).then((res) => {
        for (const item of res.data.result.songs) {
          songs.value.push({
            id: item.id,
            navTitle: item.name,
            yuanc: item.alias,
            singers: item.artists[0].name,
            zhuanji: item.album.name,
            mv: item.mvid,
          });
        }
      });
      // const result = await searchResult(props.query, 30, offset.value * 30, 1)
      // songs.value = songs.value.concat(result);
      hasMore.value = result.data.result.hasMore;
      console.log(songs.value);
      await nextTick();
      await makeItScrollable();
    }

    // 当数据不足以填满屏幕时，自动填充
    async function makeItScrollable() {
      if (scroll.value.maxScrollY >= -1) {
        manualLoading.value = true;
        await searchMore();
        manualLoading.value = false;
      }
    }

    // 添加歌曲
    function selectSong({ song }) {
      addSong(song)
    }
    function addSong(song) {
      store.dispatch("addSong", song);
    }

    return {
      // data
      songs,
      songId,
      singer,

      // computed
      loading,
      pullUpLoading,
      //methods
      selectSong,
      // selectItem,
      // usePullUpLoad
      rootRef,
    };
  },
  methods: {},
  // created() {
  //   searchResult(this.query).then((res) => {
  //     console.log(this.query);
  //     console.log(res);
  //   })
  // }
};
</script>

<style>
</style>