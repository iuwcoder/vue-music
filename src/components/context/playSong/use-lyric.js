import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { getlyric } from "network/played";
import Lyric from 'lyric-parser'

export default function useLyric({ songReady, currentTime }) {
  const currentLyric = ref(null) //歌词
  const currentLineNum = ref(0) //行数
  const pureMusicLyric = ref('') //纯音乐显示 
  const playingLyric = ref('') //当前正在播放歌词
  const lyricScrollRef = ref(null) //scroll 
  const lyricListRef = ref(null) //歌词盒子

  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)


  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    // 切换歌曲时会出现歌词乱跳的情况，歌词未准备好但是歌曲却播放了，
    // 数据重置
    stopLyric()
    currentLyric.value = null 
    currentLineNum.value = 0
    pureMusicLyric.value = ''
    playingLyric.value = ''

    // await getlyric(newSong.id).then((res) => {
    //   let lyric = res.data.lrc.lyric
    //   console.log(lyric);
    //   store.commit('addSongLyric', {
    //     song: newSong,
    //     lyric
    //   })
    // });
    // 判断歌词是否为最新的歌曲
    // if (currentSong.value.lyric !== lyric) {
    //   return
    // }

    const lyric = currentSong.value.lrc
    store.commit('addSongLyric', {
      song: newSong,
      lyric
    })

    currentLyric.value = new Lyric(lyric, handleLyric)
    // 判断歌词是否有长度
    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      // 判断歌曲是否开始播放
      if (songReady.value) {
        playLyric()
      }
    } else {
      playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
    }
  })

  // 播放歌词并且与当前播放时间同步
  function playLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  function stopLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  function handleLyric({ lineNum, txt }) {
    currentLineNum.value = lineNum
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) {
      return
    }
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }

  return {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric,
  }


}