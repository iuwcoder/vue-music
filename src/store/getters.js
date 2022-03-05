export const currentSong = (state) => {
    // 计算当前播放歌曲
  return state.playlist[state.currentIndex] || {}
}