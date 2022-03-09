import { PLAY_MODE, FAVORITE_KEY, SEARCH_KEY, PLAY_KEY, USERID_KEY, TOKRN_KEY } from "@/assets/js/constant"
import { load } from "@/assets/js/array-store"


const state = {
  sequenceList: [],  //非顺序播放列表 
  playlist: [], //播放列表  
  playing: true,  //播放状态
  playMode: PLAY_MODE.sequence, //播放模式
  currentIndex: 0, //当前播放歌曲索引
  fullScreen: false, //播放器状态（全屏/收缩）
  favoriteList: load(FAVORITE_KEY), //收藏歌曲
  playDuration: '', //歌曲时长
  searchHistory: load(SEARCH_KEY), //搜索历史
  playHistory: load(PLAY_KEY), //播放历史

  //用户id
  userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
  // 存储token
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  //cookie
  cookie: localStorage.getItem('token') ? localStorage.getItem('cookie') : '',

  // userId: load(USERID_KEY),
  // token: load(TOKRN_KEY),


}

export default state