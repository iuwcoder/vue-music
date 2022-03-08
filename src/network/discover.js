import {
  request
} from './request'

// 轮播图请求
export function getBanner(type) {
  return request({
    url: '/banner',
    params: {
      type
    }
  })
}

// 热门歌单
export function getHotSheet(order, cat, limit, offset) {
  return request({
    url: '/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
}

// 新歌速递
export function getSongsTop(type) {
  return request({
    url: '/top/song',
    params: {
      type
    }
  })
}

// 最新MV
export function getNewMv(area, limit) {
  return request({
    url: '/mv/first',
    params: {
      area,
      limit
    }
  })
}

// 新碟上架
export function getNewAlbum(limit, offset, area, type) {
  return request({
    url: '/top/album',
    params: {
      limit,
      offset,
      area,
      type
    }
  })
}

// 热门歌手
export function getHotSinger(limit, offset) {
  return request({
    url: '/top/artists',
    params: {
      limit,
      offset
    }
  })
}

// 歌手分类
export function getSinger(limit, offset, type, area) {
  return request({
    url: '/artist/list',
    params: {
      limit,
      offset,
      type,
      area
    }
  })
}


// 歌单标签列表
export function getSheetTags() {
  return request({
    url: '/playlist/hot',
  })
}

// 获取歌单详情
export function getSheetDetial(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}


// 每日推荐歌曲
export function getRecommendSong(cookie) {
  return request({
    url: '/recommend/songs',
    params: {
      cookie
    }
  })
}