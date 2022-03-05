const mutations = {
  // 修改播放状态
  setPlayingState(state, playing) {
    state.playing = playing
  },
  // 设置顺序播放列表
  setSequenceList(state, list) {
    state.sequenceList = list
  },
  // 设置播放列表
  setPlaylist(state, list) {
    state.playlist = list
  },
  // 设置播放模式
  setPlayMode(state, mode) {
    state.playMode = mode
  },
  // 设置当前播放索引
  setCurrentIndex(state, index) {
    state.currentIndex = index
  },
  // 设置播放器状态
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen
  },
  // 设置收藏列表
  setFavoriteList(state, list) {
    state.favoriteList = list
  },
  setPlayDuration(state,time) {
    state.playDuration = time
  },
  //添加歌词 
  addSongLyric(state, {song, lyric}) {
    state.sequenceList.map((item) => {
      if (item.id === song.id) {
        item.lyric = lyric
      }
      return item
    })
  },

  setUserId(state, data) {
    state.userId = data
    localStorage.setItem('userId', data);
  },

  // 修改token，并将token存入localStorage
  changeLogin (state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },

  // 设置搜索历史
  setSearchHistory(state, searches) {
    state.searchHistory = searches
  },

  // 设置播放历史
  setPlayHistory(state, songs) {
    state.playHistory = songs
  }

}

export default mutations