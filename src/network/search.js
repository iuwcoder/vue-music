import {request} from './request'

// 搜索结果
// 1: 单曲,  10: 专辑,  100: 歌手,  1000: 歌单,  1002: 用户, 
//  1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
export function searchResult(keywords, limit, offset, type){
  return request({
      url: '/search',
      params: {
          keywords,
          limit,
          offset, 
          type
      }
  })
}

// 热搜榜简略
export function getSearchHot(){
  return request({
      url: '/search/hot'
  })
}

// 热搜榜详情
export function getHotDetail(){
  return request({
      url: '/search/hot/detail'
  })
}