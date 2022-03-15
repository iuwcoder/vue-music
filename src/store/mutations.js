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

  // 存储用户id
  setUserId(state, data) {
    state.userId = data
    localStorage.setItem('userId', data);
  },

  // 修改token，并将token存入localStorage
  changeLogin(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },

  // 存储cookie
  setCookie(state, cookie) {
    state.cookie = cookie
    localStorage.setItem('cookie', cookie)
  },

  // 设置搜索历史
  setSearchHistory(state, searches) {
    state.searchHistory = searches
  },

  // 设置播放历史
  setPlayHistory(state, songs) {
    state.playHistory = songs
  },

  // 设置用户歌单
  setUserSheet(state, sheets) {
    state.userSheet = sheets
  },

  // 设置用户歌单歌曲内容
  setSheetSong(state, songs) {
    state.sheetSong = songs
  }

}

export default mutations