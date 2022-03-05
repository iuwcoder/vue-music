import { PLAY_MODE } from "@/assets/js/constant"
import { shuffle } from "@/assets/js/util"

// 设置播放模式  顺序播放
export function selectPlay({commit}, {list, index}) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', list)
  commit('setCurrentIndex', index)
}

// 随机播放
export function randomPlay({commit}, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', shuffle(list))
  commit('setCurrentIndex', 0)
}

// 切换播放模式
export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id
  if (mode === PLAY_MODE.random) {
    commit('setPlaylist', shuffle(state.sequenceList))
  } else {
    commit('setPlaylist', state.sequenceList)
  }
  const index = state.playlist.findIndex((song) => {
    return song.id === currentId
  })

  commit('setCurrentIndex', index)
  commit('setPlayMode', mode)
}

// 删除播放列表歌曲
export function removeSong({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice() //操作副本
  const playlist = state.playlist.slice()

  const sequenceIndex = findIndex(sequenceList, song)
  const playIndex = findIndex(playlist, song)
  if (sequenceIndex < 0 || playIndex < 0) {
    return
  }

  sequenceList.splice(sequenceIndex, 1)
  playlist.splice(playIndex, 1)

  // 获取当前索引,判断删除索引位于当前播放索引的位置
  let currentIndex = state.currentIndex
  if (playIndex < currentIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currentIndex)
  if (!playlist.length) {
    commit("setPlayingState", false);
  }
}

// 清空播放列表
export function clearSongList({ commit }) {
  commit('setSequenceList', [])
  commit('setPlaylist', [])
  commit('setCurrentIndex', 0)
  commit("setPlayingState", false);
}

// 搜索 向播放列表中添加一首歌曲
export function addSong({ commit, state }, song) {
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  // 在歌曲列表中找寻要添加的这首歌曲
  let currentIndex = state.currentIndex
  const playIndex = findIndex(playlist, song)
  // 如果存在，修改歌曲索引，不存在 添加歌曲到列表
  if (playIndex > -1) {
    currentIndex = playIndex
  } else {
    playlist.push(song)
    currentIndex = playlist.length - 1 //添加歌曲立即被播放
  }

  const sequenceIndex = findIndex(sequenceList, song)
  if (sequenceIndex === -1) {
    sequenceList.push(song)
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currentIndex)
  commit('setPlayingState', true)
  // commit('setFullScreen', true)
}

// 找寻song在list中的索引
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}