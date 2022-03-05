import {
  createRouter,
  createWebHistory
} from 'vue-router'


// 发现页面
const discover = () => import('@/views/discover/Discover' /* webpackChunkName: "discover" */) //发现组件
const recommendSong = () => import('@/views/discover/childrenComps/RecommendSong' /* webpackChunkName: "recommend-song" */) // 每日推荐
const moreSheet = () => import('@/views/discover/childrenComps/moreComps/moreSheet' /* webpackChunkName: "more-sheet" */) // 歌单广场
const moreSongs = () => import('@/views/discover/childrenComps/moreComps/moreSongs' /* webpackChunkName: "more-songs" */) // 更多音乐
const moreAlbum = () => import('@/views/discover/childrenComps/moreComps/moreAlbum' /* webpackChunkName: "more-album" */) // 更多专辑
const moreSinger = () => import('@/views/discover/childrenComps/moreComps/moreSinger' /* webpackChunkName: "more-singer" */) // 更多歌手

//歌单页面
const SheetInfo = () => import('@/components/context/sheetInfo/SheetInfo' /* webpackChunkName: "sheet-info" */) // 歌单详情页面
// 歌曲播放
const PlaySong = () => import('@/components/context/playSong/PlaySong' /* webpackChunkName: "play-song" */) // 播放界面

const Detail = () => import('@/views/detail/Detail' /* webpackChunkName: "detail" */) //歌手/用户 详情页

// 搜索页面
const search = () => import('@/views/search/Search' /* webpackChunkName: "search" */)

// 登录
const Login = () => import('@/components/context/login/Login' /* webpackChunkName: "login" */) //登录
const PhoneLogin = () => import('@/components/context/login/PhoneLogin' /* webpackChunkName: "phonr-login" */) //手机号登录

// 个人中心
const userCenter = () => import('@/views/user/UserCenter' /* webpackChunkName: "user-center" */)
const played = () => import('@/views/user/childrenComps/moreComps/played' /* webpackChunkName: "user-center-played" */) //最近播放
const myCollection = () => import('@/views/user/childrenComps/moreComps/myCollection' /* webpackChunkName: "user-center-collection" */) //收藏


// 视频页面
const video = () => import('@/views/video/Video' /* webpackChunkName: "video" */)



const routes = [{
    path: '',
    redirect: '/discover'
  },
  { //发现
    path: '/discover',
    component: discover,
    meta: {
      TabbarShow: true
    }
  },
  { //每日推荐
    path: '/discover/recommendSong',
    component: recommendSong,
    meta: {
      TabbarShow: false
    }
  },

  { // 歌单广场
    path: '/discover/moreSheet/',
    component: moreSheet,
    meta: {
      TabbarShow: false
    }
  },
  { // 更多最新音乐
    path: '/discover/moreSongs/',
    component: moreSongs,
    meta: {
      TabbarShow: false
    }
  },
  { // 更多专辑
    path: '/discover/moreAlbum/',
    component: moreAlbum,
    meta: {
      TabbarShow: false
    }
  },

  { // 歌单/专辑内容
    path: '/SheetInfo/:id',
    component: SheetInfo,
    meta: {
      TabbarShow: false
    }
  },
  { // 歌单/专辑 评论
    // path: '/playComment/:id&:isAlbum', component: SheetInfoComment
  },
  { // 播放界面
    path: '/PlaySong/:sid',
    component: PlaySong
  },
  { //更多歌手
    path: '/discover/moreSinger/',
    component: moreSinger,
    meta: {
      TabbarShow: false
    }
  },

  { // 歌手详情页
    path: '/Detail/:uid',
    component: Detail
  },

  { // 个人中心
    path: '/userCenter',
    component: userCenter,
    meta: {
      TabbarShow: true
    },
  },
  { // 登录
    path: '/userCenter/login',
    component: Login,
    meta: {
      TabbarShow: false
    }
  },
  { // 手机号登录
    path: '/userCenter/login/phoneLogin',
    component: PhoneLogin,
    meta: {
      TabbarShow: false
    }
  },
  { // 最近播放
    path: '/userCenter/played/:id',
    component: played,
    meta: {
      TabbarShow: false
    }
  },
  { // 收藏
    path: '/userCenter/myCollection',
    component: myCollection,
    meta: {
      TabbarShow: false
    }
  },



  {
    path: '/video',
    component: video,
    meta: {
      TabbarShow: true
    }
  },
  {
    path: '/search',
    component: search
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router